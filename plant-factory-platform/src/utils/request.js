import axios from "axios";
import { interReq, interRes } from "./interceptor";
const baseUrl = process.env.VUE_APP_BASE_API;
// 此模块为请求封装模块
export function request(config) {
  return new Promise((resolve, reject) => {
    let instance = axios.create({
      baseURL: baseUrl,
      timeout: 5000,
      withCredentials: true
    });
    instance.interceptors.request.use(interReq);
    instance.interceptors.response.use(interRes);
    // instance.defaults.withCredentials = true;
    // 根据请求的url对成功结果结果进行过滤
    instance(config).then(
      (value) => {
        // console.log(value);
        let data = value.data;
        // 判断是请求成功的blob对象还是请求失败的blob对象
        if (data instanceof Blob) {
          if (value.headers["content-type"] === "application/x-download") {
            // 如果data为二进制流则直接返回blob对象
            resolve(data);
          } else {
            let reader = new FileReader();
            reader.readAsText(data, "utf-8");
            reader.onload = function (e) {
              reject(JSON.parse(reader.result));
            };
          }
        } else {
          if (data.flag) resolve(data);
          else reject(data);
        }
      },
      (reason) => {
        console.log(reason);
        reject(reason);
      }
    );
  });
}
