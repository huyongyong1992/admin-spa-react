/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Link } from 'react-router';
import { message } from 'antd';
import socket from '../../common/js/msgsocket';
import './assets/css/header.less';

class Component extends React.Component {
  onLogout() {
    const { handleLogout } = this.props;

    handleLogout();
  }

  componentDidMount() {
    socket.addEventListener('message', (e) => {
      console.log('websocket onmessage');
      console.log(e);
      try {
        const msg = JSON.parse(e.data);

        switch(msg.type) {
          case 0:
            message.info(<a href="/admin/commercialReview/check" >您有新的待审核求购信息，快点这里立即审核</a>, 5);
            break;
          case 1:
            message.info(<a href="/admin/identityReview/personal" >您有新的待审核个人认证信息，快点这里立即审核</a>, 5);
            break;
          case 3:
            message.info(<a href="/admin/identityReview/enterprise" >您有新的待审核企业认证信息，快点这里立即审核</a>, 5);
            break;
        }
      } catch(error) {
        console.error(error);
      }
    });
  }

  render() {
    const { avatar, username, className } = this.props;

    return (
      <div className={className} >
        <div className={`${className}-content`}>
          <div className={`${className}-content-logo`}>
            <p>微蚁科技</p>
            <p>后台控制系统</p>
          </div>
          <div className={`${className}-content-user`}>
            <img className={`${className}-content-user-avatar`} src={avatar} alt="用户头像" />
            <span className={`${className}-content-user-name`}>{username}</span>
            <button className={`${className}-content-user-logout`} onClick={this.onLogout.bind(this)}>退出</button>
          </div>
        </div>
      </div>
    );
  }
}

Component.displayName = 'Header';

Component.defaultProps = {
  avatar: '',
  username: '',
  className: 'header',
  handleLogout: () => {},
};

Component.propTypes = {
  avatar: React.PropTypes.string,
  username: React.PropTypes.string,
  className: React.PropTypes.string,
  handleLogout: React.PropTypes.func,
};

export default Component;
