import { request } from "../../utils/request";
// 服务商登录接口
export function providerLogin(data) {
  return request({
    url: "/login/provider",
    method: "post",
    data: data
  });
}

//平台商登录
export function platformLogin(data) {
  return request({
    url: "/login/platform",
    method: "post",
    data: data
  });
}

//获取图形验证码
export function getImage() {
  return request({
    url: "/captcha/getImageCaptcha",
    method: "get"
  });
}

//获取图形验证码结果
export function getvalid(params) {
  return request({
    // url: '/captcha/sms/' + params.goal + '/' + params.phone + '/' + params.sessionKey + '/' + params.imageCaptcha
    url: "/captcha/sendSmsCaptcha",
    method: "get",
    params
  });
}

//找回密码
export function findpassword(data) {
  return request({
    url: "/account/forgotPassword",
    method: "post",
    data: data
  });
}
