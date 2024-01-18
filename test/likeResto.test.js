import LikeButtonInitiator from '../src/scripts/utils/like-initiator';
import favoriteResto from '../src/scripts/data/favorite-resto';

global.structuredClone = jest.fn((val) => {
  return JSON.parse(JSON.stringify(val));
});

describe('Liking A Restaurant', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(() => {
    addLikeButtonContainer();
  });

  it('should show the like button when the restaurant has not been liked before', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      data: {
        id: 1,
      },
    });
    expect(document.querySelector('[aria-label="add to fav"]')).toBeTruthy();
  });

  it('should not show the unlike button when the restaurant has not been liked before', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      data: {
        id: 1,
      },
    });
    expect(document.querySelector('[aria-label="remove fav"]')).toBeFalsy();
  });

  it('should be able to like the restaurant', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      data: {
        id: 1,
      },
    });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    const data = await favoriteResto.getFavorite(1);
    expect(data).toEqual({ id: 1 });
    await favoriteResto.deleteFavorite(1);
  });

  it('should not add a restaurant again when its already liked', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      data: {
        id: 1,
      },
    });

    await favoriteResto.putFavorite({ id: 1 });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    expect(await favoriteResto.getAllFavorite()).toEqual([{ id: 1 }]);
    await favoriteResto.deleteFavorite(1);
  });

  it('should not add a restaurant when it has no id', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      data: {},
    });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    expect(await favoriteResto.getAllFavorite()).toEqual([]);
  });
});
