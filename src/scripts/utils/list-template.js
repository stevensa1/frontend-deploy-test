import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const List = (image, name, city, rating, id, description) => `
    <div class="list_item">
        <img class="list_item_thumb lazyload" crossorigin="anonymous" data-src="${image}"
            alt="${name}" title="${name}">
        <div class="city">${city}</div>
        <div class="list_item_content">
            <p class="list_item_rating">
                Rating :
                <span class="list_item_rating_value">${rating}</span>
            </p></br>
            <h1 class="list_item_title"><a href='/#/detail/${id}'>${name}</a></h1>
            <div class="list_item_desc">${description.slice(0, 150)}...</div>
        </div>
    </div>
`;

export default List;
