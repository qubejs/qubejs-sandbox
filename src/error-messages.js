import { utils } from 'sq-core/web';
const { addMessages } = utils.errorMessages;

addMessages({
  NOT_AUTHRIZED: "Sorry, you're not authorized for this operation",
  OTP_INVALID: "Passcode you've entered is invalid"
});
