/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import DisplayItem from './lib/DisplayItem';
import TodoItem from './lib/TodoItem';
import Reflux from 'reflux';
import { Link } from 'react-router';
import store from './store';
import Actions from './Actions';
import getQuery from '../../common/js/getQuery';
import './assets/css/home.less';

class Component extends Reflux.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
    this.store = store;
  }
  componentDidMount() {
    const id = getQuery('id');
      Actions.homepage();  
  }

  render() {
    const { className } = this.props;
    const { data } = this.state;
    return (
      <div className={className}>
        <p className={`${className}-welcome`}>欢迎登录后台管理系统</p>
        <div className={`${className}-todo`}>
          <Link to="/commercialReview/check">
            <TodoItem title="待审核商机" count={data.numOfUncheckedSubject} unit="条" />
          </Link>
          <Link to="/identityReview/personal">
            <TodoItem title="待审核采购商" count={data.totalAuditCount} unit="人" />
          </Link>
        </div>
        <div className={`${className}-overview`}>
          <p className={`${className}-overview-title`}>数据展示</p>
          <DisplayItem
            newTitle="昨日新增商机"
            newCount={data.incOfSubjectInYesterday}
            newUnit="条"
            totalTitle="累计发布商机"
            totalCount={data.totalOfSubject}
            totalUnit="条"
          />
          <DisplayItem
            newTitle="昨日新增报价"
            newCount={data.incOfBidInYesterday}
            newUnit="条"
            totalTitle="累计报价"
            totalCount={data.totalBid}
            totalUnit="条"
          />
          <DisplayItem
            newTitle="昨日新增微铺"
            newCount={data.incOfShopInYesterday}
            newUnit="家"
            totalTitle="累计开通微铺"
            totalCount={data.totalOfShop}
            totalUnit="家"
          />
          <DisplayItem
            newTitle="昨日新增产品"
            newCount={data.incOfProdInYesterday}
            newUnit="件"
            totalTitle="累计上传产品"
            totalCount={data.totalOfProd}
            totalUnit="件"
          />
          <DisplayItem
            newTitle="昨日新增采购商"
            newCount={data.incOfBuyerInYesterday}
            newUnit="家"
            totalTitle="累计注册采购商"
            totalCount={data.totalOfBuyer}
            totalUnit="家"
          />
          <DisplayItem
            newTitle="昨日新增供应商"
            newCount={data.incOfSellerInYesterday}
            newUnit="家"
            totalTitle="累计注册供应商"
            totalCount={data.totalOfSeller}
            totalUnit="家"
          />
        </div>
      </div>
    );
  }
}

Component.displayName = 'Home';

Component.defaultProps = {
  className: 'home',
};

Component.propTypes = {
  className: React.PropTypes.string,
};

export default Component;
