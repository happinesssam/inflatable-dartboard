const settings = require("./package.json").settings;
const gulp = require("gulp");
const gulpif = require("gulp-if");
const changed = require("gulp-changed");
const gutil = require("gulp-util");
const uglify = require("gulp-uglify");
const sourcemaps = require("gulp-sourcemaps");
const ts = require("gulp-typescript");
const merge = require("merge2");
const del = require("del");

const debug = settings.debug === true;

if (debug) { console.log("=== DEBUG Environment ===") }
else { console.log("=== RELEASE Environment ==="); }

gulp.task("clean", () => {
    let files = ["./.cache.json", "./*.log"];
if (debug) { files.push(settings.paths.debug + "*"); }
else { files.push(settings.paths.release + "*"); }

return del(files);
});

gulp.task("clean:all", () => {
    let files = ["./.cache.json", "./*.log"];
files.push(settings.paths.debug + "*");
files.push(settings.paths.release + "*");

return del(files);
});

gulp.task("compile", () => {
    let config = "";
let dest = "";

if (debug) {
    config = settings.tsconfig.debug;
    dest = settings.paths.debug;
}
else {
    config = settings.tsconfig.release;
    dest = settings.paths.release;
}

let tsProject = ts.createProject(config);
const tsResult = tsProject.src()
    .pipe(gulpif(debug, sourcemaps.init()))
    .pipe(tsProject());

return merge([
    tsResult.js
        .pipe(gulpif(debug, sourcemaps.write()))
        .pipe(gulp.dest(dest)),
    tsResult.dts
        .pipe(gulp.dest(dest))])
    .on("error", gutil.log);
});

gulp.task("copy", () => {
    let dest = "";

if (debug) { dest = settings.paths.debug;  }
else { dest = settings.paths.release; }

gulp.src(settings.paths.src + "*.html")
    .pipe(changed(dest))
    .pipe(gulp.dest(dest));

gulp.src(settings.paths.srcImages + "**")
    .pipe(changed(dest))
    .pipe(gulp.dest(dest + settings.paths.tgtImages));

gulp.src(settings.paths.srcCss + "**")
    .pipe(changed(dest))
    .pipe(gulp.dest(dest + settings.paths.tgtCss));

gulp.src(settings.paths.srcLibs + "**")
    .pipe(changed(dest))
    .pipe(gulp.dest(dest + settings.paths.tgtLibs));
});

gulp.task("default", ["compile", "copy"]);