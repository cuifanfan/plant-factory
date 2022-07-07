import { request } from "@/utils/request";
//获取用户的设备列表
export function getDeviceList(params) {
  return request({
    url: "device/getDeviceList",
    method: "get",
    params
  });
}
//获取用户绑定的设备
export function getUserBindDevice(mac) {
  return request({
    url: "device/userBindDevice/" + mac,
    method: "get"
  });
}
