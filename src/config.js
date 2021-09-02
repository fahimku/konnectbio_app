const hostApi = process.env.NODE_ENV === "development" ? "http://172.16.1.85" : "https://api.konnect.bio";
const portApi = process.env.NODE_ENV === "development" ?  '9000' : "";
const baseURLApi = `${hostApi}${portApi ? `:${portApi}` : ``}/v1`;
const redirectUrl = process.env.NODE_ENV === "development" ? "http://localhost:3000/sing-app-react" : "https://app.konnect.bio";

export default {
  redirectUrl,
  hostApi,
  portApi,
  baseURLApi,
  remote: "https://api.konnect.bio",
  isBackend: process.env.REACT_APP_BACKEND,
  auth: {
    email: 'roi@admdenim.com',
    password: '123'
  },
  app: {
    colors: {
      dark: "#002B49",
      light: "#FFFFFF",
      sea: "#004472",
      sky: "#E9EBEF",
      wave: "#D1E7F6",
      rain: "#CCDDE9",
      middle: "#D7DFE6",
      black: "#13191D",
      salat: "#21AE8C",
    },
  }
};