/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Link } from 'react-router';
import { Menu } from 'antd';
import './assets/css/menu.less';

const SubMenu = Menu.SubMenu;

class Component extends React.Component {
  onMenuClick(e) {
    const { handleClick } = this.props;

    handleClick(e.key);
  }

  render() {
    const { className, selectedKeys } = this.props;
    return (
      <div className={className} >
        <Menu onClick={this.onMenuClick.bind(this)}
          selectedKeys={[selectedKeys]}
          mode="inline"
        >
          <Menu.Item key="home">
            <Link to="/home">
              首页
            </Link>
          </Menu.Item>
          <SubMenu key="commercialReview" title="商机审核管理">
            <Menu.Item key="commercialCheck">
              <Link to="/commercialReview/check">
                商机审核
              </Link>
            </Menu.Item>
            <Menu.Item key="commercialView">
              <Link to="/commercialReview/view">
                商机查看
              </Link>
            </Menu.Item>
            <Menu.Item key="commercialSetting">
              <Link to="/commercialReview/setting">
                商机设置
              </Link>
            </Menu.Item>
            {/*
            <Menu.Item key="commercialFreeze">
              <Link to="/commercialReview/freeze">
                冻结账号
              </Link>
            </Menu.Item>
          */}
          </SubMenu>
          {/*<Menu.Item key="categorySetting">
            <Link to="/categorySetting">
              分类设置
            </Link>
          </Menu.Item>
        */}
          <Menu.Item key="messageManagement">
            <Link to="/messageManagement">
              消息管理
            </Link>
          </Menu.Item>
          <Menu.Item key="shopsManagement">
            <Link to="/shopsManagement">
              商铺管理
            </Link>
          </Menu.Item>
          {/*
          <Menu.Item key="goodsManagement">
            <Link to="/goodsManagement">
              商品管理
            </Link>
          </Menu.Item>
        */}
          <SubMenu key="identityReview" title="身份审核认证">
            <Menu.Item key="personalVerify">
              <Link to="/identityReview/personal">
                个人认证
              </Link>
            </Menu.Item>
            <Menu.Item key="enterpriseVerify">
              <Link to="/identityReview/enterprise">
                企业认证
              </Link>
            </Menu.Item>
            <Menu.Item key="buyerVerify">
              <Link to="/identityReview/buyer">
                特邀采购员
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="commentFeedback" title="评论反馈">
            <Menu.Item key="purchaseFeedback">
              <Link to="/commentFeedback/purchaseFeedback">
                采购端反馈
              </Link>
            </Menu.Item>
            <Menu.Item key="sellerFeedback">
              <Link to="/commentFeedback/sellerFeedback">
                商户端反馈
              </Link>
            </Menu.Item>
            <Menu.Item key="purchaseEvaluate">
              <Link to="/commentFeedback/purchaseEvaluate">
                求购评价
              </Link>
            </Menu.Item>
            <Menu.Item key="relativeSetting">
              <Link to="/commentFeedback/relativeSetting">
                相关设置
              </Link>
            </Menu.Item>
          </SubMenu>
          {/*
          <Menu.Item key="sensitiveWords">
            <Link to="/sensitiveWords">
              敏感词设置
            </Link>
          </Menu.Item>
        */}
          <Menu.Item key="crimeCase">
            <Link to="/crimeCase">
              诈骗案例
            </Link>
          </Menu.Item>
          
          <Menu.Item key="recommendModel">
            <Link to="/recommendModel">
              推荐专题
            </Link>
          </Menu.Item>
          
          <Menu.Item key="goldSupplier">
            <Link to="/goldSupplier">
              金牌供应商
            </Link>
          </Menu.Item>
          <Menu.Item key="qrCode">
            <Link to="/qrCode">
              公众号二维码
            </Link>
          </Menu.Item>
          <Menu.Item key="test">
            <Link to="/test">
              开发测试
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

Component.displayName = 'Menu';

Component.defaultProps = {
  className: 'menu',
  selectedKeys: 'home',
  handleClick: () => {},
};

Component.propTypes = {
  className: React.PropTypes.string,
  selectedKeys: React.PropTypes.string,
  handleClick: React.PropTypes.func,
};

export default Component;
