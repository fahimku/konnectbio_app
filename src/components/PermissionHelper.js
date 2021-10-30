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

const PermissionHelper = {
  validate,
};

export default PermissionHelper;
