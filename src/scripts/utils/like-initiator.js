import FavIdb from '../data/favorite-resto';

const likeButton = () => `
  <button aria-label="add to fav" id="likeButton" class="like">
    <i class="fa-regular fa-heart fa-3x" id="like-icon"></i>
  </button>`;

const likedButton = () => `
  <button aria-label="remove fav" id="likeButton" class="liked">
    <i class="fa-solid fa-heart fa-3x" id="liked-icon"></i>
  </button>`;

const LikeButtonInitiator = {
  async init({ likeButtonContainer, data }) {
    this._likeButtonContainer = likeButtonContainer;
    this._data = data;

    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._data;

    if (await this._isDataExist(id)) {
      this._renderLiked();
    } else {
      this._renderLike();
    }
  },

  async _isDataExist(id) {
    const resto = await FavIdb.getFavorite(id);
    return !!resto;
  },

  async _addToFavorite(id) {
    await FavIdb.putFavorite(id);
  },

  async _deleteFromFavorite(id) {
    await FavIdb.deleteFavorite(id);
  },

  _renderLike() {
    this._likeButtonContainer.innerHTML = likeButton();

    const btn = document.querySelector('#likeButton');
    btn.addEventListener('click', async () => {
      await FavIdb.putFavorite(this._data);
      this._renderButton();
    });
  },

  _renderLiked() {
    this._likeButtonContainer.innerHTML = likedButton();

    const btn = document.querySelector('#likeButton');
    btn.addEventListener('click', async () => {
      await FavIdb.deleteFavorite(this._data.id);
      this._renderButton();
    });
  },
};

export default LikeButtonInitiator;
