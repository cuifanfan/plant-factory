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

//导出订单
export function exportOrders(params) {
  return request({
    url: "order/exportOrders",
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
export function createProviderOrder() {
  return request({
    url: "order/provider/createProviderOrder",
    method: "post"
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

//搜索所有采购订单
export function searchAllorder(params) {
  return request({
    url: "order/provider/searchAllOrder",
    method: "get",
    params
  });
}
