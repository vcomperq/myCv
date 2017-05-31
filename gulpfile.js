// Requis
var gulp = require('gulp');

// Include plugins
var plugins = require('gulp-load-plugins')(); // tous les plugins de package.json
var concat = require('gulp-concat');
var livereload = require('gulp-livereload');

// Variables de chemins
var source = './src'; // dossier de travail
var destination = './content'; // dossier à livrer

gulp.task('css', function () {
    return gulp.src(source + '/styles/mycv.scss')
      .pipe(plugins.sass())
      .pipe(plugins.csscomb())
      .pipe(plugins.cssbeautify({ indent: '  ' }))
      .pipe(plugins.autoprefixer())
        //.on('error', gutil.log)
      .pipe(gulp.dest(destination + '/styles/'))
      .pipe(livereload({ start: true }));
});

gulp.task('minify', function () {
    return gulp.src(destination + '/styles/mycv.css')
      .pipe(plugins.csso())
      .pipe(plugins.rename({
          suffix: '.min'
      }))
      .pipe(gulp.dest(destination + '/styles/'));
});


gulp.task('reload', /*['inject'], */function () {
    //livereload();
    livereload({ start: true });
});

// Tâche "build"
gulp.task('build', ['css']);

// Tâche "prod" = Build + minify
gulp.task('prod', ['build', 'minify']);

// Tâche par défaut
gulp.task('default', ['build']);

gulp.task('watch', function () {
    //livereload.listen({
    //    "host": "localhost"
    //});
    
    livereload.listen();
    gulp.watch(source + '/styles/mycv.scss', ['build', 'reload']);
});