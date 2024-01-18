import sourceData from '../../data/source';
import CONFIG from '../../globals/config';
import UrlParser from '../../routes/url-parser';
import Handler from '../../utils/handler';
import LikeButtonInitiator from '../../utils/like-initiator';
import ReviewForm from '../../utils/review-form';

const Detail = {
  async render() {
    return `
      <section class='content'>
        <div class='latest'>
            <h1 id='restoName'></h1>
            <div class='detail-content' id='detail'></div>
            <span id="failed">
            </span>
        </div>
      </section>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    let dataDetail = '';
    let listCategory = '';
    let listMakanan = '';
    let listMinuman = '';
    let listReview = '';

    const data = await sourceData.detailResto(url.id);
    if (data.error) {
      Handler.errorRender();
      return;
    }

    data.restaurant.categories.forEach((item) => {
      listCategory += `
                <div class='tag'>${item.name}</div>
            `;
    });
    data.restaurant.menus.foods.forEach((item) => {
      listMakanan += `
                ${item.name},
            `;
    });
    data.restaurant.menus.drinks.forEach((item) => {
      listMinuman += `
                ${item.name},
            `;
    });
    if (Array.isArray(data.restaurant.customerReviews)) {
      data.restaurant.customerReviews.forEach((review) => {
        listReview += `
              <div class='review-card'>
                  <p style="font-weight: bold">${review.name}</p>
                  <p>${review.review}</p>
                  <p style="text-align: end">${review.date}</p>
              </div>
              `;
      });
    } else {
      listReview += '<p>No reviews available</p>';
    }

    dataDetail += `
          <div class="list_item">
              <img class="list_item_img" tabindex="0"  crossorigin="anonymous" src="${CONFIG.BASE_IMAGE_URL_MEDIUM + data.restaurant.pictureId}" alt="${data.restaurant.name}" title="${data.restaurant.name}">
              <div class="city">${data.restaurant.city}</div>
              <span style="position: relative"> 
                <div id='likeButtonContainer'></div>
              </span>             
              <div class="list_item_content" style="text-align:left;">
                  <p class="list_item_rating">
                      Rating : 
                      <span href="#" class="list_item_rating_value">${data.restaurant.rating}</span>
                  </p>
                  <h2>${data.restaurant.name}</h2>
                  <p class="city-detail">${data.restaurant.address}</p>
                  <div class="list_item_desc_detail">${data.restaurant.description}</div>
                  <br>
                  <h2>Menu</h2>
                  <div style="margin-top:10px;margin-bottom:20px">${listCategory}</div>
                  <h3>Makanan</h3>
                  <div style="margin-top:10px;margin-bottom:20px">${listMakanan}</div>
                  <h3>Minuman</h3>
                  <div style="margin-top:10px;margin-bottom:20px">${listMinuman}</div>
                  <h2>Review</h2>
                  <p>Apa kata mereka yang sudah pernah berkunjung ke sini?</p>
                  <div style="margin-top:-15px;margin-bottom:10px; padding-top:20px;padding-bottom:20px">${listReview}</div>
                  <div class="review_container" id="add_review">
                  </div>
              </div>
          </div>
        `;
    document.querySelector('#restoName').innerHTML = 'DETAIL RESTORAN';
    document.querySelector('#detail').innerHTML = dataDetail;

    ReviewForm.init({
      reviewConteiner: document.getElementById('add_review'),
      idRestaurant: url.id,
    });

    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      data: {
        id: data.restaurant.id,
        name: data.restaurant.name,
        description: data.restaurant.description,
        rating: data.restaurant.rating,
        pictureId: data.restaurant.pictureId,
        city: data.restaurant.city,
      },
    });
  },
};

export default Detail;
