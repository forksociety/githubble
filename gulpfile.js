/*******************************
            Set-up
*******************************/
var sematicSrc = './public/semantic/';

var
  gulp         = require('gulp-help')(require('gulp')),

  // read user config to know what task to load
  config       = require(sematicSrc + 'tasks/config/user'),

  // watch changes
  watch        = require(sematicSrc + 'tasks/watch'),

  // build all files
  build        = require(sematicSrc + 'tasks/build'),
  buildJS      = require(sematicSrc + 'tasks/build/javascript'),
  buildCSS     = require(sematicSrc + 'tasks/build/css'),
  buildAssets  = require(sematicSrc + 'tasks/build/assets'),

  // utility
  clean        = require(sematicSrc + 'tasks/clean'),
  version      = require(sematicSrc + 'tasks/version'),

  // docs tasks
  serveDocs    = require(sematicSrc + 'tasks/docs/serve'),
  buildDocs    = require(sematicSrc + 'tasks/docs/build'),

  // rtl
  buildRTL     = require(sematicSrc + 'tasks/rtl/build'),
  watchRTL     = require(sematicSrc + 'tasks/rtl/watch')
;



/*******************************
             Tasks
*******************************/
/* to sync 2 folders
var source = './semantic/dist',  
    destination = './public/semantic';

gulp.task('sync', function() {  
  gulp.src(source + '/**'remove this while using'/*', {base: source})
    .pipe(gulp.dest(destination));
});
*/


gulp.task('default', false, [
  'watch'
]);

gulp.task('watch', 'Watch for site/theme changes', watch);

gulp.task('build', 'Builds all files from source', build);
gulp.task('build-javascript', 'Builds all javascript from source', buildJS);
gulp.task('build-css', 'Builds all css from source', buildCSS);
gulp.task('build-assets', 'Copies all assets from source', buildAssets);

gulp.task('clean', 'Clean dist folder', clean);
gulp.task('version', 'Displays current version of Semantic', version);

/*--------------
      Docs
---------------*/

/*
  Lets you serve files to a local documentation instance
  https://github.com/Semantic-Org/Semantic-UI-Docs/
*/

gulp.task('serve-docs', 'Serve file changes to SUI Docs', serveDocs);
gulp.task('build-docs', 'Build all files and add to SUI Docs', buildDocs);


/*--------------
      RTL
---------------*/

if(config.rtl) {
  gulp.task('watch-rtl', 'Watch files as RTL', watchRTL);
  gulp.task('build-rtl', 'Build all files as RTL', buildRTL);
}