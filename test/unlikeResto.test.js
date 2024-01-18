import LikeButtonInitiator from '../src/scripts/utils/like-initiator';
import favoriteResto from '../src/scripts/data/favorite-resto';

global.structuredClone = jest.fn((val) => {
  return JSON.parse(JSON.stringify(val));
});

describe('Unlike restaurant', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(async () => {
    addLikeButtonContainer();
    await favoriteResto.putFavorite({ id: 1 });
  });

  afterEach(async () => {
    await favoriteResto.deleteFavorite(1);
  });

  it('should display unlike widget when the favorite has been liked', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      data: {
        id: 1,
      },
    });
    expect(document.querySelector('[aria-label="remove fav"]')).toBeTruthy();
  });

  it('should not display unlike widget when the favorite has been liked', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      data: {
        id: 1,
      },
    });
    expect(document.querySelector('[aria-label="add to fav"]')).toBeFalsy();
  });

  it('should be able to remove liked restaurant from the list', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      data: {
        id: 1,
      },
    });
    document.querySelector('[aria-label="remove fav"]').dispatchEvent(new Event('click'));
    expect(await favoriteResto.getAllFavorite()).toEqual([]);
  });

  it('should not throw error when user click unlike widget if the unliked restaurant is not in the list', async () => {
    await LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      data: {
        id: 1,
      },
    });

    await favoriteResto.deleteFavorite(1);

    document.querySelector('[aria-label="remove fav"]').dispatchEvent(new Event('click'));
    expect(await favoriteResto.getAllFavorite()).toEqual([]);
  });
});
