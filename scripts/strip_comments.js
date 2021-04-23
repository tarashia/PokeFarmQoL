const gulp = require('gulp');
const strip = require('gulp-strip-comments');

const args = process.argv;
const scriptPath = args[2];
const outputDir = args[3];

console.log('fdsa');

function stripComments(scriptPath, outputDir) {
    const options = {
        ignore: /(?!\/\* globals)/g
    };
    gulp.task('default', function () {
        console.log('in task');
        return gulp.src(scriptPath)
            .pipe(strip(options))
            .pipe(gulp.dest(outputDir));
    });
}

console.log('fdsa2');
stripComments(scriptPath, outputDir);
console.log('fdsa3');