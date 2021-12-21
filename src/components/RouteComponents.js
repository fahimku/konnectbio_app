import Login from "../pages/auth/login";
import { logoutUser } from "../actions/auth";
import { Route } from "react-router";
import React from "react";
import { createBrowserHistory } from "history";
import PermissionHelper from "./PermissionHelper";
import AccountUpgrade from "../pages/accountupgrade/AccountUpgrade";
import Dashboard from "../pages/dashboard/Dashboard";

export const history = createBrowserHistory({
  forceRefresh: false,
});

export const AdminRoute = ({ currentUser, dispatch, component, ...rest }) => {
  if (
    !currentUser ||
    currentUser.role !== "admin" ||
    !Login.isAuthenticated(localStorage.getItem("token"))
  ) {
    //    return (<Redirect to="/app/main"/>)
    return history.push("/app/main");
  } else if (currentUser && currentUser.role === "admin") {
    return (
      <Route
        {...rest}
        render={(props) => React.createElement(component, props)}
      />
    );
  }
};

export const UserRoute = ({ dispatch, component, ...rest }) => {
  if (!Login.isAuthenticated()) {
    dispatch(logoutUser());
    return history.push("/app/linkinbio");
    window.history.go(0);
  } else {
    return (
      <Route
        {...rest}
        render={(props) => React.createElement(component, props)}
      />
    );
  }
};
export const PrivateRoute = ({ dispatch, component, permissions, ...rest }) => {
  const checkPermission = PermissionHelper.validate(permissions);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (!Login.isAuthenticated()) {
    dispatch(logoutUser());
    //    return (<Redirect to="/login" />)
    return history.push("/app/linkinbio");
  } else {
    if (checkPermission) {
      return (
        // eslint-disable-line
        <Route
          {...rest}
          render={(props) => React.createElement(component, props)}
        />
      );
    } else {
      if (userInfo.package.package_name === "Business Plus") {
        return <Route component={Dashboard} exact />;
      } else {
        return <Route component={AccountUpgrade} exact />;
      }
    }
  }
};

export const AuthRoute = ({ dispatch, component, ...rest }) => {
  const { from } = rest.location.state || { from: { pathname: "/app" } };

  if (Login.isAuthenticated()) {
    // return (
    //   <Redirect to={from} />

    // );

    return history.push(from);
    window.history.go(0);
    
  } else {
    return (
      <Route
        {...rest}
        render={(props) => React.createElement(component, props)}
      />
    );
  }
};
