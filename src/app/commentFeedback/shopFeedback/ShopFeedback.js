/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Reflux from 'reflux';
import store from './store';
import Actions from './Actions';
import { DatePicker,Radio,Button,Table } from 'antd';
import { Link } from 'react-router';
import './assets/css/shopFeedback.less';
import moment from 'moment';

const { RangePicker } = DatePicker;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const dateFormatter = 'YYYY/MM/DD';
const today = moment().format(dateFormatter);

class Component extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {
      data : {},
      list:[],
      total:'',
      filter:{
        utype: '2',
        status: '',
        createStartTime: moment(today, dateFormatter).subtract(6, 'd').format(dateFormatter),
        createEndTime: today,
        channel:'',
        pageNo:'1',
        pageSize:'10',
      }
    }
    this.store = store;
  }
  componentDidMount(){
    const { filter } = this.state;

    Actions.getBgFeedbackList({
      data:filter
    })
  }

  onPageChange(value) {
    this.setState((state) => {
      const { filter } = state;
      filter.pageNo = value;
      state.filter = filter;
      return state;
    }, () => {
      Actions.getBgFeedbackList({
        data: {
          pageNo:this.state.filter.pageNo,
        }
      }, (msg) => {
        message.error(msg.errorMsg || msg.message);
      });
    });
  }
  onShowSizeChange(pageNo,pageSize){
    this.setState((state) => {
      const { filter } = state;
      filter.pageSize = pageSize;
      filter.pageNo = pageNo;
      state.filter = filter;
      return state;
    }, () => {
      Actions.getBgFeedbackList({
        data: {
          pageSize:this.state.filter.pageSize,
          pageNo:this.state.filter.pageNo,
        }
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
      filter.createStartTime = dateStrings[0];
      filter.createEndTime = dateStrings[1];
      state.filter = filter;
      return state;
    }, () => {
      Actions.getBgFeedbackList({
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
      filter.createEndTime = today;
      filter.createStartTime = moment(today, dateFormatter).subtract(value, 'd').format(dateFormatter);
      state.filter = filter;
      return state;
    }, () => {
      Actions.getBgFeedbackList({
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
      filter.status = value;
      state.filter = filter;
      return state;
    }, () => {
      Actions.getBgFeedbackList({
        data: this.state.filter,
      }, (msg) => {
        message.error(msg.errorMsg || msg.message);
      });
    });
  }
  // 选择渠道
  onRoadChange(val){
    let value = val.target.value;
    this.setState((state) => {
      const { filter } = state;
      filter.channel = value;
      state.filter = filter;
      return state;
    }, () => {
      Actions.getBgFeedbackList({
        data: this.state.filter,
      }, (msg) => {
        message.error(msg.errorMsg || msg.message);
      });
    });
  }
  render() {
    const { filter ,total ,list,data } = this.state;
    const {channel ,status,createStartTime,createEndTime,pageNo} =filter;
    const columns = [{
      title: '用户',
      dataIndex: 'idString',
      
    }, {
      title: '反馈内容',
      dataIndex: 'feedbackContent',
      className:'purchaseFeedbackContent',
    }, {
      title: '反馈时间',
      dataIndex: 'createTimeString',
    },{
      title: '状态',
      dataIndex: 'status',
      render:(text,record) => (
        <div className="fbOperate">       
          {
            !text  ? 
            <div>
              未回复
              <Link to={`/commentFeedback/answerFeedback?idString=${record.idString}`}>
                <button>回复</button> 
              </Link>
            </div>
            : 
            <div>
              已回复
              <Link to={`/commentFeedback/detailFeedback?idString=${record.idString}`}>
                <button className="detailInfo">详情</button> 
              </Link>
            </div>
          }
        </div>
      )
    }];
   
   
    
    return (
      <div>
        <div className= "dateTime">
            <div>时间:</div>
            <div>
              <RangePicker value={[moment(createStartTime, dateFormatter), moment(createEndTime, dateFormatter)]}
                format={dateFormatter} onChange={this.onDateRangeChange.bind(this)} />
            </div>
            <div>
              {/*<RadioGroup value={moment(createEndTime, dateFormatter).diff(moment(today, dateFormatter), 'days')} onChange={this.onDateRadioChange.bind(this)} >*/}
              <RadioGroup  onChange={this.onDateRadioChange.bind(this)} defaultValue={6}>
                <RadioButton value={0}>今天</RadioButton>
                <RadioButton value={6}>近7天</RadioButton>
                <RadioButton value={29}>近30天</RadioButton>
              </RadioGroup>
            </div>
        </div>
        <div className="feedbackStatus">
          <div className="status">
            <div>状态:</div>
            <div>
              <RadioGroup value={ status } onChange={this.onStatusChange.bind(this)} defaultValue="">
                <RadioButton value={''}>全部</RadioButton>
                <RadioButton value={1}>已回复</RadioButton>
                <RadioButton value={0}>未回复</RadioButton>
              </RadioGroup>
            </div>
          </div>
          
            <div className="status">
              <div>渠道:</div>
              <div>
                <RadioGroup value={ channel } onChange={this.onRoadChange.bind(this)} defaultValue="">
                  <RadioButton value={''}>全部</RadioButton>
                  <RadioButton value={1}>IOS</RadioButton>
                  <RadioButton value={2}>Android</RadioButton>
                  <RadioButton value={3} disabled >Wechat</RadioButton>
                </RadioGroup>
              </div>
            </div>
          
        </div>

        <Table 
          columns={columns} 
          dataSource={list} 
          pagination={{
            total,
            onChange: this.onPageChange.bind(this),
            current: pageNo,
            showQuickJumper: true,
            showSizeChanger:true,
            onShowSizeChange:this.onShowSizeChange.bind(this),
            showTotal:this.onShowTotal.bind(this),
          }}  
          bordered />
      </div>
    );
  }
}

Component.defaultProps = {
  className: 'shopFeedback',
};

Component.propTypes = {
  className: React.PropTypes.string,
};

export default Component;
