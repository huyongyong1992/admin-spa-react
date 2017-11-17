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
        <p className={`${className}-welcome`}>欢迎来到召唤师峡谷</p>
        <div className={`${className}-todo`}>
          <Link to="/commercialReview/check">
            <TodoItem title="今日新增召唤师数量" count={data.todayPlayer} unit="人" />
          </Link>
          <Link to="/identityReview/personal">
            <TodoItem title="今日活跃召唤师数量" count={data.totalAuditCount} unit="人" />
          </Link>
        </div>
        <div className={`${className}-overview`}>
          <p className={`${className}-overview-title`}>召唤师峡谷数据展示</p>
          <DisplayItem
            newTitle="未成年人数量"
            newCount={data.lessEighteen}
            newUnit="人"
            totalTitle="18~20岁玩家数量"
            totalCount={data.eighteen}
            totalUnit="人"
          />
          <DisplayItem
            newTitle="20~23岁玩家数量"
            newCount={data.twenty}
            newUnit="人"
            totalTitle="23~25岁玩家数量"
            totalCount={data.twentyThree}
            totalUnit="人"
          />
          <DisplayItem
            newTitle="25~30岁玩家"
            newCount={data.twentyFive}
            newUnit="人"
            totalTitle="30~40岁玩家"
            totalCount={data.thirtyFourty}
            totalUnit="人"
          />
          <DisplayItem
            newTitle="40~50岁玩家"
            newCount={data.fourtyFifty}
            newUnit="件"
            totalTitle="50岁以上玩家"
            totalCount={data.fiftyPlus}
            totalUnit="人"
          />
          <DisplayItem
            newTitle="昨日新增付费玩家"
            newCount={data.buyerYesterday}
            newUnit="家"
            totalTitle="累计付费玩家"
            totalCount={data.totalOfBuyer}
            totalUnit="家"
          />
          <DisplayItem
            newTitle="昨日新增玩家"
            newCount={data.playerInYesterday}
            newUnit="人"
            totalTitle="累计注册玩家"
            totalCount={data.totalPlayer}
            totalUnit="人"
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
