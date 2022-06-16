var gulp = require("gulp"),
  autoprefixer = require("gulp-autoprefixer");
const sass = require("gulp-sass")(require("sass"));
sass.compiler = require("node-sass");
var browserSync = require("browser-sync").create();

gulp.task("sass", function () {
  return gulp
    .src("./scss/**/*.scss")
    .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
    .pipe(autoprefixer("last 2 versions", "safari 5", "ie 7-9"))
    .pipe(gulp.dest("./dist/"));
});

gulp.task("watch", function () {
  browserSync.init({
    server: {
      baseDir: "./",
    },
    notify: false,
  });
  gulp.watch("./scss/**/*.scss", gulp.series(["sass"]));
  gulp.watch(["**/*.html", "dist/*.css"]).on("change", browserSync.reload);
});
