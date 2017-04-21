/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PersonalVerify from './personalVerify';
import EnterpriseVerify from './enterpriseVerify';
import BuyerVerify from './buyerVerify';
import AddBuyerVerify from './addBuyerVerify';

class Component extends React.Component {
  render() {
    const { className, children } = this.props;

    return (
      <div className={className}>
        {children}
      </div>
    );
  }
}

Component.defaultProps = {
  className: 'identityReview',
};

Component.propTypes = {
  children: React.PropTypes.element,
  className: React.PropTypes.string,
};

Component.PersonalVerify = PersonalVerify;

Component.EnterpriseVerify = EnterpriseVerify;

Component.BuyerVerify = BuyerVerify;

Component.AddBuyerVerify = AddBuyerVerify;

export default Component;
