Feature('Unliking Restaurant');

Scenario('Unliking one restaurant', async ({ I }) => {
  I.amOnPage('/');

  I.seeElement('.list_item_title a');
  I.click(locate('.list_item_title a').first());

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.list_item');

  I.click(locate('.list_item_title a').first());

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');

  I.seeElement('#null');
  I.see('No favorite restaurant shown', '.resto-item__not__found');
});
