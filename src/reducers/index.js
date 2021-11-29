import { combineReducers } from 'redux';
import auth from './auth';
import navigation from './navigation';
import alerts from './alerts';
import layout from './layout';
import products from './products';
import analytics from './analytics';
import chat from './chat';
import users from './usersReducers';
import categories from './category/categories';
import posts from './post/post';
import { connectRouter } from 'connected-react-router';
import countries from './countries/countries';
import campaign from './campaign/campaign';
import marketPlace from "./marketPlace/marketPlace"
import instagram from "./instagram/instagram"
import links from "./links/links"

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    links,
    alerts,
    auth,
    navigation,
    layout,
    products,
    analytics,
    chat,
    users,
    categories,
    posts,
    countries,
    campaign,
    marketPlace,
    instagram
});
