import { request } from "../../utils/request";
// 获取地区
export function getArea(pcode) {
  return request({
    url: "/basic/region/getRegionList/" + pcode,
    method: "get"
  });
}
