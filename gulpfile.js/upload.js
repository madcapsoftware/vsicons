const gulp = require('gulp');
const fs = require('fs');
const tap = require('gulp-tap');
const hasha = require('hasha');
const path = require('path');
require('dotenv').config();

const globFilter = '!(*color|*grey|*inverse|*cyan|*disable|*noHalo|*nohalo)*_16x.{svg,png,xaml}';
const srcFolder = 'src/files/';
const destFolder = 'dist/files/';
const logStream = fs.createWriteStream('upload.log', { flags: 'a+' });

gulp.task('upload', () => (
  gulp.src(`${srcFolder}/**/${globFilter}`)
    .pipe(tap((file, t) => {
      const hashaOptions = {
        algoritm: 'md5',
        encoding: 'base64',
      };
      const fileName = path.relative(srcFolder, file.path).replace(/\\/g, '/');
      const srcHash = hasha(file.contents, hashaOptions);
      fs.stat(`${destFolder}${fileName}`, (error) => {
        let buffer;
        // file already exists in 'src/files'
        if (!error) {
          // get hash to compare src and dist version
          hasha.fromFile(`${destFolder}${fileName}`, hashaOptions)
            .then((distHash) => {
              // return the stream if version is different
              if (srcHash !== distHash) {
                buffer = t.through;
                logStream.write(`${new Date().toISOString()}\tExisting item ${fileName} overwritten.\r\n`);
              }
            });
            // file doesn't exist in 'src/files'
        } else {
          buffer = t.through;
          logStream.write(`${new Date().toISOString()}\tNew item ${fileName} added.\r\n`);
        }
        return buffer;
      });
    }))
    .pipe(gulp.dest(`${destFolder}`))
  ));
