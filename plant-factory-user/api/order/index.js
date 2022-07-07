import request from '../../utils/request'
//搜索服务商创建的订单 (临时)
export function searchProviderOrder(params) {
  return request({
    url: '/order/provider/searchProviderOrder',
    method: 'get',
    params
  })
}