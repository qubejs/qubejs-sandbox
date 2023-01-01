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
    const { children, pageData = {} } = this.props;

    return (
      <div className={`sq-content-page sq-content-page--header-footer-body  ${pageData.className || ''}`}>
        {children}
        <footer className="sq-template__footer">
          <div className="sq-template__footer-text">
            <div className="container">© Nybble Core Pvt. Ltd., All Rights Reserved</div>
          </div>
        </footer>
      </div>
    );
  }
}

Homepage.propTypes = {
  children: PropTypes.node,
  pageData: PropTypes.object,
  userStore: PropTypes.object,
  data: PropTypes.object
};

export default Homepage;
