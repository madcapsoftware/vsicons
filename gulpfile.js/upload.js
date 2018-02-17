const azure = require('azure-storage');
const gulp = require('gulp');
const glob = require('glob');
const fs = require('fs');
const hasha = require('hasha');
require('dotenv').config();

const blobService = azure.createBlobService(process.env.AZURESTORAGE_CONNECTIONSTRING);
const srcFolder = 'E:/Desktop/temp/test/';
const globFilter = '!(*color|*grey|*inverse|*cyan|*disable|*noHalo|*nohalo)*.{svg,png,xaml}';
const destFolder = '.';
const container = 'vsideicons';
const logStream = fs.createWriteStream('upload.log', { flags: 'a' });

gulp.task('upload', () => {
  const localBlobs = glob.sync(`${srcFolder}/**/${globFilter}`);
  logStream.write(`\r\n\n-------${new Date()}------\r\n\n`);
  localBlobs.forEach((localBlob) => {
    const fileName = localBlob.replace(srcFolder, '');
    const localMD5 = hasha.fromFileSync(localBlob, { algorithm: 'md5', encoding: 'base64' });
    const localMtime = fs.statSync(localBlob).mtime;
    blobService.doesBlobExist(container, fileName, (existsError, existsResult) => {
      if (!existsError) {
        if (existsResult.exists) {
          const remoteMtime = new Date(existsResult.lastModified);
          const remoteMD5 = existsResult.contentSettings.contentMD5;
          if (remoteMD5 === localMD5 || remoteMtime > localMtime) {
            logStream.write(`Skipping ${fileName} as same or newer version already exists in ${container}.\r\n`);
          } else {
            blobService.createBlockBlobFromLocalFile(
              container,
              `${destFolder}/${fileName}`,
              localBlob,
              (createError) => {
                if (!createError) {
                  logStream.write(`${fileName} was replaced by newer version.\r\n`);
                } else {
                  logStream.write(`${createError}\r\n`);
                }
              });
          }
        } else {
          blobService.createBlockBlobFromLocalFile(
            container,
            `${destFolder}/${fileName}`,
            localBlob,
            (createError) => {
              if (!createError) {
                logStream.write(`Successfully uploaded ${fileName} to ${container}/${destFolder}\r\n`);
              } else {
                logStream.write(`${createError}\r\n`);
              }
            });
        }
      }
    });
  });
});
