import { request } from "../../utils/request";
// 获取服务商列表
export function getProviderList(params) {
  return request({
    url: "provider/getProviderList",
    method: "get",
    params
  });
}
// 新建服务商
export function addNewProvider(data) {
  return request({
    url: "provider/addNewProvider",
    method: "post",
    data
  });
}
// 删除服务商
export function removeProvider(id) {
  return request({
    url: "provider/removeProvider/" + id,
    method: "delete"
  });
}
// 更新服务商
export function updateProviderDetail(data) {
  return request({
    url: "provider/updateProviderDetail",
    method: "put",
    data
  });
}

// 删除服务商
export function getProviderNameList() {
  return request({
    url: "/provider/getProviderNameList",
    method: "get"
  });
}
