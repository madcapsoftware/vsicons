const gulp = require('gulp');
const fs = require('fs');
const zip = require('gulp-zip');
const prompt = require('prompt');

const data = JSON.parse(fs.readFileSync('src/assets/vsicons.json'));
const srcPath = 'src/files';
const distPath = 'dist/files';
const zipfilename = 'archive.zip';

gulp.task('assets', () => {
  prompt.start();
  return prompt.get(['srcPath', 'distPath', 'zipfilename'], (err, response) => {
    const files = data.filter(item => (item.publish)).map(item => (
      `${response.srcPath.replace('\\', '/') || srcPath}/${item.name}/**/*_16x*.+(svg|png|xaml|bmp)`
    ));
    gulp.src(files, { base: `${response.srcPath.replace('\\', '/') || srcPath}` })
      .pipe(zip(`${response.zipfilename || zipfilename}`))
      .pipe(gulp.dest(`${response.distPath.replace('\\', '/') || distPath}`));
  });
});
