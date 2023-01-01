'use strict';

const path = require('path');
const fs = require('fs');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

// We use `PUBLIC_URL` environment variable or "homepage" field to infer
// "public path" at which the app is served.
// webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.

const buildPath = process.env.BUILD_PATH || 'build';

const moduleFileExtensions = ['web.mjs', 'mjs', 'web.js', 'js', 'web.ts', 'ts', 'web.tsx', 'tsx', 'json', 'web.jsx', 'jsx'];

// Resolve file paths in the same order as webpack
const resolveModule = (resolveFn, filePath) => {
  const extension = moduleFileExtensions.find((extension) => fs.existsSync(resolveFn(`${filePath}.${extension}`)));

  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }

  return resolveFn(`${filePath}.js`);
};

// config after eject: we're in ./config/
module.exports = {
  dotenv: resolveApp('.env'),
  appPath: resolveApp('.'),
  appBuild: resolveApp(buildPath),
  apps: resolveApp('apps'),
  tmp: resolveApp('tmp'),
  clientlibs: resolveApp('clientlibs'),
  csvOuput: resolveApp('csv-cache'),
  server: resolveApp('server'),
  packages: resolveApp('swishqube-core'),
  content: resolveApp('content'),
  dam: resolveApp('dam'),
  scripts: resolveApp('scripts'),
  config: resolveApp('config'),
  distBuild: resolveApp('dist'),
  emailCache: resolveApp('email-cache'),
  cordova: resolveApp('cordova'),
  cordovaBuild: resolveApp('cordova/www'),
  iosBuild: resolveApp('cordova/platforms/ios/www'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveModule(resolveApp, 'src/index'),
  tdcIndexJs: resolveModule(resolveApp, 'src/tdc/index'),
  oakVilleIndexJs: resolveModule(resolveApp, 'src/oakville/index'),
  mpv2IndexJs: resolveModule(resolveApp, 'src/mpv2/index'),
  dopIndexJs: resolveModule(resolveApp, 'src/dop/index'),
  styles: resolveApp('src/styles'),
  assets: resolveApp('src/assets'),
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  sourceToBuild: [resolveApp('src'), resolveApp('swishqube-core'), resolveApp('../swishqube-core/dist')],
  appTsConfig: resolveApp('tsconfig.json'),
  appJsConfig: resolveApp('jsconfig.json'),
  yarnLockFile: resolveApp('yarn.lock'),
  testsSetup: resolveModule(resolveApp, 'src/setupTests'),
  proxySetup: resolveApp('src/setupProxy.js'),
  appNodeModules: resolveApp('node_modules'),
  appWebpackCache: resolveApp('node_modules/.cache'),
  appTsBuildInfoFile: resolveApp('node_modules/.cache/tsconfig.tsbuildinfo'),
  swSrc: resolveModule(resolveApp, 'src/service-worker'),
};

module.exports.moduleFileExtensions = moduleFileExtensions;
