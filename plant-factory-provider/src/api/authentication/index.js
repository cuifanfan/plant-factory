import { request } from "../../utils/request";
// 服务商登录接口
export function providerLogin(data) {
  return request({
    url: "/login/provider",
    method: "post",
    data: data
  });
}

//获取图形验证码
export function getImage() {
  return request({
    url: "/captcha/image",
    method: "get"
  });
}

//获取图形验证码结果
export function getvalid(params) {
  return request({
    url: "/captcha/sms/" + params.goal + "/" + params.phone + "/" + params.sessionKey + "/" + params.imageCaptcha
  });
}

//找回密码
export function findpassword(data) {
  return request({
    url: "/forgotPassword/provider",
    method: "post",
    data: data
  });
}
