import React from 'react';
import PropTypes from 'prop-types';
import { root } from 'sq-core/web';
const { LinkButton } = root;

class ErrorBoundry extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error) {
    console.log('@@@@@', error);
    // You can also log the error to an error reporting service
    this.setState({
      hasError: true
    });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="error-boundry container">
          <div className="container-form">
            <h1>Unexpected error occured</h1>
            <p>There is some error on this page please contact administrator.</p>
            <LinkButton buttonText="Go to Dashboard" to="dashboard" type="Button" variant="outlined" />
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundry.propTypes = {
  children: PropTypes.node
};

export default ErrorBoundry;
