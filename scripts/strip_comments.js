const gulp = require('gulp');
const strip = require('gulp-strip-comments');

const args = process.argv;
const scriptPath = args[2];
const outputDir = args[3];

function stripComments(scriptPath, outputDir) {
    const options = {
        ignore: /(?!\/\* globals)/g
    };
    gulp.task('default', function () {
        return gulp.src(scriptPath)
            .pipe(strip(options))
            .pipe(gulp.dest(outputDir));
    });
}

stripComments(scriptPath, outputDir);