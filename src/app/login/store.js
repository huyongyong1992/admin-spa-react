/* eslint-disable import/no-extraneous-dependencies */
import Reflux from 'reflux';
import { browserHistory } from 'react-router';
import Actions from './Actions';
import fetch from '../../common/js/fetch';
import { errorHandler } from '../../common/js/util.js';

export default Reflux.createStore({
  listenables: Actions,
  init() {
    this.state = {
      data: [],
      total: '',
    };
  },
  onLogin(params,scb) {
    console.log(params)
    if(params.data.mobile === '13265821397' && params.data.pwd === 'admin'){
      const mobile = params.data.mobile;
      const nickname = '旅行者1号'
      window.location.href = '/admin/home?id='+mobile+'&nickname='+nickname;
    }else{
      alert('用户名或密码错误')
    }
    
    // fetch.mtop.admin.login(params).then((data) => {
    //   const mobile = data&&data.mobile || '旅行者1号';
    //   const nickname = data&&data.nickname || '旅行者1号';
    //   const iconUrl  = data&&data.iconUrl || 'https://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=%E5%BE%AE%E8%B7%9D%E6%91%84%E5%BD%B1&step_word=&hs=0&pn=29&spn=0&di=110518283260&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=2&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=-1&cs=1431618490%2C1753687822&os=1839032702%2C2685053666&simid=3386753815%2C295422197&adpicid=0&lpn=0&ln=1978&fr=&fmq=1480332039000_R_D&fm=&ic=0&s=undefined&se=&sme=&tab=0&width=&height=&face=undefined&ist=&jit=&cg=&bdtype=0&oriquery=&objurl=http%3A%2F%2Fn1.itc.cn%2Fimg8%2Fwb%2Frecom%2F2016%2F06%2F22%2F146658831569718860.JPEG&fromurl=ippr_z2C%24qAzdH3FAzdH3F4p_z%26e3Bf5i7_z%26e3Bv54AzdH3Fda8mamddAzdH3Fg9cc0dl8cn_z%26e3Bfip4s&gsm=0&rpstart=0&rpnum=0';
      
    // }).catch(errorHandler);
  }
  
});
