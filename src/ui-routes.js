import { containers } from 'sq-core/web';
const { DynamicContent } = containers;

export default {
  '/content/*': {
    container: DynamicContent.default,
    template: 'Content'
  },
  '/content': {
    template: 'Content',
    container: DynamicContent.default
  }
};
