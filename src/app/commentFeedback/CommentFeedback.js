/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PurchaseFeedback from './purchaseFeedback';
import EvaluateFeedback from './evaluateFeedback';
import AnswerFeedback from './answerFeedback';
import DetailFeedback from './detailFeedback';
import ShopFeedback from './shopFeedback';
import FeedbackSetting from './feedbackSetting';

class Component extends React.Component {
  render() {
    const { className, children, onChange } = this.props;
    return (
      <div className={className} onChange={onChange}>
        {children}
      </div>
    );
  }
}

Component.defaultProps = {
  className: 'commentFeedback',
};

Component.propTypes = {
  className: React.PropTypes.string,
  children: React.PropTypes.element,
};

Component.PurchaseFeedback = PurchaseFeedback;
Component.AnswerFeedback = AnswerFeedback;
Component.DetailFeedback = DetailFeedback;
Component.ShopFeedback = ShopFeedback;
Component.EvaluateFeedback = EvaluateFeedback;
Component.FeedbackSetting = FeedbackSetting;

export default Component;
