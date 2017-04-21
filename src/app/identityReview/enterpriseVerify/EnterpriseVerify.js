/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable class-methods-use-this */
import React from 'react';
import Reflux from 'reflux';
import { Table, Button,Select,message } from 'antd';
import store from './store';
import Actions from './Actions';
import './assets/css/enterpriseVerify.less';
import Popover from '../../../components/popover';
class Component extends Reflux.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      total: 0,
      pageNo: 1,
      pageSize:10,
      isAuthCompany:'1',
      status:'0',
      reviewStatus:'',
      showPic:false,
      bigPicture:'',
    };
    this.store = store;
    this.onPageChange = this.onPageChange.bind(this);
  }
// 分页
  onPageChange(pageNo) {
    const {isAuthCompany,pageSize} = this.state;
    this.setState({
      pageNo:pageNo,
    }, () => {
      Actions.getReviewAuthList({
        data:{
          isAuthCompany,
          pageNo,
          pageSize:pageSize,
          status:this.state.status,
        }
      });
    });
  }
  onShowSizeChange(pageNo,pageSize){
    this.setState({
      pageNo:pageNo,
      pageSize:pageSize,
    }, () => {
      Actions.getReviewAuthList({
        data: {
          isAuthCompany: 1,
          pageSize:pageSize,
          pageNo:pageNo,
          status:this.state.status,
        }
      });
    });
  }
  onShowTotal(total){
    return `共${total}条`
  }
 
  componentDidMount() {
    Actions.getReviewAuthList({
      data:{
        status:this.state.status,
        pageNo:1,
        pageSize:10,
        isAuthCompany:'1',
      }
    });
  }
  onStatusChange(val) {
    const { status } = this.state;
    const value = val;
    this.setState({
      status:value,
    }, () => {
      Actions.getReviewAuthList({
        data: {
          status:this.state.status,
          isAuthCompany:1,
          pageNo:this.state.pageNo,
          pageSize:this.state.pageSize,
        }
      });
    });
  }
  onReview(idString, mobile, reviewStatus) {
    Actions.reviewAuth({
      data:{
        idString:idString,
        phone:mobile,
        isAuthCompany: 1,
        reviewStatus:reviewStatus,
      }
    },() => {
      // if(reviewStatus=='1'){
      //   message.success('通过审核成功');
      // }else{
      //   message.success('驳回成功');
      // } 
      Actions.getReviewAuthList({
        data: {
          status:this.state.status,
          isAuthCompany: 1,
          pageNo: this.state.pageNo,
          pageSize:this.state.pageSize,
        }
      });
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
  render() {
    const { className } = this.props;
    const { data, pageNo, total ,status ,showPic ,bigPicture } = this.state;
    const columns = [{
      title: '账号id',
      dataIndex: 'idString',
    }, {
      title: '姓名',
      dataIndex: 'usrName',
    }, {
      title: '身份证',
      dataIndex: 'idNo',
    }, {
      title: '手机号',
      dataIndex: 'mobile',
    }, {
      title: '公司名称',
      dataIndex: 'companyName',
    }, {
      title: '个人名片',
      dataIndex: 'busiCardUrl',
      className:'elecCard',
      render: (text,record) => (
        <div>
          <img alt="" className={`${className}-table-img`} src={text} onClick={this.onShowBigPicture.bind(this,text)}/>
          <img alt="" className={`${className}-table-img`} src={record.idPic2} onClick={this.onShowBigPicture.bind(this,record.idPic2)}/>
          <img alt="" className={`${className}-table-img`} src={record.idPic3} onClick={this.onShowBigPicture.bind(this,record.idPic3)}/>
        </div>
      ),
    }, {
      title: '提交时间',
      dataIndex: 'authTimeString',
    }, {
      title: '操作',
      dataIndex: '',
      className:'operate',
      render: (text, record) => {
        const { status } = this.state;
        return (
          status == "0" ?
          <div>   
            <Popover
                title="请填写驳回原因"
                trigger="click"
                handleConfirm={this.onReview.bind(this, record.idString, record.mobile, '2')}
              >
                <Button>驳回</Button> 
              </Popover>        
                       
            <Button onClick={this.onReview.bind(this, record.idString, record.mobile, '1')}>审核通过</Button>
          </div>
          :null
        );
      },
    }];

    return (
      <div className={className}>
        <p className={`${className}-title`}>企业认证</p>
        <Select size="large" defaultValue="0" style={{ width: 150 }} onChange={this.onStatusChange.bind(this)}>
          <Option value="0">待审核</Option>
          <Option value="1">已通过</Option>
          <Option value="2">已驳回</Option> 
        </Select>
        <div className={`${className}-table`}>
          <Table
            columns={columns}
            dataSource={data}
            locale={{emptyText: '暂无审核信息'}}
            pagination={{
              total,
              onChange: this.onPageChange,
              current: pageNo,
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

Component.defaultProps = {
  className: 'enterpriseVerify',
};

Component.propTypes = {
  className: React.PropTypes.string,
};

export default Component;
