
// require modules
const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const browserSync = require('browser-sync').create();
const scss = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const uglify = require('gulp-uglify');
const del = require('del');
const googleWebFonts = require('gulp-google-webfonts');
const imagemin = require('gulp-imagemin');
const runSequence = require('run-sequence');
const ftp = require('vinyl-ftp');
const include = require("gulp-include");
const spritesmith = require("gulp.spritesmith");
const sourcemaps = require('gulp-sourcemaps');
const filter = require('gulp-filter');
const bower = require('gulp-bower');
const rename = require("gulp-rename");
const cleanCSS = require('gulp-clean-css');

// sprite
gulp.task('sprite', function() {
    var spriteData =
        gulp.src('src/sprites/**/*.*')
        .pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: '_sprite.scss',
            algorithm: 'binary-tree',
            padding: 10
        }));
    spriteData.img.pipe(gulp.dest('src/images'));
    spriteData.css.pipe(gulp.dest('src/scss/base'));
});

// html
gulp.task('html', function() {
    return gulp.src('src/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('dist'));
});

// styles
gulp.task('style', function() {
    return gulp.src('src/scss/main.scss')
        .pipe(plumber())
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(sourcemaps.init())
        .pipe(scss.sync())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.stream());
});

// fonts
var options = {
    fontsDir: 'googlefonts/',
    cssDir: 'googlecss/',
    cssFilename: '_fonts.scs'
};

gulp.task('fonts', function() {
    return gulp.src('./fonts.list')
        .pipe(googleWebFonts(options))
        .pipe(gulp.dest('src/fonts'));
});

// scripts
gulp.task('scripts', function() {
    return gulp.src('src/js/*.js')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(include())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('src/js/min'));
});

// bower js
gulp.task('js-bower', function() {
    const js = filter('**/*.js', {
        restore: true
    });
    return bower({
            directory: './bower_components'
        })
        .pipe(js)
        .pipe(gulp.dest('src/js/bower'))
        .pipe(js.restore);
});

// bower css
gulp.task('css-bower', function() {
    const css = filter('**/*.css', {
        restore: true
    });
    return bower({
            directory: './bower_components'
        })
        .pipe(css)
        .pipe(rename({
            prefix: "_",
            extname: ".scss"
        }))
        .pipe(gulp.dest('src/scss/bower'))
        .pipe(css.restore);
});

// bower bootstrap
gulp.task('bootstrap-bower', function() {
    const scss = filter('bootstrap/scss/**/*.scss', {
        restore: true
    });
    return bower({
            directory: './bower_components'
        })
        .pipe(scss)
        .pipe(gulp.dest('src/scss'))
        .pipe(scss.restore);
});

// gulp bower task
gulp.task('bower', ['js-bower', 'css-bower', 'bootstrap-bower']);

// serve
gulp.task('serve', function() {
    browserSync.init({
        server: "src/"
    });
});

// clean
gulp.task("clean", function() {
    return del("dist/");
});

// copy
gulp.task('copy', function() {
    return gulp.src(["src/css/**/*.css", "src/images/*", "src/js/min/*.js"], {
            base: "src"
        })
        .pipe(gulp.dest("dist/"));
});

// images
gulp.task('img', function() {
    return gulp.src('src/images/*', {
            base: 'src'
        })
        .pipe(imagemin())
        .pipe(gulp.dest('dist/'));
});

// upload to ftp
gulp.task('upload', function() {
    var conn = ftp.create({
        host: '****',
        user: '****',
        password: '****'
    });
    return gulp.src('dist/**/*').pipe(conn.dest('/public_html/'));
});

// build project
gulp.task('build', function(cb) {
    runSequence('sprite', 'img', 'clean', 'html', 'copy', 'scripts', 'upload', cb);
});

// gulp watch
gulp.task('watch', function() {
    gulp.watch('src/scss/**/*.scss', ['style']);
    gulp.watch(['src/js/modules/*.js', 'src/js/main.js', 'src/*.html'], ['scripts']).on('change', browserSync.reload);
});

// gulp default
gulp.task('default', ['style', 'scripts', 'serve', 'watch']);
