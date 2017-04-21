/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import '../assets/css/displayItem.less';

class Component extends React.Component {
  render() {
    const {
      className,
      newCount,
      newTitle,
      newUnit,
      totalTitle,
      totalCount,
      totalUnit,
    } = this.props;

    return (
      <div className={className}>
        <div className={`${className}-new`}>
          <p className={`${className}-new-title`}>{newTitle}</p>
          <p className={`${className}-new-content`}>
            <span className={`${className}-new-content-count`}>{newCount}</span>
            <span className={`${className}-new-content-unit`}>{newUnit}</span>
          </p>
        </div>
        <div className={`${className}-total`}>
          <p className={`${className}-total-title`}>{totalTitle}</p>
          <p className={`${className}-total-content`}>
            <span className={`${className}-total-content-count`}>{totalCount}</span>
            <span className={`${className}-total-content-unit`}>{totalUnit}</span>
          </p>
        </div>
      </div>
    );
  }
}

Component.displayName = 'DisplayItem';

Component.defaultProps = {
  className: 'displayItem',
  newTitle: '',
  newCount: 0,
  newUnit: '',
  totalTitle: '',
  totalCount: 0,
  totalUnit: '',
};

Component.propTypes = {
  className: React.PropTypes.string,
  newTitle: React.PropTypes.string,
  newUnit: React.PropTypes.string,
  
  totalTitle: React.PropTypes.string,
  totalUnit: React.PropTypes.string,
  
};

export default Component;
