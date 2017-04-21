/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Reflux from 'reflux';
import store from './store';
import Actions from './Actions';
import { DatePicker,Radio,Button,Table ,Select} from 'antd';
import moment from 'moment';

import './assets/css/evaluateFeedback.less';
const { RangePicker } = DatePicker;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Option = Select.Option;

const dateFormatter = 'YYYY/MM/DD';
const today = moment().format(dateFormatter);


class Component extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {
      data : {},
      msgs: '',
      filter:{
        score: '',
        roleType: '',
        from: moment(today, dateFormatter).subtract(6, 'd').format(dateFormatter),
        to: today,
        pageNum:'1',
        pageSize:'10',
      }
      
    }
    this.store = store;
  }
  componentDidMount(){
    const { filter } = this.state;
    Actions.listFeedback({
      data:filter
    })
  }
  
  onPageChange(value) {
    this.setState((state) => {
      const { filter } = state;
      filter.pageNum = value;
      state.filter = filter;
      return state;
    }, () => {
      Actions.listFeedback({
        data: this.state.filter,
      }, (msg) => {
        message.error(msg.errorMsg || msg.message);
      });
    });
  }
  onShowSizeChange(pageNo,pageSize){
    this.setState((state) => {
      const { filter } = state;
      filter.pageSize = pageSize;
      filter.pageNum = pageNo;
      state.filter = filter;
      return state;
    }, () => {
      Actions.listFeedback({
        data: this.state.filter,
      }, (msg) => {
        message.error(msg.errorMsg || msg.message);
      });
    });
  }
  onShowTotal(total){
    return `共${total}条`
  }

  onDateRangeChange(dates, dateStrings) {
    this.setState((state) => {
      const { filter } = state;
      filter.from = dateStrings[0];
      filter.to = dateStrings[1];
      state.filter = filter;
      return state;
    }, () => {
      Actions.listFeedback({
        data: this.state.filter,
      }, (msg) => {
        message.error(msg.errorMsg || msg.message);
      });
    });
  }

  onDateRadioChange(val) {
    const value = val.target.value;
    this.setState((state) => {
      const { filter } = state;
      filter.to = today;
      filter.from = moment(today, dateFormatter).subtract(value, 'd').format(dateFormatter);
      state.filter = filter;
      return state;
    }, () => {
      Actions.listFeedback({
        data: this.state.filter,
      }, (msg) => {
        message.error(msg.errorMsg || msg.message);
      });
    });
  }
  onStatusChange(val) {
    let value = val.target.value;
    
    this.setState((state) => {
      const { filter } = state;
      filter.roleType = value;
      state.filter = filter;
      return state;
    }, () => {
      Actions.listFeedback({
        data: this.state.filter,
      }, (msg) => {
        message.error(msg.errorMsg || msg.message);
      });
    });
  }
  
  onScoreChange(value){
    this.setState((state) => {
      const { filter } = state;
      filter.score = value;
      state.filter = filter;
      return state;
    }, () => {
      Actions.listFeedback({
        data: this.state.filter,
      }, (msg) => {
        message.error(msg.errorMsg || msg.message);
      });
    });
  }
  render() {
    const columns = [{
      title: '用户',
      dataIndex: 'mobile',
      
    }, {
      title: '评价订单id',
      dataIndex: 'id',
    }, {
      title: '打分',
      dataIndex: 'score',
    },{
      title: '评价标签',
      dataIndex: 'labels',
      className:"labelsList",
      render:(text,record) => {
        const textList = text.split(",");
        const labels = textList.map((data,i) => (
          <li key={i}>{data}</li>
        ));
        return(
          <ul>{labels}</ul>
        )
      }
    },{
      title: '反馈内容',
      dataIndex: 'content',
      className:'feedContent'
    },{
      title: '评价时间',
      dataIndex: 'time',
      
    }];
    
    const { filter,list,total } = this.state;
    const {score ,roleType,from,to,pageNum} =filter;

    return (
      <div>
        <div className= "dateTime">
          <div>时间:</div>
          <div>
            <RangePicker value={[moment(from, dateFormatter), moment(to, dateFormatter)]}
              format={dateFormatter} onChange={this.onDateRangeChange.bind(this)} />
          </div>
          <div>
            <RadioGroup onChange={this.onDateRadioChange.bind(this)} defaultValue={6}>
              <RadioButton value={0}>今天</RadioButton>
              <RadioButton value={6}>近7天</RadioButton>
              <RadioButton value={29}>近30天</RadioButton>
            </RadioGroup>
          </div>
        </div>
        <div className="feedbackStatus">
          <div className="status">
            <div>用户:</div>
            <div>
              <RadioGroup value={ roleType } onChange={this.onStatusChange.bind(this)} defaultValue="">
                <RadioButton value={''}>全部</RadioButton>
                <RadioButton value={2}>采购商</RadioButton>
                <RadioButton value={4}>供应商</RadioButton>
              </RadioGroup>
            </div>
          </div>
          <div className="status">
            <div>分值:</div>
            <div>
              <Select style={{ width: 100 }} onChange={this.onScoreChange.bind(this)} defaultValue='-1'>
                <Option value='-1'>全部</Option>
                <Option value='2'>2分</Option>
                <Option value='4'>4分</Option>
                <Option value='6'>6分</Option>
                <Option value='8'>8分</Option>
                <Option value='10'>10分</Option>
              </Select>
            </div>
          </div>
        </div>

        <Table 
          columns={columns} 
          dataSource={list} 
          pagination={{
            showSizeChanger:true,
            total,
            onChange: this.onPageChange.bind(this),
            current: pageNum,
            showQuickJumper: true,
            onShowSizeChange:this.onShowSizeChange.bind(this),
            showTotal:this.onShowTotal.bind(this),
          }}  
          bordered/>
      </div>
    );
  }
}

Component.defaultProps = {
  className: 'EvaluateFeedback',
};

Component.propTypes = {
  className: React.PropTypes.string,
};

export default Component;
