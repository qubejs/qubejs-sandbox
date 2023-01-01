import { utils } from 'sq-core/web';

const {
  datetime: { DateTime },
  format: { setDefaults, setFormatters }
} = utils;

setDefaults({
  currency: {
    decimals: 2
  }
});

setFormatters({
  day: (value, options = {}) => {
    return new DateTime(value).toString('ddd');
  },
  dateMonth: (value, options = {}) => {
    return new DateTime(value).toString('DD/MM');
  }
});
