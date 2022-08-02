"use strict";

const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const clean = require('gulp-clean');
const size = require('gulp-size');
const imagemin = import ('gulp-imagemin');
const { pipeline } = require('stream');
//Paths
const path = {
    styles:{
        src:'src/sass/*.scss',
        dest:'public/css/'
    },
    scripts:{
        src:'src/js/*.js',
        dest:'public/js'
    },
    audio:{
        src:'src/audio/*.mp3',
        dest:'public/audio'
    },
    images:{
        src:'src/img/**/*.+(png|jpg|svg)',
        dest:'public/img'
    },
    video:{
        src:'src/video/*.+(mp4|avi|mkv)',
        dest:'public/video'
    },
    html:{
        src:'src/*.html',
        dest:'public'
    }
};

// Static server
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir:"src"
        }
    });
});

//html
gulp.task('html', function() {
    return gulp.src(path.html.src)
    .pipe(size())
        .pipe(gulp.dest(path.html.dest));
});

//styles
gulp.task('styles', function(){
    return gulp.src("src/sass/*.+(scss|sass)")
    .pipe(sass())
    .pipe(gulp.dest('src/css'))
    .pipe(gulp.dest('public/css'))
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename({
        prefix: "",
        suffix: ".min"
    }))
    .pipe(autoprefixer({
        cascade: false
    }))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(size())
    .pipe(gulp.dest(path.styles.dest))
    .pipe(browserSync.stream());
});
//Scripts
gulp.task('scripts', function() {
    return gulp.src(['src/js/**/*.js','!src/js/script.js','!src/js/audio-eq-vis.js','src/js/audio-eq-vis.js', 'src/js/script.js'])
        .pipe(concat('script.js'))
        // .pipe(uglify())
        // .pipe(rename({suffix: '.min'}))
        .pipe(size())
        .pipe(gulp.dest(path.scripts.dest));
});

//Video
gulp.task('video', function() {
    return gulp.src(path.video.src)
    .pipe(size())
        .pipe(gulp.dest(path.video.dest));
});
//Audio
gulp.task('audio', function() {
    return gulp.src(path.audio.src)
    .pipe(size())
        .pipe(gulp.dest(path.audio.dest));
});

//Images
gulp.task('images', function() {
    return gulp.src(path.audio.src)
    .pipe(imagemin())
    .pipe(size())
        .pipe(gulp.dest(path.audio.dest));
});


//Clean
gulp.task('clean', function(){
    return gulp.src('public/', {read: false})
    .pipe(clean());
});

//Watch
gulp.task('watch', function(){
    gulp.watch('src/sass/*.+(scss|sass)', gulp.parallel('styles'));
    gulp.watch('src/*.html').on('change', browserSync.reload);
    gulp.watch('src/js/*.js').on('change', browserSync.reload);
});

gulp.task('default', gulp.parallel('watch','server','styles', 'scripts','video','audio','html'));