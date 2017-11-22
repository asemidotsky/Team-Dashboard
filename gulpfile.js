'use strict';

let gulp = require('gulp');
let uglify = require('gulp-uglify');
let ts = require('gulp-typescript');
let sourcemaps = require('gulp-sourcemaps');

let clientTsProject = ts.createProject('client/tsconfig.json');
let serverTsProject = ts.createProject('server/tsconfig.json');

// These tasks will be run when you just type "gulp"
gulp.task('default', [ 'clientscripts', 'serverscripts' ]);

// By adding this, we can run "gulp watch" to automatically
// run the build when we change a script
gulp.task('watch', () => {
  gulp.watch('client/src/**/*.ts', [ 'clientscripts' ]);
  gulp.watch('server/src/**/*.ts', [ 'serverscripts' ]);
});

// This task can be run alone with "gulp clientscripts"
gulp.task('clientscripts', () => {
  return clientTsProject.src()
                        .pipe(sourcemaps.init())
                        .pipe(clientTsProject())
                        .js
                        //.pipe(uglify())
                        .pipe(sourcemaps.write('.'))
                        .pipe(gulp.dest('client/app'));
});

// This task can be run alone with "gulp serverscripts"
gulp.task('serverscripts', () => {
  return serverTsProject.src()
                        .pipe(sourcemaps.init())
                        .pipe(serverTsProject())
                        .js
                        //.pipe(uglify())
                        .pipe(sourcemaps.write('.'))
                        .pipe(gulp.dest('server/app'));
});