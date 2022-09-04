'use strict';

import ChildProcess from 'child_process';
import { deleteSync } from 'del';
import log from 'fancy-log';
import gulp from 'gulp';
import eslint from 'gulp-eslint-new';
import gulpJest from 'gulp-jest';
import ts from 'gulp-typescript';
import vinylPaths from 'vinyl-paths';
const jest = gulpJest.default;
const { src, task, series } = gulp;

// Delete all files in the directories in the array
task('clean', () => {
  return src(['dist'], { read: false, allowEmpty: true }).pipe(
    vinylPaths(deleteSync)
  );
});

// Lint all TypeScript files
// Fix any fixable linting issues automatically eg CRLF to LF line endings
task('lint', () => {
  return src(['src/**/*.ts', 'test/**/*.ts'])
    .pipe(eslint({ fix: true }))
    .pipe(eslint.fix())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

// Compile with tsc and emit to dist
task('compile', () => {
  return src(['src/**/*.ts', 'test/**/*.ts'])
    .pipe(ts.createProject('tsconfig.json')())
    .pipe(gulp.dest('dist'));
});

// Test with jest
// task('test', () => {
//   return src(['test/**/*.ts'], { read: false, allowEmpty: true }).pipe(
//     jest({
//       automock: false,
//     })
//   );
// });

// Run the clean, lint and compile tasks in series
// task('build', series('clean', 'lint', 'test', 'compile'));
task('build', series('clean', 'lint', 'compile'));

// Spawn a cmd process
// e.g runCmd('npm.cmd', ['test'], (text) => { log(text); });  will run npm test
function runCmd(cmd, args, cb) {
  log(cmd, args.join(' '));
  const spawn = ChildProcess.spawn;
  const child = spawn(cmd, args);
  let resp = '';

  child.stdout.on('data', (buffer) => (resp += buffer.toString()));
  child.stdout.on('end', () => cb(resp));
}
