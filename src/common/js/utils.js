/* eslint-disable import/no-extraneous-dependencies */
import { message } from 'antd';

const location = window.location;
const history = window.history;
const decodeURIComponent = window.decodeURIComponent;

const isArray = Array.isArray || (xs => Object.prototype.toString.call(xs) === '[object Array]');
const measureCache = {};

const getQuery = (key) => {
  const query = {};
  location.search.slice(1).split('&').forEach((item) => {
    const queryPair = item.split('=');
    query[queryPair[0]] = queryPair[1];
  });

  const rst = query[key];

  return rst ? decodeURIComponent(query[key]) : '';
};

const successHandler = (msg, onClose) => (
  () => {
    message.success(msg, 3, onClose);
  }
);

const errorHandler = (e, onClose) => {
  message.error(e.errorMsg || e.message, 3, onClose);
};

const redirect = (url) => {
  location.href = url;
};

const historyBack = () => {
  if (history.length <= 1) {
    window.WebViewJavascriptBridge.callHandler('finish', {}, () => {});
  } else {
    history.back();
  }
};

const formateTime = (time, formate = 'MM-DD HH:MM') => {
  const value = String(time);
  const year = value.slice(0, 4);
  const month = value.slice(4, 6);
  const date = value.slice(6, 8);
  const hour = value.slice(8, 10);
  const minute = value.slice(10, 12);

  return formate.replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', date)
    .replace('HH', hour)
    .replace('MM', minute);
};

const measureImages = (v) => {
  const imgs = isArray(v) ? v : [v];
  const measure = img => new Promise((resolve, reject) => {
    if (measureCache[img]) {
      resolve(measureCache[img]);
    } else {
      const image = new Image();
      image.onload = () => {
        const rst = {
          w: image.width,
          h: image.height,
        };
        measureCache[img] = rst;
        resolve(rst);
      };
      image.onerror = () => {
        reject({
          errorMsg: `${img} load error`,
        });
      };
      image.src = img;
    }
  });
  return Promise.all(imgs.map(img => measure(img)));
};

export {
  getQuery,
  redirect,
  errorHandler,
  successHandler,
  historyBack,
  formateTime,
  measureImages,
};
