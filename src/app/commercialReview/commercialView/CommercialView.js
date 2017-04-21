/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Reflux from 'reflux';
import { Link } from 'react-router';
import { message, Input, Button, Table, DatePicker, Select, Radio } from 'antd';
import moment from 'moment';
import Actions from './Actions';
import store from './store';
import Popover from '../../../components/popover';
import './assets/css/commercialView.less';

const Search = Input.Search;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const RangePicker = DatePicker.RangePicker;

const dateFormatter = 'YYYY/MM/DD';
const today = moment().format(dateFormatter);

class Component extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      list: [],
      supCates: [],
      subCates: [],
      filter: {
        key: '',
        from: moment(today, dateFormatter).subtract(6, 'd').format(dateFormatter),
        to: today,
        l1: '',
        l2: '',
        st: '',
        at: '',
        cs: 1,
        lte:'',
        pn: 1,
        ps:10,
        lte:'',
      },
      showPic:false ,
      bigPicture:'',
    };
    this.onSearch = this.onSearch.bind(this);
    this.onDateRangeChange = this.onDateRangeChange.bind(this);
    this.onDateRadioChange = this.onDateRadioChange.bind(this);
    this.onSupCatChange = this.onSupCatChange.bind(this);
    this.onSubCatChange = this.onSubCatChange.bind(this);
    this.onStatusChange = this.onStatusChange.bind(this);
    this.onUserChange = this.onUserChange.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.store = store;
  }
// 分页
  onPageChange(value) {
    this.setState((state) => {
      const { filter } = state;
      filter.pn = value;
      state.filter = filter;
      return state;
    }, () => {
      Actions.listSubjects({
        data: this.state.filter,
      }, (msg) => {
        message.error(msg.errorMsg || msg.message);
      });
    });
  }
  onShowSizeChange(pageNo,pageSize){
    this.setState((state) => {
      const { filter } = state;
      filter.ps = pageSize;
      filter.pn = pageNo;
      state.filter = filter;
      return state;
    }, () => {
      Actions.listSubjects({
        data: this.state.filter,
      });
    });
  }
  onShowTotal(total){
    return `共${total}条`
  }
// 用户类型
  onUserChange(value) {
    this.setState((state) => {
      const { filter } = state;
      filter.at = value;
      state.filter = filter;

      return state;
    }, () => {
      Actions.listSubjects({
        data: this.state.filter,
      }, (msg) => {
        message.error(msg.errorMsg || msg.message);
      });
    });
  }
// 关键词搜索
  onSearch(key) {
    // const reg = /^1\d{10}$/ ;
    // if(!(reg.test(key))) {
    //   message.error("您输入的手机号码不正确");
    //   return ;
    // }
    this.setState((state) => {
      const { filter } = state;
      filter.key = key;
      state.filter = filter;
      return state;
    }, () => {
      Actions.listSubjects({
        data: this.state.filter,
      }, (msg) => {
        message.error(msg.errorMsg || msg.message);
      });
    });
  }
  onKeyChange(key) {
    const keyWord = key.target.value;
    this.setState((state) => {
      const { filter } = state;
      filter.key = keyWord;
      state.filter = filter;
      return state;
    })
  }

  onReject(id, uid,r) {
    Actions.checkSubject({
      data: {     
        id,
        t: 1,
        r,
        bid:uid,
      },
    }, (msg) => {
      message.error(msg.errorMsg || msg.message);
    }, () => {
      message.success('驳回求购成功');
      Actions.listSubjects({
        data: this.state.filter,
      }, (msg) => {
        message.error(msg.errorMsg || msg.message);
      });
    });
  }

  onStatusChange(e) {
    const value = e.target.value;
    this.setState((state) => {
      const { filter } = state;
      filter.st = value;
      state.filter = filter;
      return state;
    }, () => {
      Actions.listSubjects({
        data: this.state.filter,
      }, (msg) => {
        message.error(msg.errorMsg || msg.message);
      });
    });
  }

  onSupCatChange(value) {
    this.setState((state) => {
      const { filter } = state;
      filter.l1 = value;
      filter.l2 = '';
      state.filter = filter;
      return state;
    }, () => {
      Actions.listSubjects({
        data: this.state.filter,
      }, (msg) => {
        message.error(msg.errorMsg || msg.message);
      });
      // 选中一级类目后,筛选出改类目下产品并加载二级类目
      /*
      Actions.sysCates({
        data:{
          level:3,
          id:this.state.filter.l1,
        }
      },'subCates',(e) => {
        message.error(e.errorMsg || e.message);
      })
      */
    });
  }

  onSubCatChange(value) {
    this.setState((state) => {
      const { filter } = state;
      filter.l2 = value;
      state.filter = filter;
      return state;
    }, () => {
      Actions.listSubjects({
        data: this.state.filter,
      }, (msg) => {
        message.error(msg.errorMsg || msg.message);
      });
    });
  }

  onDateRangeChange(dates, dateStrings) {
    this.setState((state) => {
      const { filter } = state;
      filter.from = dateStrings[0];
      filter.to = dateStrings[1];
      state.filter = filter;
      return state;
    }, () => {
      Actions.listSubjects({
        data: this.state.filter,
      }, (msg) => {
        message.error(msg.errorMsg || msg.message);
      });
    });
  }

  onDateRadioChange(e) {
    const value = e.target.value;
    this.setState((state) => {
      const { filter } = state;
      filter.to = today;
      filter.from = moment(today, dateFormatter).subtract(value, 'd').format(dateFormatter);
      state.filter = filter;
      return state;
    }, () => {
      Actions.listSubjects({
        data: this.state.filter,
      }, (msg) => {
        message.error(msg.errorMsg || msg.message);
      });
    });
  }

  componentDidMount() {
    const { filter } = this.state;

    Actions.listSubjects({
      data: filter,
    }, (msg) => {
      message.error(msg.errorMsg || msg.message);
    });
    Actions.sysCates({
      data: {
        level:2
      },
    }, 'supCates', (msg) => {
      message.error(msg.errorMsg || msg.message);
    });
  }
  //看大图
  onShowBigPicture(img) {
    this.setState({
      showPic:!this.state.showPic,
      bigPicture:img,
    })
  }
  onHideBigPic() {
    this.setState({
      showPic:false,
    })
  }
  onReplyNumber(value){
    // const value = e.target.value;
    this.setState((state) => {
      const { filter } = state;
      filter.lte = value;
      state.filter = filter;
      return state;
    }, () => {
      Actions.listSubjects({
        data: this.state.filter,
      });
    });
  }
  render() {
    const { className } = this.props;
    const { supCates, subCates, list, total, filter,showPic ,bigPicture } = this.state;
    const { from, to, pn, st ,l1,l2,lte} = filter;
    const columns = [{
      title: '账号',
      key: 'mb',
      dataIndex: 'mb',
      className:'commercialUser',
      render:(text,record) => {
        return(
          <div>
            {text}
            <br />
            <Link to={`/commercialReview/detail?sid=${record.id}`}>详情</Link>
          </div>
        )
      }
    }, {
      title: '分类',
      dataIndex: 'ct',
      className:'commercialVarify',
    }, {
      key:'ds',
      title: '标题/描述',
      dataIndex: 'ds',
      className:'commercialDetail',
      render:(text,record) =>{
        return(
          <div>
            <strong>{record.pn}</strong><br />
            {text}
          </div>
        );  
      }
    },{
      title: '图片',
      dataIndex: 'ps',
      className:'commercialPic',
      render: imgs => (
        <div className={`${className}-table-pictures`}>
          {
            imgs.map((img, i) => <img alt="" key={i} className={`${className}-table-pictures-img`} src={img.p} onClick={this.onShowBigPicture.bind(this,img.p)}/>)
          }
        </div>
      )
    },{
      title: '求购数量',
      dataIndex: 'no',
    }, {
      title: '期望交货日期',
      dataIndex: 'ed',
    }, {
      title: '发布时间',
      dataIndex: 'ts',
      className:'commercialTime',
    },{
      title: '实际推送数',
      dataIndex: 'pt',
      render:(text,record) => (
        <div>
          <div>{text}</div>
          <Link to={`/commercialReview/pushDetail?id=${record.id}`}>详情</Link>
        </div>
      )
    },{
      title: '收到回复数',
      dataIndex: 'rt',
      render:(text) => (
        <span className={`${text === 0 ? 'replyNumber' : ''}`}>{text}</span>
      )
    },{
      title: '状态',
      dataIndex: 'st',
      render: (text, record) => (
        <div className={`${className}-table-reject`}>
          <span className={`${className}-table-reject-text`}>{text===1 ? '求购中' : '已完成'}</span>
          {
            text === 1 ?
              (
              <Popover
                title="请填写驳回原因"
                trigger="click"
                handleConfirm={this.onReject.bind(this, record.id,record.uid)}
              >
                <Button size="small" className={`${className}-table-reject-button`}>驳回</Button>
              </Popover>
              ) : null
          }
        </div>
      ),
    }];
    const supOptions = supCates.map(cate => (
      <Option key={cate.v} value={cate.v}>{cate.n}</Option>
    ));
    const subOptions = subCates.map(cate => (
      <Option key={cate.v} value={cate.v}>{cate.n}</Option>
    ));

    return (
      <div className={className}>
        <div className={`${className}-filter`}>
          <div className={`${className}-filter-title`}>
          <div className={`${className}-filter-search`}>
            <label className={`${className}-filter-search-label`} htmlFor="search">搜索：</label>
            <Search style={{ width: 170, marginRight: 16 }} placeholder="请输入搜索关键词" onSearch={this.onSearch} onChange={this.onKeyChange.bind(this)} maxLength="30"/>
          </div>
          <div className={`${className}-filter-number`}>
            <span>收到的回复数量:</span>
            <span>≤</span>
            <Search onSearch={this.onReplyNumber.bind(this)} placeholder="请输入最大求购数量"/>
          </div>
          </div>
        {/*value={moment(to, dateFormatter).diff(moment(today, dateFormatter), 'days')}*/}
          <div className={`${className}-filter-time`}>
            <label className={`${className}-filter-search-label`} htmlFor="time">时间：</label>
            <RangePicker
              style={{ width: 226, marginRight: 8 }}
              value={[moment(from, dateFormatter), moment(to, dateFormatter)]}
              format={dateFormatter}
              allowClear={false}
              onChange={this.onDateRangeChange}
            />

            <RadioGroup
              onChange={this.onDateRadioChange} defaultValue={6} 
            >
              <RadioButton value={0}>今天</RadioButton>
              <RadioButton value={6}>近7天</RadioButton>
              <RadioButton value={29}>近30天</RadioButton>
            </RadioGroup>
          </div>
          <div className={`${className}-filter-category`}>
            <label className={`${className}-filter-category-label`} htmlFor="category">分类：</label>
            <Select placeholder="选择一级分类" style={{ width: 130 }} onChange={this.onSupCatChange} value={l1} defaultValue="">
              <Option value={''}>全部分类</Option>
              {supOptions}
            </Select>
            {/*
            <Select placeholder="选择二级分类" style={{ width: 130, margin: '0 16px 0 8px' }} onChange={this.onSubCatChange} notFoundContent="请先选择一级分类" value={l2} defaultValue="">
              <Option value={''}>全部分类</Option>
              {subOptions}
            </Select>
            */}
          </div>
          <div className={`${className}-filter-status`}>
            <label className={`${className}-filter-status-label`} htmlFor="status">状态：</label>
            <RadioGroup value={st} onChange={this.onStatusChange} defaultValue="">
              <RadioButton value={''}>全部</RadioButton>
              <RadioButton value={1}>进行中</RadioButton>
              <RadioButton value={2}>已完成</RadioButton>
            </RadioGroup>
          </div>
          <div className={`${className}-filter-user`}>
            <label className={`${className}-filter-user-label`} htmlFor="user">选择用户：</label>
            <Select defaultValue="-1" style={{ width: 110 }} onChange={this.onUserChange}>
              <Option value="-1">全部用户</Option>
              <Option value="0">未认证用户</Option>
              <Option value="3">特邀采购员</Option>
              <Option value="1">实名认证用户</Option>
              <Option value="2">企业认证用户</Option>
            </Select>
          </div>
          
        </div>
        <div className={`${className}-table`}>
          <Table
            columns={columns}
            dataSource={list}
            pagination={{
              total,
              onChange: this.onPageChange,
              current: pn,
              showQuickJumper: true,
              showSizeChanger:true,
              onShowSizeChange:this.onShowSizeChange.bind(this),
              showTotal:this.onShowTotal.bind(this),
            }}
            bordered
          />
        </div>
        <div className={`showBigPic ${showPic ? 'showActive' : null}`} onClick={this.onHideBigPic.bind(this)}><img src={bigPicture} className="bigPicture"/></div>
      </div>
    );
  }
}

Component.displayName = 'CommercialView';

Component.defaultProps = {
  className: 'commercialView',
};

Component.propTypes = {
  className: React.PropTypes.string,
};

export default Component;
