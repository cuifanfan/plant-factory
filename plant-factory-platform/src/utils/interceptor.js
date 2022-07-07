import app from "../main";

export function interReq(config) {
  // 登录不需要token
  // if (config.url == '/login/provider') return config;
  // console.log(config);
  // let data = window.localStorage.getItem("storageData")

  // console.log(data);
  // if (data) {
  //     let token = JSON.parse(data).token;
  //     config.headers['Authorization'] = token
  // }

  return config;
}

export function interRes(config) {
  // if (config.config.url == '/login/platform') {
  //     config.data.payload = {};
  //     config.data.payload.token = config.headers['token'];
  //     return config;
  // }

  // if (config.headers.refresh === 'true') {
  //     let storage = window.localStorage;
  //     let storageData = {
  //         token: config.headers['token'],
  //     };
  //     storage.setItem("storageData", JSON.stringify(storageData));
  // }

  let data = config.data;
  if (data.code === 40001) {
    app.$message("warning", "当前用户信息已过期请重新登陆");
    setTimeout(() => {
      app.$router.replace("/login");
    }, 1000);
    document.cookie = "";
  }
  return config;
}
