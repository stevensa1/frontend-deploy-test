import source from '../../data/source';
import CONFIG from '../../globals/config';
import Handler from '../../utils/handler';
import List from '../../utils/list-template';

const Home = {
  async render() {
    return `
        <section class="content">
          <div class="latest">
            <h1>Explore Restaurant</h1>            
            <div class="list" id="home" style="display: none;"></div>
            <span id="loader">
            </span>
            <span id="failed">
            </span>
          </div>
        </section>
    `;
  },

  async afterRender() {
    const home = document.getElementById('home');
    Handler.loaderRender(home);

    const url = await source.listResto();

    // error handler
    if (url.error) {
      Handler.errorRender();
      return;
    }

    let list = '';
    url.restaurants.forEach((data) => {
      const image = CONFIG.BASE_IMAGE_URL_MEDIUM + data.pictureId;
      list += List(image, data.name, data.city, data.rating, data.id, data.description);
    });
    home.innerHTML = list;
  },
};

export default Home;
