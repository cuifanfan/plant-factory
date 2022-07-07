// 此模块为输入校验模块

// 检验是否为指定字符的用户名
function checkUsername(username) {
  let pattern = /a-zA-Z0-9._/;
  return pattern.test(username);
}

// 检验是否为邮箱格式
function checkEmail(email) {
  let pattern = /.+@.+\..+/;
  return pattern.test(email);
}

export default {
  checkUsername,
  checkEmail
};
