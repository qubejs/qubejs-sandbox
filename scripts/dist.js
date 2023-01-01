const fs = require('fs-extra');
const path = require('path');
var file_system = require('fs');
var archiver = require('archiver');
const paths = require('../config/paths');
var packageJson = require('../package.json');

function copyFileSync(source, target) {
  var targetFile = target;

  // If target is a directory, a new file with the same name will be created
  if (fs.existsSync(target)) {
    if (fs.lstatSync(target).isDirectory()) {
      targetFile = path.join(target, path.basename(source));
    }
  }

  fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyFolderRecursiveSync(
  source,
  target,
  ignore = ['node_modules', 'coverage', '.storybook', '.nyc_output', 'package-lock.json']
) {
  if (!fs.existsSync(source)) {
    return;
  }
  var files = [];
  if (ignore.indexOf(path.basename(source)) > -1) {
    return;
  }
  // Check if folder needs to be created or integrated
  var targetFolder = path.join(target, path.basename(source));
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder);
  }

  // Copy
  if (fs.lstatSync(source).isDirectory()) {
    files = fs.readdirSync(source);
    files.forEach(function (file) {
      var curSource = path.join(source, file);
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursiveSync(curSource, targetFolder);
      } else {
        if (ignore.indexOf(path.basename(curSource)) === -1) {
          copyFileSync(curSource, targetFolder);
        }
      }
    });
  }
}

function copyPublicFolder() {
  fs.copySync(paths.appBuild, paths.distBuild + `/${packageJson.name}/build`, {
    dereference: true
  });
}
function localCopySync(source, target) {
  if (!fs.existsSync(source)) {
    return;
  }
  fs.copySync(source, target, {
    dereference: true
  });
}
function copyServer() {
  copyFolderRecursiveSync(paths.server, paths.distBuild + `/${packageJson.name}`);
  copyFolderRecursiveSync(paths.clientlibs, paths.distBuild + `/${packageJson.name}`);
  fs.copyFileSync(paths.appPath + '/package.json', paths.distBuild + `/${packageJson.name}/package.json`);
  // fs.copyFileSync(paths.appPath + '/sq-core-1.0.0.tgz', paths.distBuild + `/${packageJson.name}/sq-core-1.0.0.tgz`);
  if (!fs.existsSync(paths.distBuild + `/${packageJson.name}/src`)) {
    fs.mkdirSync(paths.distBuild + `/${packageJson.name}/src`);
  }
  fs.copyFileSync(paths.appSrc + '/config.js', paths.distBuild + `/${packageJson.name}/src/config.js`);
  localCopySync(paths.appPath + '/.ebextensions', paths.distBuild + `/${packageJson.name}/.ebextensions`);
  localCopySync(paths.content, paths.distBuild + `/${packageJson.name}/content`);
  localCopySync(paths.dam, paths.distBuild + `/${packageJson.name}/dam`);
  localCopySync(paths.scripts, paths.distBuild + `/${packageJson.name}/scripts`);
  localCopySync(paths.config, paths.distBuild + `/${packageJson.name}/config`);
  localCopySync(paths.apps, paths.distBuild + `/${packageJson.name}/apps`);
}

function zipBuild(filename) {
  var output = file_system.createWriteStream(filename);
  var archive = archiver('zip');

  output.on('close', function () {
    console.log(archive.pointer() + ' total bytes');
    console.log('archiver has been finalized and the output file descriptor has closed.');
  });

  archive.on('error', function (err) {
    throw err;
  });

  archive.pipe(output);

  // append files from a sub-directory, putting its contents at the root of archive
  archive.directory(paths.distBuild + `/${packageJson.name}`, false);

  archive.finalize();
}


copyPublicFolder();
copyServer();
zipBuild(`./dist/${packageJson.name}-${packageJson.version}.zip`);

