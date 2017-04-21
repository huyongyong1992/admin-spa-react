/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable class-methods-use-this */
import React from 'react';
import Reflux from 'reflux';
import { Link } from 'react-router';
import { Table, Button ,Select,Input} from 'antd';
import store from './store';
import Actions from './Actions';
import './assets/css/recommendModel.less';
import RecommendForm from './recommendForm';
import {onConvertDate} from '../../common/js/date.js';
import Popover from '../../components/popover';
const Option = Select.Option;
class Component extends Reflux.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      total: 0,
      filter:{
        orderFactor:0,
        status:0,
        pageNo: 1,
        pageSize:10,
      },
      changed:[],
      sort:'',
    };
    this.store = store;
    this.onPageChange = this.onPageChange.bind(this);
  }

  componentDidMount() {
    Actions.getShopRecmdstAdmin({
      data:this.state.filter
    });
  }
//分页
  onPageChange(pageNo) {
    this.setState((state) => {
      const { filter } = state;
      filter.pageNo = pageNo;
      state.filter = filter;
      return state;
    }, () => {
      Actions.getShopRecmdstAdmin({
        data: this.state.filter,
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
      Actions.getShopRecmdstAdmin({
        data: this.state.filter,
      });
    });
  }
  onShowTotal(total) {
    return `共${total}条`
  }
  // 上架/下架
  onPutaway(id,status) {
    Actions.modifyRecmdStatusAdmin({
      data:{
        id:id,
        state:status === 0 ? 1 : 0,
      }
    },() =>{//重新渲染
      Actions.getShopRecmdstAdmin({
        data: this.state.filter,
      });
    })
  }
  //状态切换
  onModelStatusChange(value) {
    this.setState((state) => {
      const { filter } = state;
      filter.status = value;
      state.filter = filter;
      return state;
    }, () => {
      Actions.getShopRecmdstAdmin({
        data: this.state.filter,
      });
    });
  }
  //排序类型切换
  onOrderChange(value) {
    this.setState((state) => {
      const { filter } = state;
      filter.orderFactor = value;
      state.filter = filter;
      return state;
    }, () => {
      Actions.getShopRecmdstAdmin({
        data: this.state.filter,
      });
    });
  }
  //修改排序权重
  onPushOrder(id,e) {
    const {changed} = this.state;
    const value = e.target.value;
    changed.push({id:id,value:value})
     console.log(changed)
  }
  //提交修改排序权重
  onSaveOrder(id,text) {
    const sort = this.refs.sortNum;
    Actions.modifyRecmdOrderAdmin({
      data:{
        id:id,
        sort:text,
      }
    },() => {//发送成功后重新渲染
      Actions.getShopRecmdstAdmin({
        data: this.state.filter,
      });
    })
  }
  render() {
    const { className } = this.props;
    const { data, total, filter } = this.state;
    const { pageNo ,pageSize ,sort ,orderFactor } = filter;
    const columns = [{
      title: 'id',
      dataIndex: 'id',
      className:'id',
    }, {
      title: '标题',
      dataIndex: 'title',
      className:'title',
    }, {
      title: '描述',
      dataIndex: 'description',
      className:'description'
    }, {
      title: '店铺',
      dataIndex: 'shops',
      className:'shops',
    },{
      title: '时间',
      dataIndex: 'createTime',
      className:'time',
      render:(text,record) =>(
        <div>{onConvertDate(text)}</div>
      )
    },{
      title: '排序',
      dataIndex: 'sort',
      className:'sort',
      render: (text, record) => (
        <div className="order">
          <div>{text}</div>
          <Popover
            title="请输入数字"
            trigger="click"
            defaultValue = {{text}}
            handleConfirm={this.onSaveOrder.bind(this,record.id)}
          >
            <Button>编辑</Button>
          </Popover>
          
        </div>
      )
    },{
      title: '操作',
      dataIndex: 'status',
      render: (text, record) => {
        return (
          <div>
            <Link to={`/recommendModel/recommendForm?id=${record.id}`}>
              <Button>编辑</Button>
            </Link>
            <Button onClick={this.onPutaway.bind(this,record.id,text)} className={text === 0 ? '' : 'pushawayActive'}>
              {text === 0 ? '下架' : '上架'}
            </Button>  
          </div>
        );
      },
    }];
  
    return (
      <div className="model">
        <div className="modelHead">
          <div className="modelHeadLeft">
            <div className="modelSelect">
              <span>专题状态:</span>
              <Select defaultValue="0" style={{ width: 100 }} onChange={this.onModelStatusChange.bind(this)}>
                <Option value="">全部状态</Option>
                <Option value="0">上架中</Option>
                <Option value="1">已下架</Option>
                
              </Select>
            </div>
            <div className="modelSelect">
              <span>排序方式:</span>
              <Select defaultValue="0" style={{ width: 150 }} onChange={this.onOrderChange.bind(this)}>
                <Option value="0">按时间排序</Option>
                <Option value="1">按排序数字排序</Option>  
              </Select>
            </div>
          </div>
          <Link to="recommendModel/recommendForm"><Button>添加专题</Button></Link>
        </div>
        
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
  className: 'recommendModel',
};

Component.propTypes = {
  className: React.PropTypes.string,
};

Component.RecommendForm = RecommendForm;


export default Component;
