const azure = require('azure-storage');
const foreach = require('gulp-foreach');
const gulp = require('gulp');
const fs = require('fs');
require('dotenv').config();

const blobService = azure.createBlobService(process.env.AZURESTORAGE_CONNECTIONSTRING);
const sourceFolder = 'checkin';

fs.openSync('upload.log', 'w');

gulp.task('upload', () => {
  return gulp.src(`${sourceFolder}**\\*.*`)
  .pipe(foreach((stream, file) => {
    const localPath = file.path;
    const remotePath = `DevEnv\\${localPath.replace(sourceFolder, '')}`;
    blobService.createBlockBlobFromLocalFile('assets', remotePath, localPath, (error, result) => {
      if (!error) {
        fs.appendFileSync('upload.log', `${result.name} uploaded to ${result.container}\n`);
      } else {
        fs.appendFileSync('upload.log', `Failed to upload ${localPath}. ${error}`);
      }
    });
    return stream;
  }));
});
