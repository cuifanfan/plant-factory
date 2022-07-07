import { request } from "../../utils/request";

export function getProviderInfo() {
  return request({
    url: "provider/myInfo",
    method: "get"
  });
}
