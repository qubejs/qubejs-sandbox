import { containers as rootContainers } from 'sq-core/web';
import Homepage from './Homepage';
import Content from './Content';
import Blank from './Blank';
import Dashboard from './Dashboard';

const { DynamicContent } = rootContainers;
export default {
  Homepage,
  Dashboard,
  Content,
  Blank
};

DynamicContent.registerContainers({
  Homepage,
  Dashboard,
  Content,
  Blank
});
