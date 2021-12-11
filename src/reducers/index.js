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
import addCampaignToShop from "./marketPlace/addCampaignToShop";
import instagram from "./instagram/instagram";
import links from "./links/links";
import campaignSummary from "./campaign/campaignSummary";
import dashboard from "./dashboard";
import campaignAnalytics from "./campaign/campaignAnalytics";
import brands from "./brands/brands";
import brandsCategory from "./brands/brandsCategory";
import bioshop from "./bioshop/bioshop";
import singleBioShop from "./bioshop/singleBioShop";
import postSummary from "./post/postSummary";

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    links,
    brands,
    addCampaignToShop,
    brandsCategory,
    alerts,
    auth,
    navigation,
    dashboard,
    layout,
    users,
    bioshop,
    singleBioShop,
    categories,
    posts,
    countries,
    campaign,
    marketPlace,
    instagram,
    campaignSummary,
    campaignAnalytics,
    postSummary,
  });
