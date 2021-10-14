import axios from "axios";
import config from "../config";
import jwt from "jsonwebtoken";
import { toast } from "react-toastify";
import { push } from "connected-react-router";
import Errors from "../components/FormItems/error/errors";
import { mockUser } from "./mock";
import { createBrowserHistory } from "history";

export const AUTH_FAILURE = "AUTH_FAILURE";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const RESET_REQUEST = "RESET_REQUEST";
export const RESET_SUCCESS = "RESET_SUCCESS";
export const PASSWORD_RESET_EMAIL_REQUEST = "PASSWORD_RESET_EMAIL_REQUEST";
export const PASSWORD_RESET_EMAIL_SUCCESS = "PASSWORD_RESET_EMAIL_SUCCESS";
export const AUTH_INIT_SUCCESS = "AUTH_INIT_SUCCESS";
export const AUTH_INIT_ERROR = "AUTH_INIT_ERROR";
export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";

export const history = createBrowserHistory({
  forceRefresh: true,
});

async function findMe() {
  if (config.isBackend) {
  //  const response = await axios.get("/auth/me");
    return []
  } else {
    return mockUser;
  }
}

export function authError(payload) {
  return {
    type: AUTH_FAILURE,
    payload,
  };
}

export function doInit() {
  return async (dispatch) => {
    let currentUser = null;
    if (!config.isBackend) {
      currentUser = mockUser;
      dispatch({
        type: AUTH_INIT_SUCCESS,
        payload: {
          currentUser,
        },
      });
    } else {
      try {
        let token = localStorage.getItem("token");
        if (token) {
          currentUser = await findMe();
        }
        dispatch({
          type: AUTH_INIT_SUCCESS,
          payload: {
            currentUser,
          },
        });
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: AUTH_INIT_ERROR,
          payload: error,
        });
      }
    }
  };
}

export function logoutUser() {
  return (dispatch) => {
    dispatch({
      type: LOGOUT_REQUEST,
    });
    localStorage.removeItem("token");
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    localStorage.removeItem("userInfo");
    axios.defaults.headers.common["Authorization"] = "";
    dispatch({
      type: LOGOUT_SUCCESS,
    });
    history.push("/login");
  };
}

export function receiveToken(token) {
  return (dispatch) => {
    let user;

    if (config.isBackend) {
      user = jwt.decode(token);
    } else {
      user = {
        email: config.auth.email,
        user: {
          id: "default_no_connection_id_444",
        },
      };
    }

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    dispatch({
      type: LOGIN_SUCCESS,
    });
   history.push("/app");
  };
}

export function loginUser(creds) {
  return (dispatch) => {
    localStorage.setItem("dashboardTheme", "white");
    localStorage.setItem("navbarColor", "#fff");
    localStorage.setItem("navbarType", "fixed");

    dispatch({
      type: LOGIN_REQUEST,
    });

    if (creds.email.length > 0 && creds.password.length > 0) {
      axios
        .post("/signin/user", creds)
        .then((res) => {
          const token = res.data.message.token;
          const userInfo = {
            user_id: res.data.message.user_id,
            access_token: res.data.message.access_token,
            username: res.data.message.username,
            email: res.data.message.email,
            user_type: res.data.message.user_type,
            country: res.data.message.country,
            city: res.data.message.city,
            zip: res.data.message.zip,
          };
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
          dispatch(receiveToken(token));
          dispatch(doInit());
          history.push("/app");
        })
        .catch((err) => {
          dispatch(authError(err.response.data.message));
        });
    } else {
      dispatch(authError("Something was wrong. Try again"));
    }
  };
}

export function verifyEmail(token) {
  return (dispatch) => {
    if (!config.isBackend) {
      history.push("/login");
    } else {
      axios
        .put("/auth/verify-email", { token })
        .then((verified) => {
          if (verified) {
            toast.success("Your email was verified");
          }
        })
        .catch((err) => {
          toast.error(err.response.data);
        })
        .finally(() => {
          history.push("/login");
        });
    }
  };
}

export function resetPassword(token, password) {
  return (dispatch) => {
    if (!config.isBackend) {
      dispatch(push("/login"));
    } else {
      dispatch({
        type: RESET_REQUEST,
      });
      axios
        .put("/auth/password-reset", { token, password })
        .then((res) => {
          dispatch({
            type: RESET_SUCCESS,
          });
          toast.success("Password has been updated");
          history.push("/login");
        })
        .catch((err) => {
          dispatch(authError(err.response.data));
        });
    }
  };
}

export function sendPasswordResetEmail(email) {
  return (dispatch) => {
    if (!config.isBackend) {
      history.push("/login");
    } else {
      dispatch({
        type: PASSWORD_RESET_EMAIL_REQUEST,
      });
      axios
        .post("/auth/send-password-reset-email", { email })
        .then((res) => {
          dispatch({
            type: PASSWORD_RESET_EMAIL_SUCCESS,
          });
          toast.success("Email with resetting instructions has been sent");
          history.push("/login");
        })
        .catch((err) => {
          dispatch(authError(err.response.data));
        });
    }
  };
}

export function registerUser(creds) {
  return (dispatch) => {
    dispatch({
      type: REGISTER_REQUEST,
    });
    if (creds.email.length > 0 && creds.password.length > 0) {
      axios
        .post("/signup/user", creds)
        .then((res) => {
          dispatch({
            type: REGISTER_SUCCESS,
          });
          toast.success("You've been registered successfully.");
          history.push("/login");
        })
        .catch((err) => {
          dispatch(authError(err.response.data.message));
        });
    } else {
      dispatch(authError("Something was wrong. Try again"));
    }
  };
}
