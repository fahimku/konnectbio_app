import { combineReducers } from "redux";
import auth from "./auth";
import navigation from "./navigation";
import alerts from "./alerts";
import layout from "./layout";
import users from "./usersReducers";
import categories from "./category/categories";
import posts from "./post/post";
import { connectRouter } from "connected-react-router";
import countries from "./countries/countries";
import campaign from "./campaign/campaign";
import marketPlace from "./marketPlace/marketPlace";
import instagram from "./instagram/instagram";
import links from "./links/links";
import campaignSummary from "./campaign/campaignSummary";
import dashboard from "./dashboard";
import brands from "./brands/brands";
import brandsCategory from "./brands/brandsCategory";

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    links,
    brands,
    brandsCategory,
    alerts,
    auth,
    navigation,
    dashboard,
    layout,
    users,
    categories,
    posts,
    countries,
    campaign,
    marketPlace,
    instagram,
    campaignSummary,
  });