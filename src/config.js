//Araj PC
// const hostApi =
//   process.env.NODE_ENV === "development"
//     ? "http://172.16.1.85:9000"
//     : "https://api.konnect.bio";
// Kashif Bhai PC
// const hostApi =
//   process.env.NODE_ENV === "development"
//     ? "http://172.16.1.157:9000"
//      : "https://api.konnect.bio";
// const hostApi = process.env.NODE_ENV === "development" ? "https://kbserverdev.herokuapp.com" : "https://api.konnect.bio";
// const hostApi = "https://kbserverdev.herokuapp.com";
const hostApi = "https://api.konnect.bio";
const portApi = process.env.NODE_ENV === "development" ? "" : "";
const baseURLApi = `${hostApi}${portApi ? `:${portApi}` : ``}/v1`;
const baseURLApiToken = `${hostApi}${portApi ? `:${portApi}` : ``}`;

const redirectURL =
  process.env.NODE_ENV === "development"
    ? "https://app.konnect.bio"
    : "https://app.konnect.bio";
const visitorURL =
  process.env.NODE_ENV === "development"
    ? "https://devp.konnect.bio"
    : "https://konnect.bio";

export default {
  redirectURL,
  hostApi,
  portApi,
  baseURLApi,
  baseURLApiToken,
  visitorURL,
  remote: "https://api.konnect.bio",
  isBackend: process.env.REACT_APP_BACKEND,
  auth: {
    email: "roi@admdenim.com",
    password: "123",
  },
  endPoint: {
    global: {
      countries: "common/receive/countries",
      connect: "social/ig/url/instagram",
    },
    auth: {
      login: "signin/user",
      register: "signup/user",
      forgotPassword: "",
    },
    posts: {
      create: "",
      update: "",
      delete: "",
      getAll: "",
    },
    analytics: {
      profileViews: "",
      postClicks: "",
    },
    getAllCountries: "common/receive/countries",
    getAllCategories: "common/receive/categories",
    getAllBrands: "brands/receive",
  },
  app: {
    colors: {
      dark: "#010b40",
      light: "#FFFFFF",
      sea: "#004472",
      sky: "#E9EBEF",
      wave: "#D1E7F6",
      rain: "#CCDDE9",
      middle: "#D7DFE6",
      black: "#13191D",
      salat: "#21AE8C",
    },
  },
};
