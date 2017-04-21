/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Reflux from 'reflux';
import Actions from './Actions';
import store from './store';
import { Input, Button, Table} from 'antd';
import Popover from '../../../components/popover';
import './assets/commercialFreeze.less';

class Component extends Reflux.Component {
	constructor(props) {
	  super(props);
	  this.state ={
	  	data:{},
	  	filterDropdownVisible:false,
	  	searchText: '',
	  	filter:{
	  		mobile:'',
        pageNo:'',
        pageSize:'',
	  	}
	  }
	  this.store = store ;
  }

  componentDidMount(){
  	Actions.getFreezeUserList();
	}
  onPageChange(value) {
    this.setState((state) => {
      const { filter } = state;
      filter.pageNo = value;
      state.filter = filter;
      return state;
    }, () => {
      Actions.getFreezeUserList({
        data: {
          pageNo:this.state.filter.pageNo
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
      Actions.getFreezeUserList({
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

  onInputChange(e) {
    this.setState({ searchText: e.target.value });
  }
  onSearch() {
    const { searchText } = this.state;
    const { data } =this.state;
    const msgs = data.msgs;
    const reg = new RegExp(searchText, 'gi');
    this.setState({
      filterDropdownVisible: false,
      msgs: msgs.map((record) => {
        const match = record.replierName.match(reg);
        if (!match) {
          return null;
        }
        return {
          ...record,
          freezeName: (
            <span>
              {record.replierName.split(reg).map((text, i) => (
                i > 0 ? [<span className="highlight">{match[0]}</span>, text] : text
              ))}
            </span>
          ),
        };
      }).filter(record => !!record),
    });
  }
  onFreezeFree(phoneNo,reactivateReason){
    const mobile = phoneNo;
    Actions.reactivateUser({
      data:{
        mobile:mobile,
        reactivateReason,
      }
    },() => {
      alert("success");
      Actions.getFreezeUserList();
    })
  }
  onFreezeSearch(){
    const { filter } = this.state;
    Actions.getFreezeUserList({
      data:this.state.filter
    });
  }
  onFreezeSearchCont(e){
    const value = e.target.value;
    this.setState((state) => {
      const { filter } = state;
      filter.mobile = value;
      state.filter = filter;
      return state;
    });
  }
  render() {
  	const columns = [{
      title: '账号',
      dataIndex: 'freezeName',
      key: 'freezeName',
      filterDropdown: (
        <div className="custom-filter-dropdown">
          <Input
            placeholder="搜索手机号"
            value={this.state.searchText}
            onChange={this.onInputChange.bind(this)}
            onPressEnter={this.onSearch.bind(this)}
          />
          <Button type="primary" onClick={this.onSearch.bind(this)}>搜索</Button>
        </div>
      ),
      filterDropdownVisible: this.state.filterDropdownVisible,
      onFilterDropdownVisibleChange: visible => this.setState({ filterDropdownVisible: visible }),
    }, {
      title: '冻结时间',
      dataIndex: 'freezeTime',
      key: 'freezeTime',
    }, {
      title: '冻结原因',
      dataIndex: 'freezeReason',
      key: 'freezeReason',
    },{
      title: '操作',
      dataIndex: 'freezeOperate',
      key: 'freezeOperate',
      render: (text,record) => (
            <Popover
              title="请填写解冻原因"
              trigger="click"
              handleConfirm={this.onFreezeFree.bind(this, record.freezeName)}
            >
              <Button className='freezeTdBtn'>{text}</Button>
            </Popover>
      )
      
    }];
    const contData = [];
    const { data ,total } = this.state;
    for (let i = 0; i < data.length; i++) {
      contData.push({
        key: i,
        freezeName: data[i].mobile,
        freezeTime: data[i].freezeTime,
        freezeReason: data[i].freezeReason,
        freezeOperate: '解冻' ,
      });
    }
    
    const { filter } = this.state;
    const { pageNo,mobile } = filter;

    return (
      <div className="freeze">
        <div className="freezeHead">
        	<Input placeholder="请输入手机号" onChange={this.onFreezeSearchCont.bind(this)}/>
        	<Button onClick={this.onFreezeSearch.bind(this)}>搜索</Button>
        </div> 

        <Table 
          columns={columns} 
          dataSource={contData} 
          pagination={{
            total,
            onChange: this.onPageChange,
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

Component.displayName = 'CommercialFreeze';

Component.defaultProps = {
};

Component.propTypes = {
};

export default Component;
