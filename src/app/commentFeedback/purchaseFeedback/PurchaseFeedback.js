/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Reflux from 'reflux';
import store from './store';
import Actions from './Actions';
import { Link } from 'react-router';
import { DatePicker,Radio,Button,Table } from 'antd';
import AnswerFeedback from '../answerFeedback';
import DetailFeedback from '../detailFeedback';
import moment from 'moment';
import './assets/css/purchaseFeedback.less';

const { RangePicker } = DatePicker;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const dateFormatter = 'YYYY/MM/DD';
const today = moment().format(dateFormatter);

class Component extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {
      data : [],
      filter:{
        utype: '1',
        
        channel: '',
        status: '',
        createStartTime: moment(today, dateFormatter).subtract(6, 'd').format(dateFormatter),
        createEndTime: today,
        pageNo:'1',
        PageSize:'10',
      },
      
    }
    this.store = store;
  }
  componentDidMount(){
    const { filter } = this.state;

    Actions.getBgFeedbackList({
      data:filter
    })
  }
  onPageChange(pageNo) {
    this.setState((state) => {
      const { filter } = state;
      filter.pageNo = pageNo;
      state.filter = filter;
      return state;
    }, () => {
      Actions.getBgFeedbackList({
        data: {
          pageNo:this.state.filter.pageNo,
        },
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
        data: {
          pageNo:this.state.filter,
        }
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
    if(value === -1) {
      value = '';
    }

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
    const { data ,total } = this.state;
    const columns = [{
      title: '用户',
      dataIndex: 'unionid',
      
    }, {
      title: '反馈内容',
      dataIndex: 'feedbackContent',
      className:'purchaseFeedbackContent'
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
              <Link to={`/commentFeedback/answerFeedback?unionid=${record.unionid}`}>
                <Button>回复</Button>
              </Link>
              
            </div>
            : 
            <div>
              已回复
              <Link to={`/commentFeedback/detailFeedback?unionid=${record.unionid}`}>
                <button className="detailInfo">详情</button> 
              </Link>
            </div>
          }
        </div>
      )
    }];
   
    const { filter } = this.state;
    const { channel,status,createStartTime,createEndTime,pageNo} = filter;
    return (
      <div>
        <div className= "dateTime">
          <div>时间:</div>
          <div>
            <RangePicker value={[moment(createStartTime, dateFormatter), moment(createEndTime, dateFormatter)]}
              format={dateFormatter} onChange={this.onDateRangeChange.bind(this)} />
          </div>
          <div>
            {/* <RadioGroup value={moment(createEndTime, dateFormatter).diff(moment(today, dateFormatter), 'days')} onChange={this.onDateRadioChange.bind(this)} defaultValue="29"> */}
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
                <RadioButton value={1} disabled>IOS</RadioButton>
                <RadioButton value={2} disabled>Android</RadioButton>
                <RadioButton value={3}>Wechat</RadioButton>
              </RadioGroup>
            </div>
          </div>
       
        </div>

        <Table 
          columns={columns} 
          dataSource={data} 
          pagination={{
            total,
            onChange: this.onPageChange.bind(this),
            current: pageNo,
            showQuickJumper: true,
            showSizeChanger:true,
            onShowSizeChange:this.onShowSizeChange.bind(this),
            showTotal:this.onShowTotal.bind(this),
          }} 
          bordered/>
      </div>
    );
  }
}

Component.defaultProps = {
  className: 'purchaseFeedback',
};

Component.propTypes = {
  className: React.PropTypes.string,
};
Component.Answer = AnswerFeedback;
Component.Detail = DetailFeedback;

export default Component;
