import { request } from "../../utils/request";
// 更新购物车
export function updateShopCar(data) {
  return request({
    url: "/shopCar/provider/updateShopCar",
    method: "put",
    data
  });
}
// 获取购物车订单
export function getShopCar() {
  return request({
    url: "/shopCar/provider/getShopCar",
    method: "get"
  });
}
// 清空购物车
export function clearShopCar() {
  return request({
    url: "/shopCar/provider/clearShopCar",
    method: "delete"
  });
}
