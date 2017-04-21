/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, useRouterHistory, IndexRoute } from 'react-router';
import { createHistory } from 'history';
import Root from './app/root';
import Home from './app/home';
import Login from './app/login';
import CommercialReview from './app/commercialReview';
import CategorySetting from './app/categorySetting';
import MessageManagement from './app/messageManagement';
import ShopsManagement from './app/shopsManagement';
import GoodsManagement from './app/goodsManagement';
import IdentityReview from './app/identityReview';
import CommentFeedback from './app/commentFeedback';
import SensitiveWords from './app/sensitiveWords';
import CrimeCase from './app/crimeCase';
import RecommendModel from './app/recommendModel';
import GoldSupplier from './app/goldSupplier';
import Test from './app/test';
import QrCode from './app/qrCode';
import './common/js/msgsocket';

const browserHistory = useRouterHistory(createHistory)({
  basename: '/admin',
});

const {
  Check: CommercialCheck,
  Freeze: CommercialFreeze,
  Setting: CommercialSetting,
  View: CommercialView,
  Detail:CommercialViewDetail,
  PushDetail:CommercialPushDetail,
} = CommercialReview;

const {
  Form: MessageForm,
} = MessageManagement;

const {
  PersonalVerify,
  EnterpriseVerify,
  BuyerVerify,
  AddBuyerVerify,
} = IdentityReview;

const {
  CrimeForm,
} = CrimeCase;
const {
  ShopDetail,
} = ShopsManagement;

const {
  PurchaseFeedback,
  ShopFeedback,
  EvaluateFeedback,
  FeedbackSetting,
  AnswerFeedback,
  DetailFeedback,
} = CommentFeedback;
const {
  RecommendForm
} = RecommendModel
const {
  AddGoldSupplier,
} = GoldSupplier;

render((
  <Router history={browserHistory}>
    <Route path="/" component={Root}>
      <IndexRoute component={Login} />
      <Route path="home" component={Home} />
      <Route path="commercialReview" component={CommercialReview}>
        <Route path="/commercialReview/check" component={CommercialCheck} />
        <Route path="/commercialReview/freeze" component={CommercialFreeze} />
        <Route path="/commercialReview/setting" component={CommercialSetting} />
        <Route path="/commercialReview/view" component={CommercialView} />
        <Route path="/commercialReview/detail" component={CommercialViewDetail} />
        <Route path="/commercialReview/pushDetail" component={CommercialPushDetail} />
      </Route>
      <Route path="categorySetting" component={CategorySetting} />

      <Route path="qrCode" component={QrCode} />

      <Route path="goldSupplier" component={ GoldSupplier } />
      
      <Route path="addGoldSupplier" component={ AddGoldSupplier } />

      <Route path="test" component={Test} />

      <Route path="messageManagement" component={MessageManagement} />
      <Route path="messageForm" component={MessageForm} />

      <Route path="shopsManagement" component={ShopsManagement} />
      <Route path="shopDetail" component={ShopDetail} />

      <Route path="goodsManagement" component={GoodsManagement} />
      <Route path="identityReview" component={IdentityReview}>
        <Route path="/identityReview/personal" component={PersonalVerify} />
        <Route path="/identityReview/enterprise" component={EnterpriseVerify} />
        <Route path="/identityReview/addBuyerVerify" component={AddBuyerVerify} />
        <Route path="/identityReview/buyer" component={BuyerVerify} />
      </Route>
      <Route path="commentFeedback" component={CommentFeedback} >
        <Route path="/commentFeedback/purchaseFeedback" component={PurchaseFeedback} />
        <Route path="/commentFeedback/detailFeedback" component={DetailFeedback} />
        <Route path="/commentFeedback/answerFeedback" component={AnswerFeedback} />
        <Route path="/commentFeedback/sellerFeedback" component={ShopFeedback} />
        <Route path="/commentFeedback/purchaseEvaluate" component={EvaluateFeedback} />
        <Route path="/commentFeedback/relativeSetting" component={FeedbackSetting} />
      </Route>
      <Route path="sensitiveWords" component={SensitiveWords} />

      <Route path="crimeCase" component={CrimeCase} />
      <Route path="crimeForm" component={CrimeForm} />
      
      <Route path="recommendModel" component={RecommendModel} />
      <Route path="/recommendModel/recommendForm" component={RecommendForm} />
    </Route>
  </Router>
), document.getElementById('app'));
