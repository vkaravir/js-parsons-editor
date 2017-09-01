module.exports = function(grunt) {
  "use strict";

  // load all grunt tasks in package.json with load-grunt-tasks task :)
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    compass: {
      dist: {
        options: {
          config: 'src/editor-style/config.rb',
          sassDir: 'src/editor-style/sass',
          cssDir: 'build/'
        }
      }
    },
    watch: {
      editor: {
        files: ['src/*', 'src/**/*'],
        tasks: ["default"]
      }
    }
  });

  grunt.registerTask("default", ["compass"]);
};
