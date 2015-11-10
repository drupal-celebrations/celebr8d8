'use strict';

module.exports = function (grunt) {

  grunt.initConfig({
    concurrent: {
      watch: {
        tasks: ['compass', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },

    watch: {
      options: {
        livereload: true
      },
      registry: {
        files: ['*.info', '{,**}/*.{php,inc}'],
        tasks: ['shell:theme-registry'],
        options: {
          livereload: false
        }
      },
      'assets-images': {
        files: ['assets/images/**'],
        tasks: ['copy:images-uncompressed']
      },
      'assets-icons': {
        files: ['assets/icons/**'],
        tasks: ['svgmin:icons', 'svg2png', 'copy:icon-svg']
      },
      images: {
        files: ['images/**']
      },
      css: {
        files: ['css/{,**/}*.css']
      },
      js: {
        files: ['js/{,**/}*.js']
      }
    },

    shell: {
      "theme-registry": {
        command: 'drush cache-clear theme-registry'
      }
    },

    uglify: {
      dev: {
        options: {
          mangle: false,
          compress: false,
          beautify: true
        },
        files: [{
          expand: true,
          cwd: 'js',
          src: ['**/*.js', '!**/*.min.js'],
          dest: 'js',
          ext: '.min.js',
          extDot: 'last'
        }]
      },
      dist: {
        options: {
          mangle: true,
          compress: {}
        },
        files: [{
          expand: true,
          cwd: 'js',
          src: ['**/*.js', '!**/*.min.js'],
          dest: 'js',
          ext: '.min.js',
          extDot: 'last'
        }]
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: ['js/{,**/}*.js', '!js/{,**/}*.min.js']
    },

    copy: {
      "images-uncompressed": {
        expand: true,
        cwd: 'assets/images',
        src: '**/*',
        dest: 'images/'
      },
      "icon-svg": {
        expand: true,
        cwd: 'assets/icons/minified',
        src: '**/*',
        dest: 'icons/svg'
      }
    },

    imagemin: {
      dist: {
        options: {
          pngquant: true
        },
        files: [{
          expand: true,
          cwd: 'assets/images',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'images/'
        }]
      }
    },

    svgmin: {
      icons: {
        options: {
          plugins: [
            { convertShapeToPath: false },
            { removeViewBox: false }
          ]
        },
        files: [{
          expand: true,
          cwd: 'assets/icons',
          src: ['*.svg'],
          dest: 'assets/icons/minified'
        }]
      }
    },

    svg2png: {
      all: {
        files: [{
          cwd: 'assets/icons/minified/',
          src: ['*.svg'],
          dest: 'icons/png/'
        }]
      }
    },

    compass: {
      options: {
        config: 'config.rb',
        bundleExec: true
      },
      dev: {
        options: {
          environment: 'development',
          watch: true
        }
      },
      dist: {
        options: {
          environment: 'production',
          force: true
        }
      }
    },

    postcss: {
      options: {
        map: true,
        processors: [
          require('autoprefixer-core')({
            browsers: ['last 2 versions']
          })
        ]
      },
      dist: {
        src: 'css/*.css'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-svg2png');
  grunt.loadNpmTasks('grunt-postcss');

  grunt.registerTask('build', [
    'uglify:dist',
    'jshint',
    'imagemin:dist',
    'svgmin:icons',
    'svg2png',
    'copy:icon-svg',
    'compass:dist',
    'postcss:dist'
  ]);
  grunt.registerTask('stylesheet', ['compass:dev']);
  grunt.registerTask('default', ['concurrent']);
};
