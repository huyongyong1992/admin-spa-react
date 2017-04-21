/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Check from './commercialCheck';
import Freeze from './commercialFreeze';
import Setting from './commercialSetting';
import View from './commercialView';
import Detail from './commercialViewDetail';
import PushDetail from './commercialPushDetail';
class Component extends React.Component {
  render() {
    const { className } = this.props;

    return (
      <div className={className}>
        {this.props.children}
      </div>
    );
  }
}

Component.displayName = 'CommercialReview';

Component.defaultProps = {
  className: 'commercialReview',
};

Component.propTypes = {
  className: React.PropTypes.string,
  children: React.PropTypes.element,
};

Component.Check = Check;
Component.Freeze = Freeze;
Component.Setting = Setting;
Component.View = View;
Component.Detail = Detail;
Component.PushDetail = PushDetail;

export default Component;
