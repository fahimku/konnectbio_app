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
  const userPermissions = userInfo.package.category_count
    ? userInfo.package.category_count
    : 0;

  return userPermissions === 0 ? true : false;
};

const PermissionHelper = {
  validate,
  categoryCheck,
};

export default PermissionHelper;
