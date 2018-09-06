module.exports = function(grunt) {

  let dist_path = "../ciecode.es-ghpages/";

  grunt.initConfig({
    copy: {
      dist: {
        files: [
          {expand: true, cwd: "src/assets/images/", src: ["**/*"], dest: dist_path + "assets/images/"},
          {expand: true, cwd: "src/assets/fonts/", src: ["*"], dest: dist_path + "assets/fonts/"},
          {expand: true, cwd: "src/assets/css/", src: ["**/*.css"], dest: dist_path + "assets/css/"},
          {expand: true, cwd: "src/assets/js/", src: ["**/*.js"], dest: dist_path + "assets/js/"},
          {expand: true, cwd: "src/", src: ["robots.txt"], dest: dist_path}
        ]
      }
    },
    sass: {
      dist: {
        // files: {
        //   src: ["src/assets/sass/style.scss"],
        //   dest: [dist_path + "assets/css/style.css"],
        // }
      }
    },
    ejs_static: {
      dist: {
        options: {
          dest: dist_path,
          path_to_data: "src/data/routes.json",
          path_to_layouts: "src/layouts",
          index_page: "home",
          parent_dirs: true,
          underscores_to_dashes: true,
          file_extension: ".html"
        }
      }
    },
    xml_sitemap: {
      default_options: {
        options: {
          dest: dist_path,
          siteRoot: "http://ciecode.es"
        },
        files: [
          {
            expand: false,
            cwd: dist_path,
            src: [
              "**/*.html"
            ]
          }
        ]
      }
    },
    watch: {
      datachanges: {
        files: ["src/data/**/*.json", "src/layouts/**/*.ejs", "src/assets/sass/*.scss"],
        tasks: ["ejs_static:dist"]
      },
      sasschanges: {
        files: ["src/assets/sass/scss"],
        tasks: ["sass:dist"]
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-sass");
  grunt.loadNpmTasks("grunt-ejs-static");
  grunt.loadNpmTasks("grunt-xml-sitemap");

  grunt.registerTask("default", ["copy", "sass", "ejs_static", "xml_sitemap", "watch"]);

}
