import favoriteResto from '../../data/favorite-resto';
import CONFIG from '../../globals/config';
import List from '../../utils/list-template';

const Favorite = {
  async render() {
    return `
    <section class="content">
      <div class="latest">
        <h1>Favorite Restaurant</h1>
        <div class="list" id="favorite"></div>
        <div class="resto-item__not__found" id="null"></div>
      </div>
    </section>`;
  },

  async afterRender() {
    const favorite = await favoriteResto.getAllFavorite();
    let listFav = '';
    if (favorite.length === 0) {
      document.getElementById('null').innerHTML = 'No favorite restaurant shown';
    } else {
      favorite.forEach((data) => {
        const image = CONFIG.BASE_IMAGE_URL_MEDIUM + data.pictureId;
        listFav += List(image, data.name, data.city, data.rating, data.id, data.description);
      });
      document.getElementById('favorite').innerHTML = listFav;
    }
  },
};

export default Favorite;
