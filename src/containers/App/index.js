import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { root, utils, reducers } from 'sq-core/web';

import templates from '../../templates';
import routes from '../../ui-routes';
import ErrorBoundry from '../ErrorBoundry';
import BaseContainer from '../BaseContainer';
import { setAppLoaded } from '../../redux/app';
import './_app.scss';
const {
  apiBridge,
  appEvents,
  browser,
  // translate as translator,
  redirect,
} = utils;

const {
  closeNotification,
  closePopup,
  closePopupScreen,
  showNotificationMessage,
  stopLoading,
} = reducers.common;
// const { translate } = translator;
const { Progress, Dialog } = root;
const { redirectTo } = redirect;

class SandboxApp extends BaseContainer {
  constructor() {
    super();
    this.state = {
      pathname: '',
    };
    apiBridge.events.subscribe(
      'onUnRecognizedError',
      this.onUnRecognizedError.bind(this)
    );
    apiBridge.events.subscribe('onErrorPopup', this.onErrorPopup.bind(this));
    apiBridge.events.subscribe(
      'onUnauthroized',
      this.onUnauthroized.bind(this)
    );
    apiBridge.events.subscribe('onCustomError', this.onCustomError.bind(this));
    appEvents.events.subscribe(
      'beforeRedirect',
      this.onBeforeRedirect.bind(this)
    );
  }

  onUnauthroized() {
    redirectTo('login');
  }

  onBeforeRedirect(response) {
    // this.notify(response.error.message, 'error');
    // this.stopLoading();
    this.props.raiseAction(closePopupScreen());
  }

  onUnRecognizedError(response) {
    this.props.raiseAction(
      showNotificationMessage({
        message: response.error.message,
        type: 'error',
      })
    );
    this.props.raiseAction(stopLoading());
  }

  onCustomError(response) {
    const { handleType } = response.error;
    // switch (
    //   handleType
    //   // case 'SUBSCRIPTION_REQUIRED':
    //   //   this.openScreen('/gopremium', translate('Premium'));
    //   // break;
    // ) {
    // }
  }

  onErrorPopup(response) {
    this.props.raiseAction(
      showNotificationMessage({
        message: response.error.message,
        type: 'error',
      })
    );
    this.props.raiseAction(stopLoading());
  }

  componentDidMount() {
    // if (store.common.isProtectedUrl()) {
    //   this.props.userStore
    //     .pullUser()
    //     .finally(() => store.common.setAppLoaded());
    // } else {
    //   store.common.setAppLoaded();
    // }
    this.props.appActions.setAppLoaded();
  }

  render() {
    const { ...rest } = this.props;
    const { store } = this.props;
    const { popupScreen } = store.common;
    const userData = {
      loggedIn: !!this.props.store.auth.currentUser,
    };
    const RouterComponent =
      routes[popupScreen.name] && routes[popupScreen.name].container;
    const { ...Routerprops } = routes[popupScreen.name] || {};

    if (store.app.appLoaded) {
      return (
        <React.Fragment>
          {!RouterComponent && store.common.isLoading && (
            <Progress style="fixed" />
          )}
          <Dialog
            open={store.common.popup.show}
            content={store.common.popup.message}
            title={store.common.popup.title}
            actions={
              store.common.popup.actions || [
                { buttonText: 'Ok', actionType: 'close' },
              ]
            }
            onClose={() => this.props.appActions.closePopup()}
            onAction={() => this.props.appActions.closePopup()}
            severity={store.common.popup.type}
          />
          {RouterComponent && store.common.popupScreen.show && (
            <Dialog
              open={store.common.popupScreen.show}
              isLoading={store.common.isLoading}
              fullScreen={browser.breakpoints.down('sm')}
              content={
                <ErrorBoundry>
                  <RouterComponent
                    {...rest}
                    dataPacket={{
                      ...userData,
                      hasDialog: true,
                    }}
                    {...Routerprops}
                    {...store.common.popupScreen.props}
                  />
                </ErrorBoundry>
              }
              title={store.common.popupScreen.title}
              onClose={() => this.props.appActions.closePopupScreen()}
              onAction={() => this.props.appActions.closePopupScreen()}
            />
          )}

          <div className="sq-app__main">
            <Switch>
              {Object.keys(routes).map((key, idx) => {
                return (
                  <Route
                    key={key}
                    path={key}
                    render={(props) => {
                      let Compn;
                      let Template = '';
                      const { container, template, ...restProps } =
                        routes[key] || {};
                      if (
                        typeof routes[key] === 'object' &&
                        routes[key].container
                      ) {
                        Compn = routes[key].container;
                      }
                      if (
                        routes[key].template &&
                        templates[routes[key].template]
                      ) {
                        Template = templates[routes[key].template];
                      } else {
                        Template = templates['default'];
                      }
                      return (
                        <Template {...props} {...rest} {...restProps} routeName={key}>
                          <ErrorBoundry>
                            <Compn
                              dataPacket={{ ...userData }}
                              key={`route-${idx}`}
                              {...rest}
                              {...props}
                              {...restProps}
                              routeName={key}
                            />
                          </ErrorBoundry>
                        </Template>
                      );
                    }}
                  />
                );
              })}
              <Redirect from="/" to={'/content/en/home'} />
            </Switch>
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Progress />
        </React.Fragment>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    store: {
      common: state.common,
      content: state.content,
      app: state.app,
      auth: state.auth,
    },
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    appActions: {
      setAppLoaded: () => dispatch(setAppLoaded()),
      closeNotification: () => dispatch(closeNotification()),
      closePopup: () => dispatch(closePopup()),
      closePopupScreen: () => dispatch(closePopupScreen()),
    },
    raiseAction: dispatch,
  };
};

SandboxApp.propTypes = {
  raiseAction: PropTypes.func,
  closeNotification: PropTypes.func,
  store: PropTypes.object,
  commonActions: PropTypes.object,
  appActions: PropTypes.object,
  location: PropTypes.object,
  authStore: PropTypes.object,
  history: PropTypes.object,
};

export { SandboxApp as CustomerPortal };

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(SandboxApp);
