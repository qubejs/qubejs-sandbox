const { chai, fakeDb, mocks } = require('../../server/test/test.setup');
const errors = require('./errors');
const { expect } = chai;

describe('errors', () => {
  it('errors.subscriptionRequired()', () => {
    expect(errors.subscriptionRequired()).to.eqls({
      code: 400,
      message: 'Subscription required',
      handler: 'CUSTOM',
      handleType: 'SUBSCRIPTION_REQUIRED'
    });
  });
  it('errors.otpexpired()', () => {
    expect(errors.otpexpired()).to.eqls({
      code: 400,
      errors: {
        passcode: {
          error: true,
          errorMessage: 'Expired otp',
          key: 'OTP_EXPIRED'
        }
      }
    });
  });
  it('errors.otpinvalid()', () => {
    expect(errors.otpinvalid()).to.eqls({
      code: 400,
      errors: {
        passcode: {
          error: true,
          errorMessage: 'Invalid otp',
          key: 'OTP_INVALID'
        }
      }
    });
  });
  it('errors.offerAvailed()', () => {
    expect(errors.offerAvailed()).to.eqls({
      code: 400,
      message: 'Offer already availed',
      handler: 'POPUP',
      key: 'ALREADY_AVAILED'
    });
  });
});
