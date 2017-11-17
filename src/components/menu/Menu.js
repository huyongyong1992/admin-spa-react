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
          <SubMenu key="commercialReview" title="好友管理">
            <Menu.Item key="commercialCheck">
              <Link to="/commercialReview/check">
                微信好友
              </Link>
            </Menu.Item>
            <Menu.Item key="commercialView">
              <Link to="/commercialReview/view">
                QQ好友
              </Link>
            </Menu.Item>
            <Menu.Item key="commercialSetting">
              <Link to="/commercialReview/setting">
                其他渠道好友
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
              邮件管理
            </Link>
          </Menu.Item>
          {/*
          <Menu.Item key="goodsManagement">
            <Link to="/goodsManagement">
              商品管理
            </Link>
          </Menu.Item>
        */}
          <SubMenu key="identityReview" title="身份审核">
            <Menu.Item key="personalVerify">
              <Link to="/identityReview/personal">
                个人认证
              </Link>
            </Menu.Item>
            <Menu.Item key="enterpriseVerify">
              <Link to="/identityReview/enterprise">
                好友认证
              </Link>
            </Menu.Item>
            <Menu.Item key="buyerVerify">
              <Link to="/identityReview/buyer">
                召唤师认证
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="commentFeedback" title="好友评价">
            <Menu.Item key="purchaseFeedback">
              <Link to="/commentFeedback/purchaseFeedback">
                微信好友评价
              </Link>
            </Menu.Item>
            <Menu.Item key="sellerFeedback">
              <Link to="/commentFeedback/sellerFeedback">
                QQ好友评价
              </Link>
            </Menu.Item>
            <Menu.Item key="purchaseEvaluate">
              <Link to="/commentFeedback/purchaseEvaluate">
                微博好友评价
              </Link>
            </Menu.Item>
            <Menu.Item key="relativeSetting">
              <Link to="/commentFeedback/relativeSetting">
                其他好友评价
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
              骨灰级玩家
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
