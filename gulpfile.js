const gulp = require('gulp');
const browsersync = require('browser-sync').create();
const sass = require('gulp-sass');

gulp.task('sass', async function(){
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss','src/scss/*.scss'])
        .pipe(sass())           
        .pipe(gulp.dest('src/css'))
        .pipe(browsersync.stream());
});

gulp.task('js', async function() {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
        .pipe(gulp.dest("src/js"))
        .pipe(browsersync.stream());
});

gulp.task('serve', gulp.series(['sass'], function(){
    browsersync.init({
        server: './src'
    })

    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss','src/scss/*.scss'], gulp.series(['sass']));
    gulp.watch(['src/*.html']).on('change', browsersync.reload);
}));

gulp.task('default', gulp.series(['js', 'serve']));