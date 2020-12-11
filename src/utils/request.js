import axios from "axios";
import Qs from "qs";
// import { Modal } from 'ant-design-vue';
// import { store } from '../store'

/**
 * 创建axios实例
 */
console.info("process.env.BASE_URL", process.env.BASE_URL);
const request = axios.create({
  baseURL: process.env.BASE_URL, // api的base_url
  timeout: 600000, // 请求超时时间
  withCredentials: true,
  // <---- 这里使用 qs 转换参数 解决php无法接收post传参
  transformRequest: [
    function(data) {
      // 转换数据
      data = Qs.stringify(data); // 通过Qs.stringify转换为表单查询参数
      return data;
    }
  ],
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  }
});

// 添加请求拦截器
request.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    // let localData = localStorage.getItem("vuex") ? JSON.parse(localStorage.getItem("vuex")) : '';

    // store.state.loading = true

    // if (localData && localData.token) {
    //   config.headers['Authorization'] = localData.token;
    // }
    // config.headers["Content-type"] = "application/x-www-form-urlencoded";
    // config.data = {
    //   usernmae: "library",
    //   password: "123456"
    // };
    // console.info("config", config);
    let url = config.url;
    // get参数编码
    if (config.method === "get" && config.params) {
      url += "?";
      const keys = Object.keys(config.params);
      for (const key of keys) {
        if (config.params[key] != null) {
          url += `${key}=${encodeURIComponent(config.params[key])}&`;
        }
      }
      console.info("config", config);
      url = url.substring(0, url.length - 1);
      config.params = {};
    }
    config.url = url;
    return config;
  },
  error => {
    // 对请求错误做些什么
    // store.state.loading = false
    return Promise.reject(error);
  }
);

// 添加响应拦截器
request.interceptors.response.use(
  response => {
    console.log("response", response);
    // 对响应数据做点什么
    // store.state.loading = false
    const res = response.data;

    // code===200 认为是正常返回
    if (res && res.code === 0) {
      return res;
    }
    // code === -1 表示登录过期
    if (res.code === -1) {
      Modal.confirm({
        title: "提示",
        // eslint-disable-next-line
        content: h => (
          <div style="color:red;">
            会话超时，您可以点击取消继续留在该页面，或者重新登录
          </div>
        ),
        cancelText: "取消",
        okText: "重新登录",
        onOk() {
          localStorage.clear();
          store.state.token = "";
          let currentHash = window.location.hash;
          window.location.hash = `#/login?redirect_hash=${currentHash}`;
          location.reload();
        },
        onCancel() {
          console.log("Cancel");
        },
        class: "test"
      });
    }
    return Promise.reject(res);
  },
  error => {
    console.log("error", error);
    // 对响应错误做点什么
    store.state.loading = false;
    if (error.response && error.response.data) {
      console.log("error1", error);
      // 返回了错误信息
      try {
        var data = error.response.data;
        return Promise.reject(data);
      } catch (error) {
        return Promise.reject({
          code: -1,
          message: "网络异常: " + error.response.data
        });
      }
    } else {
      return Promise.reject({
        code: -1,
        message: error
      });
    }
  }
);

export default request;
