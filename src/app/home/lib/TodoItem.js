/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import '../assets/css/todoItem.less';

class Component extends React.Component {
  render() {
    const { className, count, title, unit } = this.props;

    return (
      <div className={className}>
        <p className={`${className}-title`}>{title}</p>
        <p className={`${className}-content`}>
          <span className={`${className}-content-count`}>{count}</span>
          <span className={`${className}-content-unit`}>{unit}</span>
        </p>
      </div>
    );
  }
}

Component.displayName = 'TodoItem';

Component.defaultProps = {
  className: 'todoItem',
  title: '',
  count: 0,
  unit: '',
};

Component.propTypes = {
  className: React.PropTypes.string,
  title: React.PropTypes.string,
  unit: React.PropTypes.string,
};

export default Component;
