import AccountUpgrade from "../pages/accountupgrade/AccountUpgrade";

const validate = (modulePermission) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const userPermissions = userInfo.package.features
    ? userInfo.package.features
    : [];

  const permit = modulePermission.filter((permission) => {
    return userPermissions.indexOf(permission) !== -1;
  });
  return permit.length ? true : false;
};

const categoryCheck = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const userPermissions = userInfo.package.category_count? userInfo.package.category_count: 0;
  return userPermissions === 0 ? true : false;
};

const checkPermissions = (Component, props) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  let permissions = userInfo.package.features || "";
  let componentPermissions = props.permissions || [];

  let permissionFilter = componentPermissions.filter((p) => {
    return permissions.indexOf(p) !== -1;
  });

  if (permissionFilter.length > 0) return Component;
  else return AccountUpgrade;
};

const PermissionHelper = {
  validate,
  categoryCheck,
  checkPermissions,
};

export default PermissionHelper;
