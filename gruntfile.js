// Grunting - create package.json with grunt, npm install
//					- add devDependencies, then npm instal
// 					- don't forget load-grunt-tasks,  
//					-	https://github.com/sindresorhus/load-grunt-tasks

module.exports = function(grunt) {
	
	require("load-grunt-tasks")(grunt);	
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		// HTML TASKs
		htmlhint: {
			dist: {
				options: {
					'tag-pair': true,
					'tagname-lowercase': true,
          'attr-lowercase': true,
          'attr-value-double-quotes': true,
          'doctype-first': true,
          'spec-char-escape': true,
          'id-unique': true,
          'head-script-disabled': true,
          'style-disabled': true
      	},
      	src: ['index.html']
			}
		},
		// JS TASKS
		jshint: {
			files: ['gruntfile.js', 'assets/js/*.js'],
			options: {
				globals: {

				}
			}
		},
		concat: {
			options: {
				seperator: ';'
			},
			dist: {
				files:{
					'tmp/concat/main.js': ['assets/js/*.js'],
				}
			}
		},
		uglify: {
			options: {
				compress: {
					drop_console: false
				}
			},
			dist: {
				options: {
					beautify: false,
					sourceMap: false
				},
				files: {
					'dist/assets/js/<%= pkg.name %>.min.js': ['tmp/concat/main.js']
				}
			}
		},

		// CSS TASKS
		sass: { 
			dist: {
				files: {
					//'build/css/app.css': 'assets/css/app.scss'
				}
			},
		},
		autoprefixer: {
			options: {

			},
			single_file: {
	      options: {
	        // Target-specific options here.
	      },
	      src: 'assets/css/style.css',
	      dest: 'tmp/css/style.css'
	    },
		},
		cssmin: {
			dist: {
				src: '<%= autoprefixer.single_file.dest %>',
				dest: 'dist/assets/css/app.min.css'
			}
		},

		// DEPENDENCY TASKS
		bower: {
			install: {
				options: {
					targetDir: './lib',
					layout: 'byType',
					install: true,
					verbose: false,
					cleanTargetDir: false,
					cleanBowerDir: false,
					bowerOptions: {}
				}
			}
		},

		// GRUNT TASKS
		clean: ["tmp"],

		watch: {
			html: {
				files: ['index.html', '<%= jshint.files %>'],
				tasks: ['default']
			},

			css: {
				// change to /**/*.scss
				files: ['assets/css/**/*.css'],
				tasks: ['cssbuild']
			},

			js: {
				files: ['assets/js/app.js'],
				tasks: ['jshint','concat','uglify' ]
			}

		}

	});

	// loadNpmTasks('grunt-htmlhint'); 
	// grunt.loadNpmTasks('grunt-htmlhint');

	// Register Tasks
	grunt.registerTask('default', ['htmlhint', 'concat', 'jshint', 'cssbuild', 'bower',] );
	grunt.registerTask('cssbuild', ['sass','autoprefixer','cssmin'] );

};