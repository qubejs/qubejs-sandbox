import { globals } from 'sq-core/web';

export const CONSTANTS = {
  ...globals.CONSTANTS,
};

export const GLOBAL_OPTIONS = {
  ...globals.GLOBAL_OPTIONS,
  templates: new globals.GlobalOptions({
    DASHBOARD: 'Dashboard',
    CONTENT: 'Content',
    HOMEPAGE: 'Homepage',
    AUTHENTICATION: 'Authentication',
    ADMIN_DASHBOARD: 'AdminDashboard',
  }),
  yesNo: new globals.GlobalOptions({
    YES: 'Yes',
    NO: 'No',
  }),
};
