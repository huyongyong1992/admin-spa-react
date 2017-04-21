/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Link } from 'react-router'
import Reflux from 'reflux';
import store from './store';
import Actions from './Actions';
import ShopDetail from './shopDetail';
import './assets/css/index.less';
import {Input , message , Select ,Table,Button} from 'antd';

const Search = Input.Search;
const Option = Select.Option;
class Component extends Reflux.Component {
	constructor(props) {
		super(props);
		this.state = {
			phone:'',
			filter:{
				shopName:'',
				sysCateId:'',
				pageNo:1,
				l1:'',
				pageSize:10,
			},
			supCates:[],
      subCates:[], 
		};
		this.store = store;
		this.onShopChange = this.onShopChange.bind(this);
		this.onSearchShop = this.onSearchShop.bind(this)
		this.onSupCatChange = this.onSupCatChange.bind(this);
		this.onSubCatChange = this.onSubCatChange.bind(this);
	}
	componentDidMount() {
		Actions.getShopsList({
			data:this.state.filter
		})
		Actions.sysCates({
      data: {
        level:2
      },
    }, 'supCates', (msg) => {
      message.error(msg.errorMsg || msg.message);
    });
	}
	// 分页
	onPageChange(value) {
    this.setState((state) => {
      const { filter } = state;
      filter.pageNo = value;
      state.filter = filter;
      return state;
    }, () => {
      Actions.getShopsList({
        data: this.state.filter,
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
      Actions.getShopsList({
        data: this.state.filter,
      });
    });
  }
  onShowTotal(total){
    return `共${total}条`
  }


	// 手机号搜索
	onSearchPhone(value) {
    const reg = /^1\d{10}$/ ;
    if(!(reg.test(value))) {
      message.error("您输入的手机号码不正确");
      return ;
    }
		Actions.getShopsList({
			data:{
				phone:value,
			}
		})
	}
	// 商铺搜索
	onSearchShop(value) {
		Actions.getShopsList({
			data:this.state.filter
		})
	}
	onShopChange(e) {
		const val = e.target.value;
		this.setState((state) => {
      const { filter } = state;
      filter.shopName = val;
      state.filter = filter;
      return state;
    });
	}
// 分类
	onSupCatChange(value) {
    console.log(value)
    this.setState((state) => {
      const { filter } = state;
      filter.l1 = value;
      filter.sysCateId = '';
      state.filter = filter;
      return state;
    }, () => {
      Actions.getShopsList({
        data: this.state.filter,
      });
      // 选中一级类目后,加载相应的二级类目
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
      filter.sysCateId = value;
      state.filter = filter;
      return state;
    }, () => {
      Actions.getShopsList({
        data: this.state.filter,
      });
    });
  }
// 关闭或开启搜索
  onSwitchSearch(shopId,canSearch) {
    Actions.modifyShopSearchStatus({
      data:{
        shopId:shopId,
        canSearch:(canSearch === 0 ? 1 : 0),
      }
    },() => {
      Actions.getShopsList({
        data:this.state.filter
      })
    })
  }
  render() {
  	const {list ,supCates,subCates,filter,total} = this.state;
  	const {l1,sysCateId,pageNo,pageSize} = filter;
  	const supOptions = supCates.map(cate => (
      <Option key={cate.v} value={cate.v}>{cate.n}</Option>
    ));
    const subOptions = subCates.map(cate => (
      <Option key={cate.v} value={cate.v}>{cate.n}</Option>
    ));
    
    const columns = [{
      title: '商铺id',
      dataIndex: 'shopIdString',
    }, {
      title: '商铺名称',
      dataIndex: 'shopName',
      className:'shopname',
    }, {
      title:'联系人姓名',
      dataIndex: 'shopLinkName',
      className:'shopLinkName'
    },{
      title: '昵称',
      dataIndex: 'nickname',
      className:'nickname',
    },{
      title: '商铺地址',
      dataIndex: 'address',
    }, {
      title: '产品数',
      dataIndex: 'productsCount',
    }, {
      title: '访客数',
      dataIndex: 'visitorsCount',
    },{
      title: '粉丝数',
      dataIndex: 'fansCount',
    },{
      title: '开通时间',
      dataIndex: 'createTimeString',
    },{
      title: '关闭搜索',
      dataIndex: 'canSearch',
      render:(text,record) =>(
        <Button className={`${text === 0 ? 'red' :'green'}`} onClick={this.onSwitchSearch.bind(this,record.shopIdString,text)}>
          {text === 0 ? '关闭中' :'开启中'}
        </Button>
      )
    },{
      title: '操作',
      dataIndex: 'shopUrl',
      className:'shopUrl',
      render: (text, record) => (
        <div>
          <Link to={`shopDetail?id=${record.shopIdString}#${Math.random()*100}`}>详情</Link><br/>
          <a href={text} target="_blank">下载二维码</a>
        </div>
      ),
    }];
    
    return (
      <div className="shopsManagement">
        <header>
        	<Search placeholder="请输入手机号码" style={{ width: 150 }} onSearch={this.onSearchPhone} maxLength="11"/>
        	<Search placeholder="请输入商铺" style={{ width: 150 }} onSearch={this.onSearchShop} onChange={this.onShopChange}/>
        	<Select placeholder="选择二级分类" style={{ width: 130 }} onChange={this.onSupCatChange}  defaultValue="">
              <Option value={''}>全部分类</Option>
              {supOptions}
            </Select>
            {/*
            <Select placeholder="选择三级分类" style={{ width: 130, margin: '0 16px 0 8px' }} onChange={this.onSubCatChange} notFoundContent="请先选择一级分类">
              <Option value={""}>全部分类</Option>
              {subOptions}
            </Select>
            */}
        </header>

        <section>
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
            bordered
          />
        </section>
      </div>
    );
  }
}

Component.defaultProps = {
};

Component.propTypes = {
};
Component.ShopDetail = ShopDetail;

export default Component;
