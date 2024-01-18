const assert = require('assert');

Feature('Liking Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty favorite restaurant', ({ I }) => {
  I.seeElement('#null');
  I.see('No favorite restaurant shown', '.resto-item__not__found');
});

Scenario('Liking one restaurant', async ({ I }) => {
  I.see('No favorite restaurant shown', '.resto-item__not__found');
  I.amOnPage('/');

  I.seeElement('.list_item_title a');
  const first = locate('.list_item_title a').first();
  const firstTitle = await I.grabTextFrom(first);
  I.click(firstTitle);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.list_item');

  const likedresto = await I.grabTextFrom('.list_item_title');
  assert.strictEqual(firstTitle, likedresto);
});
