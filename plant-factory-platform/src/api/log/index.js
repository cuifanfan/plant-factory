import { request } from "@/utils/request";
//获取日志列表
export function getPlatformLogList(params) {
  return request({
    url: "/log/searchOpLog/platform",
    method: "get",
    params
  });
}

export function exportPlatformLogs() {
  return request({
    url: "/log/exportPlatformLogs",
    method: "get",
    responseType: "blob"
  });
}
