import React from 'react';
import { Link } from 'react-router';
import Reflux from 'reflux';
import {  Button ,Table ,message} from 'antd';
import store from './store';
import Actions from './Actions';
import AddGoldSupplier from './addGoldSupplier';

import './assets/css/index.less';
class Component extends Reflux.Component {
	constructor(props) {
    super(props);
    this.state = {
      filter:{
      	phone:'',
      	shopLinkMan:'',
      	pageNo:1,
      	pageSize:10,
        showPic:false,
        bigPicture:'',
      }
    };
    this.store = store ;
  }

  componentDidMount() {
  	Actions.getGoldSupper();
  }
  // 分页
  onPageChange(value) {
  	this.setState((state) => {
      const { filter } = state;
      filter.pageNo = value;
      state.filter = filter;
      return state;
    }, () => {
      Actions.getGoldSupper({
        data: {
          pageNo:this.state.filter.pageNo,
        }
      });
    });
  }
  onShowSizeChange(pageNo,pageSize) {
  	this.setState((state) => {
      const { filter } = state;
      filter.pageSize = pageSize;
      filter.pageNo = pageNo;
      state.filter = filter;
      return state;
    }, () => {
      Actions.getGoldSupper({
        data: {
          pageSize:this.state.filter.pageSize,
          pageNo:this.state.filter.pageNo,
        }
      });
    });

  }
  onShowTotal(total){
    return `共${total}条`
  }
  // 删除
  onDelete(phone) {
  	Actions.deleteGoldSupper({
  		data:{
  			phone:phone,
  		}
  	},() =>{
  		Actions.getGoldSupper({
  			data: {
          pageSize:this.state.filter.pageSize,
          pageNo:this.state.filter.pageNo,
        }
  		})
  	})
  }
  //看大图
  // onShowBigPicture(img) {
  //   this.setState({
  //     showPic:!this.state.showPic,
  //     bigPicture:img,
  //   })
  // }
  // onHideBigPic() {
  //   this.setState({
  //     showPic:false,
  //   })
  // }
  render() {
  	const columns = [{
      title: '注册手机',
      dataIndex: 'phone',
    }, {
      title: '商铺联系人',
      dataIndex: 'shopLinkMan',
    }, {
      title: '商铺电话',
      dataIndex: 'shopPhone',
    },{
      title: '店铺名称',
      dataIndex: 'shopName',
    },{
      title: '店铺头像',
      dataIndex: 'shopIcon',
      render: (text,record) =>(
      	<img src={text} />
    	)
    }, {
      title: '添加时间',
      dataIndex: 'goldTimeString',
    },{
      title: '操作',
      dataIndex: '',
      render :(text ,record) =>{
      	return (
	      	<Button onClick={this.onDelete.bind(this,record.phone)}>删除</Button>
	  		)
  		}
    }];
    const {data,total,filter,showPic ,bigPicture} = this.state;
    return (
      <div className="goldSupplier">
        <header>金牌供应商
        	<section>
	        	<Link to="addGoldSupplier">添加金牌供应商</Link>
	        </section>
        </header> 
        
	      <Table  
	        columns={columns}
	        dataSource={data}
	        pagination={{
	          total,
	          onChange: this.onPageChange.bind(this),
	          current: filter.pageNo,
	          showQuickJumper: true,
	          showSizeChanger:true,
	          onShowSizeChange:this.onShowSizeChange.bind(this),
	          showTotal:this.onShowTotal.bind(this),
	        }}
	        bordered
	      />
    	</div>
    );
  }
}

Component.defaultProps = {
};

Component.propTypes = {
};
Component.AddGoldSupplier = AddGoldSupplier;
export default Component;
