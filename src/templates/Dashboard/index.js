import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { root } from 'sq-core/web';

import './dashboard.scss';
const { GlobalNavigation } = root;

class Dashboard extends Component {
  constructor() {
    super();
    this.onMenuItemClick = this.onMenuItemClick.bind(this);
  }

  onMenuItemClick(item) {
    const { onAnalytics } = this.props;
    if (item.type === 'popup') {
      this.props.commonStore.openScreen(item.path, item.text, {
        close: () => {}
      });
    }
    onAnalytics &&
      onAnalytics({
        type: 'event',
        eventName: 'link_click',
        action: 'navigate',
        category: 'Navigation',
        viewType: item.type,
        label: item.text,
        section: 'Global'
      });
  }

  render() {
    const { children, appBarColor = 'default' } = this.props;
    const { data = {} } = this.props;
    const { metaData = {}, siteMap = {} } = data;
    return (
      <div className={`sq-content-page sq-template sq-template--full-page sq-template--flex-page sq-template--dashobard`}>
        <header className={`sq-template__header ${appBarColor}`}>
          <GlobalNavigation
            {...siteMap.siteMap.globalNavigation}
            stickyNav={false}
            logo={siteMap.siteMap.logo}
            items={metaData.navigation}
            className={'sq-global-navigation--bordered'}
          />
        </header>
        <div className="sq-template__content">{children}</div>
        <footer className="sq-template__footer">
          <div className="sq-template__footer-text">
            <div className="container">© Nybble Core Pvt. Ltd., All Rights Reserved</div>
          </div>
        </footer>
      </div>
    );
  }
}

Dashboard.propTypes = {
  children: PropTypes.node,
  authStore: PropTypes.object,
  commonStore: PropTypes.object,
  forecastStore: PropTypes.object,
  userStore: PropTypes.object,
  onAnalytics: PropTypes.func,
  appBarColor: PropTypes.string,
  color: PropTypes.object,
  data: PropTypes.object
};

export default Dashboard;
