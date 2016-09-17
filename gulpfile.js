var lazyReq = require('lazy-req')(require);

var gulp = require('gulp'),
    concat = lazyReq('gulp-concat'),
    babel = require('gulp-babel'),
    autoprefixer = lazyReq('gulp-autoprefixer'),
    flatten = lazyReq('gulp-flatten'),
    del = lazyReq('del'),
    sass = lazyReq('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps');

var closureCompiler = require('google-closure-compiler').gulp();

gulp.task('js', function () {
    return gulp.src([
        'libs/*.js',
        'src/app.js',
        'src/app.controller.js',
        '!src/**/*compiled.js',
        'src/**/*.js'
    ])
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015', 'stage-0']
        }))
        .pipe(concat()('app.js'))
        .pipe(sourcemaps.write(''))
        .pipe(gulp.dest('dist'));

});

gulp.task('js-closure', function () {
    return gulp.src([
        'libs/*.js',
        'src/app.js',
        'src/app.controller.js',
        '!src/**/*compiled.js',
        'src/**/*.js'
    ])
        .pipe(babel({
            presets: ['es2015', 'stage-0']
        }))
        .pipe(concat()('app.js'))  
        .pipe(gulp.dest('dist'));

    return gulp.src([
            'src/app.js',
            'src/app.controller.js',
            '!src/**/*compiled.js',
            'src/**/*.js',
            'libs/*.js'
        ],
        {base: './'})
        .pipe(concat()('temp.js'))
        .pipe(babel({
            presets: ['es2015', 'stage-0']
        }))
        .pipe(closureCompiler({
            compilation_level: 'SIMPLE_OPTIMIZATIONS',
            warning_level: 'QUIET',
            language_in: 'ECMASCRIPT5_STRICT',
            language_out: 'ECMASCRIPT5_STRICT',
            output_wrapper: '(function(){\n%output%\n}).call(this)',
            js_output_file: 'app.js'
        }))
        .pipe(gulp.dest('dist'));
});


gulp.task('sass', function () {
    return gulp.src('src/**/*.scss')
    //        .pipe(sourcemaps.init())
        .pipe(sass()())
        .pipe(concat()('app.css'))
        .pipe(autoprefixer()({
            browsers: ['last 2 versions'],
            cascade: true
        }))
        //        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'));
});

gulp.task('assets', function () {
    gulp.src(['src/index.html'])
        .pipe(gulp.dest('dist'));

    gulp.src(['src/**/*.json'])
        .pipe(flatten()())
        .pipe(gulp.dest('dist/json'));

    gulp.src(['src/components/**/*.html', 'src/notification/**/*.html', 'src/directives/**/*.html'])
        .pipe(flatten()())
        .pipe(gulp.dest('dist/views'));

    gulp.src(['src/images/**/*'])
        .pipe(flatten()())
        .pipe(gulp.dest('dist/images'));

    gulp.src(['src/fonts/**/*'])
        .pipe(flatten()())
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('watch', function () {
    gulp.watch('src/**/*.js', ['js']);
    gulp.watch([
        'src/**/*.html',
        'src/images/**/*',
        'src/fonts/**/*',
        'src/**/*.json'
    ], ['assets']);
    gulp.watch('src/**/*.scss', ['sass']);
});

gulp.task('clean', function (cb) {
    del()(['dist/**'], cb);
});

gulp.task('cleanCompiled', function (cb) {
    del()(['src/**/*-compiled.js', 'src/**/*-compiled.js.map'], cb);
});

gulp.task('dev', ['js', 'sass', 'assets']);

gulp.task('dist', ['js-closure', 'sass', 'assets']);

gulp.task('default', ['js', 'sass', 'assets', 'watch']);

