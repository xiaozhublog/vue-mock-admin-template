import axios from "axios";
import store from "@/store";
import { Message, MessageBox } from "element-ui";
import { getToken } from "@/utils/auth";

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base baseURL + request url
  timeout: 5000,
});

// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    if (store.getters["user/token"]) {
      config.headers["token"] = getToken();
    }
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    const res = response.data;
    if (res.code !== 200) {
      Message({
        message: res.message || "Error",
        type: "error",
        duration: 5 * 1000,
      });
      // 50008: token非法; 50012: 其他客户端登录; 50014: Token 过期;
      if (res.code === 50008 || res.code === 50014) {
        MessageBox.confirm(
          "您已退出登录，您可以取消以留在此页面，或重新登录",
          "确认注销",
          {
            confirmButtonText: "重新登录",
            cancelButtonText: "取消",
            type: "warning",
          }
        ).then(() => {
          store.dispatch("user/resetToken").then(() => {
            location.reload();
          });
        });
      }
      // return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res;
    }
  },
  (error) => {
    // 对响应错误做点什么
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);
export default instance;
