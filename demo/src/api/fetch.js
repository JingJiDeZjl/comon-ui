import axios from 'axios'
import querystring from 'querystring'
import { Notification } from 'element-ui'

//ajax 安全设置.
const $ = axios.create({
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  },
  withCredentials: true
})

//ajax请求拦截
$.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
});

//ajax响应拦截
$.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  return Promise.reject(error);
});


export default {
  get (url, params, callback) {
    this.request($.get(url, {params: params}), callback);
  },
  post (url, data, callback) {
    this.request($.post(url, querystring.stringify(data)), callback);
  },
  request(promiseObj, callback){
    promiseObj.then((response) => {
      let res = response.data
      if (typeof (res.error) === 'object') {
        res.error = res.error['msg']
      }
      if (res.ret === 0) {
        if (callback) callback([]);
        return Notification.error({title: '提示', message: res.error})
      }
      if (callback) callback(res.data)
    })
    .catch((e) => {
      console.log(e);
      Notification.error({title: '错误', message: '服务器异常,请稍后重试'})
    })
  }
}
