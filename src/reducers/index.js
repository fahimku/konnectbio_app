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
import bioShopSummary from "./campaign/bioshopSummary";
import dashboard from "./dashboard";
import campaignAnalytics from "./campaign/campaignAnalytics";
import brands from "./brands/brands";
import brandsCategory from "./brands/brandsCategory";
import bioshop from "./bioshop/bioshop";
import singleBioShop from "./bioshop/singleBioShop";
import postSummary from "./post/postSummary";
import chat from "./chat";
import hashtags from "./hashtags/hashtags";
import hashtag from "./hashtags/hashtag";
import tags from "./mention/tags";
import profile from "./searchProfile/profiles";
import profiles from "./searchProfile/addProfile";
import instagramAnalytic from "./analytics/instagramAnalytic";
import instagramUserData from "./instagramUserData";
import instagramPostData from "./myposts/instagramPostData";
import gallery from "./instagram/gallery";
import schedulePosts from "./instagram/schedulePosts";
import mobileDropdown from "./mobileDropdrown";
import mediaSummary from "./media/mediaSummary";
import affiliateTransactions from "./affiliateTransactions/affiliateTransactions";
import affiliateCampaigns from "./affiliateTransactions/affiliateCampaigns";
import affiliateInfluencers from "./affiliateTransactions/affiliateInfluencers";
import marketplaceTransactions from "./marketplaceTransactions/marketplaceTransactions";
import marketplaceBrands from "./marketplaceTransactions/marketplaceBrands";
import marketplaceCampaigns from "./marketplaceTransactions/marketplaceCampaigns";

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    links,
    chat,
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
    bioShopSummary,
    campaignAnalytics,
    postSummary,
    hashtags,
    hashtag,
    tags,
    profile,
    profiles,
    instagramAnalytic,
    instagramUserData,
    instagramPostData,
    gallery,
    schedulePosts,
    mobileDropdown,
    mediaSummary,
    affiliateTransactions,
    affiliateCampaigns,
    affiliateInfluencers,
    marketplaceTransactions,
    marketplaceBrands,
    marketplaceCampaigns,
  });
