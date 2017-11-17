/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { Link } from 'react-router';
import { message } from 'antd';
// import socket from '../../common/js/msgsocket';
import './assets/css/header.less';

class Component extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
    };
    // this.store = store;
  }
  onLogout() {
    const { handleLogout } = this.props;
    handleLogout();
  }

  componentDidMount() {
    const { username } = this.state;
    const name = window.localStorage.getItem('username')
    this.setState({
      username : name
     
    })
  }

  render() {
    const { className } = this.props;
    const { username } = this.state;

    return (
      <div className={className} >
        <div className={`${className}-content`}>
          <div className={`${className}-content-logo`}>
            <p>英雄联盟后台控制系统</p>
          </div>
          <div className={`${className}-content-user`}>
            <span className={`${className}-content-user-name`}>{ username }</span>
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
