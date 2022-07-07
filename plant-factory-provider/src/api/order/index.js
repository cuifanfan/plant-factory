import { request } from "@/utils/request";
//获取所有服务商订单列表
export function getProviderOrderList(params) {
  return request({
    url: "order/user/getOrderList",
    method: "get",
    params
  });
}

//获取订单的详细信息
export function getOrderDetail(id) {
  return request({
    url: "order/user/getOrderDetail/" + id,
    method: "get"
  });
}

//导出服务商自己订单
export function exportOrders(params) {
  return request({
    url: "order/provider/exportProviderOrder",
    method: "get",
    //接受文件
    responseType: "blob",
    params
  });
}

//为订单分配服务人员
export function updateOrderEnginer(params) {
  return request({
    url: "order/updateOrderEngineer/" + params.orderId + "/" + params.engineerPhone,
    method: "put",
    data: params
  });
}

//服务商修改订单状态 状态码只能为-1，3，4
export function updateOrderStatus(params) {
  return request({
    url: `order/updateOrderStatus/${params.orderId}/${params.statusCode}`,
    method: "put",
    data: params
  });
}

// 创建订单
export function createProviderOrder(data) {
  return request({
    url: "order/provider/createProviderOrder",
    method: "post",
    data
  });
}

//搜索服务商创建的订单
export function searchProviderOrder(params) {
  return request({
    url: "order/provider/searchProviderOrder",
    method: "get",
    params
  });
}
