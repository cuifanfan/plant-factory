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
    url: "account/provider/updateAccountAvatar",
    method: "post",
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
    url: "account/provider/resetPassword",
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
