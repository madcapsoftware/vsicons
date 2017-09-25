const azure = require('azure-storage');
const foreach = require('gulp-foreach');
const path = require('path');
const gulp = require('gulp');
const fs = require('fs');
require('dotenv').config();

const blobService = azure.createBlobService(process.env.AZURESTORAGE_CONNECTIONSTRING);
const sourceFolder = 'storage';

fs.openSync('upload.log', 'w');

gulp.task('upload', () => {
  gulp.src(`${sourceFolder}\\**\\*.*`)
    .pipe(foreach((stream, file) => {
      const filePath = file.path;
      const fileName = path.basename(filePath);
      const folderName = fileName.replace(/_.+/g, '');
      const blobName = `DevEnv/${folderName}/${fileName}`;
      blobService.createBlockBlobFromLocalFile('assets', blobName, filePath, (error, result) => {
        if (!error) {
          console.log(`${result.name} uploaded to ${result.container}/${blobName}`);
        }
      });
      return stream;
    }));
});
