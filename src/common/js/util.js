import { message } from 'antd';

const errorHandler = function errorHandler(e) {
 
  if(e.errorCode==="user_need_login_token_invalid" || e.errorMsg === "登录失效，请重新登录") {
    message.error(e.errorMsg || e.message);
    window.location.href = '/admin/';
    return;
  }
   message.error(e.errorMsg || e.message);
};

export {
  errorHandler,
};
