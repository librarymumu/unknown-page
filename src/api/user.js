// 用户相关接口
import request from "@/utils/request.js";

export default {
  // 登录
  login(userName, password) {
    return request.post("user/login", {
      username: userName,
      password: password
    });
  },

  // 注册
  register(phone, userName, password) {
    return request.post("user/register", {
      phone: phone,
      userName: userName,
      password: password
    });
  }
};
