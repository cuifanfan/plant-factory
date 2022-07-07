import { request } from "@/utils/request";
//获取日志列表
export function getProviderLogList(params) {
  return request({
    url: "/log/searchOpLog/provider",
    method: "get",
    params
  });
}

export function exportProviderLogs(params) {
  return request({
    url: "/log/exportOpLog",
    method: "get",
    params,
    responseType: "blob"
  });
}
