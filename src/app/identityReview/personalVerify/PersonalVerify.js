/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable arrow-body-style */
/* eslint-disable class-methods-use-this */
import React from 'react';
import Reflux from 'reflux';
import { Table, Button ,message,Select } from 'antd';
import store from './store';
import Actions from './Actions';
import Popover from '../../../components/popover';
import './assets/css/personalVerify.less';

class Component extends Reflux.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      total: '',
      pageNo:'1',
      pageSize:'10',
      isAuthPerson: 1,
      status:0,
      showPic:false,
      bigPicture:'',
    };
    this.store = store;
    this.onPageChange = this.onPageChange.bind(this);
  }

  componentDidMount() {
    Actions.getReviewAuthList({
      data: {
        isAuthPerson: 1,
      },
    });
  }
  componentDidMount() {
    Actions.getReviewAuthList({
      data:{
        status:this.state.status,
        pageNo:1,
        pageSize:10,
        isAuthPerson:1,
      }
    })
  }
// 分页
  onPageChange(pageNo) {
    const { pageSize ,isAuthPerson } = this.state;
    this.setState({
      pageNo:pageNo,
    }, () => {
      Actions.getReviewAuthList({
        data: {
          isAuthPerson:1,
          pageNo:pageNo,
          pageSize:this.state.pageSize,
          status:this.state.status,
        },
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
          isAuthPerson: 1,
          pageSize:pageSize,
          pageNo:pageNo,
          status:this.state.status,
        }
      }, (msg) => {
        message.error(msg.errorMsg || msg.message);
      });
    });
  }
  onShowTotal(total){
    return `共${total}条`
  }

  onStatusChange(val) {
    this.setState({
      status:val,
    }, () => {
      Actions.getReviewAuthList({
        data: {
          isAuthPerson:1,
          status:this.state.status,
          pageNo:this.state.pageNo,
          pageSize:this.state.pageSize,
        }
      }, (msg) => {
        message.error(msg.errorMsg || msg.message);
      });
    });
  }
  onReview(idString, mobile, reviewStatus) {
    Actions.reviewAuth({
      data:{
        idString:idString,
        phone:mobile,
        isAuthPerson: 1,
        reviewStatus:reviewStatus,
      }
      
    },() => {
      if(reviewStatus=="1"){
        message.success('通过审核成功');
      }else{
        message.success('驳回成功');
      }
      
      Actions.getReviewAuthList({
        data: {
          status:this.state.status,
          isAuthPerson: 1,
          pageNo: this.state.pageNo,
          pageSize:this.state.pageSize,
        },
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
    const { data, pageNo, total,status,showPic ,bigPicture  } = this.state;
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
      title: '图片',
      dataIndex: '',
      render: (text, record) => {
        const imgs = [record.idPic2, record.idPic3];
        return (
          <div className={`${className}-table-pictures`}>
            {
              imgs.map((img, i) => <img alt="" key={i} className={`${className}-table-pictures-img`} src={img} onClick={this.onShowBigPicture.bind(this,img)}/>)
            }
          </div>
        );
      },
    }, {
      title: '提交时间',
      dataIndex: 'authTimeString',
    }, {
      title: '操作',
      dataIndex: 'status',
      render: (text, record) => {
        const {status} = this.state;
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
        <p className={`${className}-title`}>个人认证</p>
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
  className: 'personalVerify',
};

Component.propTypes = {
  className: React.PropTypes.string,
};

export default Component;
