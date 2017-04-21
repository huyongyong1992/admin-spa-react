/* eslint-disable import/no-extraneous-dependencies */
import nattyFetch from 'natty-fetch';
import socket from '../../common/js/msgsocket';

const apiUrl = {
  dev: '//api.m-internal.s-ant.cn/m/',
  stable: '//api.m-internal.microants.com.cn/m/',
  online: '//api.m.microants.cn/m/',
};
const mat = localStorage.getItem('mat');
const context = nattyFetch.context({
  mock: process.env.NODE_ENV === 'development',
  mockUrlPrefix: '/mock/',
  url: apiUrl[process.env.NODE_ENV],
  willFetch: function fit(vars) {
    vars.mark = {
      api: vars.mark._api,
    };
    if (vars.data.data) vars.data.data = JSON.stringify(vars.data.data);
    return vars;
  },
  fit: function fit(resp) {
    // 更新mat
    if (resp.meta && resp.meta.mat) {
      socket.init(resp.meta.mat);
      window.localStorage.setItem('mat', resp.meta.mat);
    }

    return {
      success: resp.result.success,
      content: resp.result.data,
      error: {
        errorMsg: resp.result.msg,
        errorCode: resp.result.code,
      },
    };
  },
  data: {
    v: '1.0',
    ttid: '0.1.0_admin@pc',
    did: '0',
    sign: 'sign',
    mat,
  },
  urlStamp: 'ts',
});

context.create('mtop.order.business', {
  // 200020
  listSubjects: {
    mockUrl: 'mtop.order.business.listSubjects.json',
  },
  listFeedback: {
    mockUrl: 'mtop.order.business.listFeedback.json',
  },
  checkSubject: {
    method: 'POST',
    mockUrl: 'mtop.order.business.checkSubject.json',
  },
  batchCheckSubject: {
    method: 'POST',
    mockUrl: 'mtop.order.business.batchCheckSubject.json',
  },
  changeCate: {
    method: 'POST',
    mockUrl: 'mtop.order.business.changeCate',
  },
  sda: {
    mockUrl: 'mtop.order.business.sda',
  },
  loadlabels: {
    mockUrl: 'mtop.order.business.loadlabels.json',
  },
  labelmgr: {
    method: 'POST',
    mockUrl: 'mtop.order.business.labelmgr.json',
  }
});
context.create('mtop.order.subject.bid', {
  info: {
    mockUrl: 'mtop.order.subject.bid.info.json',
  }
});
context.create('mtop.oss', {
  getH5PolicySign: {
    mockUrl: 'mtop.oss.getH5PolicySign.json',
  }
});
//后台首页
context.create('mtop.admin', {
  homepage: {
    mockUrl: 'mtop.admin.homepage.json',
  },
  login: {
    method: 'POST',
    mockUrl: 'mtop.admin.login.json',
  },
  logout: {
    method: 'POST',
    mockUrl: 'mtop.admin.logout.json',
  },
});
//获取二维码
context.create('mtop.qr', {
  getSceneQrUrl: {
    mockUrl: 'mtop.qr.getSceneQrUrl.json',
  }
});
// 蓝鲸测试专用接口
context.create('mtop.external.test', {
  getInfoTest: {
    mockUrl: 'mtop.external.test.getInfoTest.json',
  },
  getInfoTestData: {
    mockUrl: 'mtop.external.test.getInfoTestData.json',
  }
});

context.create('mtop.cat', {
  sysCates: {
    mockUrl: 'mtop.cat.sysCates.json',
  }
});
// 商铺管理
context.create('mtop.shop.store', {
  // 303007
  getShopsList: {
    mockUrl: 'mtop.shop.store.getShopsList.json',
  },
  getShopDetail: {
    mockUrl: 'mtop.shop.store.getShopDetail.json',
  }
});
//303
context.create('mtop.shop.admin.store', {
  getShopRecmdstAdmin: {
    mockUrl: 'getShopRecmdstAdmin.json',
  },
  modifyRecmdAdmin: {
    mockUrl: 'modifyRecmdAdmin.json',
    method:'POST',
  },
  getRecmdDetailAdmin: {
    mockUrl: 'getRecmdDetailAdmin.json'
  },
  modifyRecmdOrderAdmin: {
    mockUrl: 'modifyRecmdOrderAdmin.json',
    method: 'POST',
  },
  modifyRecmdStatusAdmin: {
    mockUrl: 'modifyRecmdStatusAdmin.json',
    method: 'POST',
  },
  createRecmdDetailAdmin: {
    mockUrl: 'createRecmdDetailAdmin.json',
    method:'POST',
  },
  // 修改商铺搜索状态
  modifyShopSearchStatus: {
    mockUrl: 'modifyShopSearchStatus.json',
    method: 'POST',
  },
  //商铺详情获取和添加备注接口
  addShopNotesAdmin: {
    mockUrl: 'mtop.shop.admin.store.addShopNotesAdmin',
    method: 'POST',
  },
  getShopNotesAdmin: {
    mockUrl: 'mtop.shop.admin.store.getShopNotesAdmin',
  }

});

context.create('mtop.app', {
  getMsgList: {
    mockUrl: 'mtop.app.getMsgList.json',
  },
  getBgFeedbackList: {
    mockUrl: 'mtop.app.getBgFeedbackList.json',
  },
  getBgReplyFeedbackList: {
    mockUrl: 'getBgReplyFeedbackList.json',
  },
  replyFeedback: {
    method: 'POST',
    mockUrl: 'replyFeedback.json',
  },
  getReplyedFeedbackList: {
    mockUrl: 'getReplyedFeedbackList.json'
  }
});

context.create('mtop.user', {
  freezeUser: {
    method: 'POST',
    mockUrl: 'mtop.user.freezeUser.json',
  },
  getReviewAuthList: {
    mockUrl: 'mtop.user.getReviewAuthList.json',
  },
  getEnterpriseVerifyList: {
    mockUrl: 'mtop.user.getEnterpriseVerifyList.json',
  },
  getBuyerVerifyList: {
    mockUrl: 'mtop.user.getBuyerVerifyList.json',
  },
  getFreezeUserList: {
    mockUrl: 'mtop.user.getFreezeUserList.json',
  },
  reactivateUser: {
    method: 'POST',
    mockUrl: 'mtop.user.reactivateUser',
  },
  reviewAuth: {
    method: 'POST',
    mockUrl: 'mtop.user.reviewAuth.json',
  },
  login: {
    method: 'POST',
    mockUrl: 'mtop.user.login.json',
  },
  logout: {
    method: 'POST',
    mockUrl: 'mtop.user.logout.json',
  },
  addGuestBuyer: {
    method: 'POST',
    mockUrl :'mtop.user.addGuestBuyer.json'
  },
  getGoldSupper: {
    mockUrl: 'mtop.user.getGoldSupper.json'
  },
  addGoldSupper: {
    method: 'POST',
    mockUrl: 'mtop.user.addGoldSupper.json'
  },
  deleteGoldSupper: {
    method: 'POST',
    mockUrl: 'mtop.user.deleteGoldSupper.json'
  },
});

context.create('mtop.mc', {
  saveAndUpdateMsg: {
    method: 'POST',
    mockUrl: 'mtop.mc.saveAndUpdateMsg.json',
  },
  getMsgById: {
    mockUrl: 'mtop.mc.getMsgById.json',
  },
  getAllMsgList: {
    mockUrl: 'mtop.mc.getAllMsgList',
  }

});


export default context.api;
