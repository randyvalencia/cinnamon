const ROOT_URL = 'https://headsouth.argevalencia.com/wp-json/wp/v2/';

const POST_URL = 'posts?_embed';
const CATEGORIES_URL = 'categories?';

// Stores Sections
export const getLatestStoresUrl = ({page = 1}) =>
  `${ROOT_URL}${POST_URL}&page=${page}`;
export const getCategoriesUrl = ({page = 100}) =>
  `${ROOT_URL}${CATEGORIES_URL}&per_page=${page}`;
