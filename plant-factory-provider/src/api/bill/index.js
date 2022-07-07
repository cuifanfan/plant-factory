import { request } from "@/utils/request";
// 查询收支明细
export function getProviderBillList(params) {
  return request({
    url: "/bill/getProviderBillList",
    method: "get",
    params
  });
}

export function exportBills(params) {
  return request({
    url: "/bill/exportBills",
    method: "get",
    params,
    responseType: "blob"
  });
}
