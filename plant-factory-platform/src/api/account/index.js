import { request } from "../../utils/request";
// 获取服务商角色列表
export function getProviderRoles() {
  return request({
    url: "/account/provider/getMyAccounts",
    method: "get"
  });
}
// 服务商添加角色
export function addProviderRole(data) {
  return request({
    url: "/account/provider/addAccount",
    method: "post",
    data: data
  });
}
// 根据手机号删除角色
export function delProviderRole(phone) {
  return request({
    url: "account/provider/deleteAccount/" + phone,
    method: "delete"
  });
}
// 更新用户头像
export function updateAccountAvatar(formDate) {
  return request({
    url: "account/updateAvatar",
    method: "put",
    data: formDate,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
}
// 获取自身账户信息
export function getMyInfo() {
  return request({
    url: "account/getMyProfile",
    method: "get"
  });
}

// 修改密码
export function resetPassword(formDate) {
  return request({
    url: "account/platform/resetPassword",
    method: "put",
    data: formDate
  });
}

// 获取服务商下属社区服务人员列表
export function getMyEngineerList() {
  return request({
    url: "account/engineer/getMyEngineerList",
    method: "get"
  });
}

// 添加服务商下属社区服务人员
export function addNewEngineer(data) {
  return request({
    url: "account/engineer/addNewEngineer",
    method: "post",
    data
  });
}

// 删除服务商下属社区服务人员
export function removeEngineer(phone) {
  return request({
    url: "account/engineer/removeEngineer/" + phone,
    method: "delete"
  });
}

// 修改服务商下属社区服务人员
export function updateEngineer(data) {
  return request({
    url: "account/engineer/updateEngineer",
    method: "put",
    data
  });
}

// 搜索服务商下属社区服务人员
export function searchEngineers(params) {
  return request({
    url: "account/engineer/searchEngineers",
    method: "get",
    params
  });
}

// 角色列表
export function getAllRoles() {
  return request({
    url: "/access/getAllRoles",
    method: "get"
  });
}

// 获取账户列表（平台商调用）
export function getAccountList(params) {
  return request({
    url: "/account/getAccountList",
    method: "get",
    params
  });
}

// 获取某个账户的角色信息 平台商
export function getAccountRoles(uid) {
  return request({
    url: "/account/getAccountRoles/" + uid,
    method: "get"
  });
}

// 获取某个账户的详细信息 平台商
export function getAccountProfile(uid) {
  return request({
    url: "/account/getAccountProfile/" + uid,
    method: "get"
  });
}

// 更新账户的角色信息 平台商
export function updateAccountRoles(data) {
  return request({
    url: "/account/updateAccountRoles",
    method: "put",
    data
  });
}

// 强制用户下线 平台商
export function forceOffline(uid) {
  return request({
    url: "/account/forceOffline/" + uid,
    method: "delete"
  });
}

// 修改账户状态
export function updateAccountStatus(uid, status) {
  return request({
    url: `/account/updateAccountStatus/${uid}/${status}`,
    method: "put"
  });
}

// 查看权限列表
export function getAllPermissions() {
  return request({
    url: "/access/getAllPermissions",
    method: "get"
  });
}

// 查看某角色拥有的权限
export function getPermissionsOfRole(id) {
  return request({
    url: "/access/getPermissionsOfRole/" + id,
    method: "get"
  });
}

// 添加角色
export function addRole(data) {
  return request({
    url: "/access/addRole",
    method: "post",
    data
  });
}

// 更新角色基本信息
export function updateRoleProfile(data) {
  return request({
    url: "/access/updateRoleProfile",
    method: "put",
    data
  });
}

// 更新角色权限
export function updateRolePermissions(data) {
  return request({
    url: "/access/updateRolePermissions",
    method: "put",
    data
  });
}
