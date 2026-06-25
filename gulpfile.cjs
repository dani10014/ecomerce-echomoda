const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');

function compilaSass() {
    return gulp.src('src/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'));
}
function compilaJs(){
    return gulp.src('src/js/**/*.js')
        .pipe(babel({
            presets: ['@babel/preset-env'] // Transpila o JS moderno para ES5
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
        
}
function watchFiles() {
    gulp.watch('src/sass/**/*.scss', compilaSass)
    gulp.watch('src/js/**/*.js', compilaJs)
}

exports.default = gulp.series(compilaSass,compilaJs,watchFiles);
