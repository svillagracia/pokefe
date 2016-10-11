const gulp       = require('gulp')
    , sass       = require('gulp-sass')
    , uglify     = require('gulp-uglify')
    , minify     = require('gulp-minify')
    , concat     = require('gulp-concat')
    , eslint     = require('gulp-eslint')
    , connect    = require('gulp-connect')
    , bytediff   = require('gulp-bytediff')
    , minifyCss  = require('gulp-minify-css')
    , sourcemaps = require('gulp-sourcemaps')
    , ngAnnotate = require('gulp-ng-annotate')
    , strip      = require('gulp-strip-comments')
    , jsBld      = './bld/js/'
    , css        = './bld/css/'
    , html       = './**/*.html'
    , scss       = './src/css/main.scss'
    , allSass    = './src/css/**/*.scss'
    , jsSrc      = ['./src/js/app/app.js', './src/js/app/**/*.js']

gulp.task('connect', () => {
  connect.server({
    port: 3000,
    livereload: true
  })
})

gulp.task('html', () => {
  gulp.src(html)
  .pipe(connect.reload())
})

gulp.task('sass', () => {
  gulp.src(scss)
  .pipe(sourcemaps.init())
  .pipe(sass())
  .pipe(minifyCss())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(css))
  .pipe(connect.reload())
})

gulp.task('lint', () => {
  return gulp.src(['src/**/*.js', '!node_modules/**', '!bld/**', '!GulpFile.js'])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError())
})

gulp.task('js', () => {
  gulp.src(jsSrc)
  .pipe(sourcemaps.init())
  .pipe(concat('main.js', { newLine: ';' }))
  .pipe(strip())
  .pipe(ngAnnotate())
  .pipe(bytediff.start())
  .pipe(uglify({ mangle: true }))
  .pipe(bytediff.stop((data) => {
    let diff = (data.savings > 0) ? 'smaller' : 'larger'
    return `${data.fileName} is ${data.percent}% ${diff}.`
  }))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest(jsBld))
  .pipe(connect.reload())
})

gulp.task('watch', () => {
  gulp.watch(html, ['html'])
  gulp.watch(allSass, ['sass'])
  gulp.watch(jsSrc, ['lint', 'js'])
})

gulp.task('default', ['lint', 'js', 'sass', 'watch', 'connect'])