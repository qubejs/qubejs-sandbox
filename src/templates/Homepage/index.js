import React from 'react';
import PropTypes from 'prop-types';
import { root } from 'sq-core/web';
import { utils } from 'sq-core/web';

import BaseContainer from '../../containers/BaseContainer';
const { GlobalNavigation } = root;

class Homepage extends BaseContainer {
  constructor() {
    super();
    this.state = {
      qs: {}
    };
  }
  componentDidMount() {
    const params = utils.queryString.query.get();
    this.setState({
      qs: params
    });
  }

  render() {
    const { children, pageData = {}, data = {}, store } = this.props;
    const { metaData = {}, siteMap = {} } = data;
    let props = {};
    if (!store.auth.currentUser) {
      props = { ...siteMap.siteMap.globalNavigation };
    } else {
      props = { ...siteMap.siteMap.globalNavigationLoggedIn };
    }

    let finalLogo = siteMap.siteMap.logo;
    if (siteMap.siteMap.brands) {
      if (siteMap.siteMap.brands[this.state.qs.brand]) {
        finalLogo = siteMap.siteMap.brands[this.state.qs.brand];
      }
    }

    return (
      <div className={`sq-content-page sq-content-page--header-footer-body  ${pageData.className || ''}`}>
        <header>
          <GlobalNavigation logo={finalLogo} items={metaData.navigation} {...props} />
        </header>
        {children}
        <footer className="sq-template__footer">
          <div className="sq-template__footer-text">
            <div className="container">© Nybble Core Pvt Ltd., All Rights Reserved</div>
          </div>
        </footer>
      </div>
    );
  }
}

Homepage.propTypes = {
  children: PropTypes.node,
  pageData: PropTypes.object,
  store: PropTypes.object,
  data: PropTypes.object
};

export default Homepage;
