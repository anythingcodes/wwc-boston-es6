/* global module:false */
module.exports = function(grunt) {
	var port = grunt.option('port') || 8000;
	// Project configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		meta: {
			banner:
				'/*!\n' +
				' * reveal.js <%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd, HH:MM") %>)\n' +
				' * http://lab.hakim.se/reveal-js\n' +
				' * MIT licensed\n' +
				' *\n' +
				' * Copyright (C) 2014 Hakim El Hattab, http://hakim.se\n' +
				' */'
		},

		qunit: {
			files: [ 'test/*.html' ]
		},

		uglify: {
			options: {
				banner: '<%= meta.banner %>\n'
			},
			build: {
				src: 'src/js/*.js',
				dest: 'dist/js/reveal.min.js'
			}
		},

		sass: {
			main: {
				files: {
				    'dist/css/reveal.css': 'src/css/theme/reveal.scss',
				    'dist/css/print.css': 'src/css/theme/print/print.scss',
				    'dist/css/light.css': 'src/css/theme/source/light.scss',
					'dist/css/default.css': 'src/css/theme/source/default.scss',
                    'dist/css/beige.css': 'src/css/theme/source/beige.scss',
                    'dist/css/night.css': 'src/css/theme/source/night.scss',
                    'dist/css/serif.css': 'src/css/theme/source/serif.scss',
                    'dist/css/simple.css': 'src/css/theme/source/simple.scss',
                    'dist/css/sky.css': 'src/css/theme/source/sky.scss',
                    'dist/css/moon.css': 'src/css/theme/source/moon.scss',
                    'dist/css/solarized.css': 'src/css/theme/source/solarized.scss',
                    'dist/css/blood.css': 'src/css/theme/source/blood.scss',
                    'dist/css/wwc.css': 'src/css/theme/source/wwc.scss'
				}
			}
		},

        postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer')({browsers: 'last 2 versions'}),
                    require('cssnano')()
                ]
            },
            dist: {
                src: 'dist/css/*.css'
            }
        },

		jshint: {
			options: {
				curly: false,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
                node: true,
				noarg: true,
				sub: true,
				undef: true,
				eqnull: true,
				browser: true,
				expr: true,
				globals: {
					head: false,
					module: false,
					console: false,
					unescape: false
				}
			},
			files: [ 'Gruntfile.js' ]
		},

		connect: {
			server: {
				options: {
					port: port,
					base: '.'
				}
			}
		},

		zip: {
			'reveal-js-presentation.zip': [
				'index.html',
				'src/css/**',
				'js/**',
				'dist/**',
				'images/**',
				'plugin/**'
			]
		},

		watch: {
			main: {
				files: [ 'Gruntfile.js', 'src/**/*.js', 'src/**/*.scss' ],
				tasks:  [ 'jshint', 'sass', 'postcss', 'uglify' ]
            },
			theme: {
				files: [ 'src/css/theme/source/**/*.scss', 'src/css/theme/template/*.scss' ],
				tasks: 'themes'
			}
		},

		browserSync: {
			bsFiles: {
				src : [
					'dist/js/**/*.js',
					'dist/css/**/*.css',
					'*.html'
				]
			},
			options: {
				watchTask: true,
				server: './'
			}
		}

	});

	// Dependencies
	grunt.loadNpmTasks( 'grunt-contrib-qunit' );
	grunt.loadNpmTasks( 'grunt-contrib-jshint' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-contrib-sass' );
	grunt.loadNpmTasks( 'grunt-browser-sync' );
    grunt.loadNpmTasks( 'grunt-postcss' );
    grunt.loadNpmTasks( 'grunt-zip' );

	// Default task
	grunt.registerTask( 'default', [ 'jshint', 'sass', 'postcss', 'uglify', 'qunit', 'browserSync', 'watch' ] );

	// Theme task
	grunt.registerTask( 'themes', [ 'sass' ] );

	// Package presentation to archive
	grunt.registerTask( 'package', [ 'default', 'zip' ] );

	// Run tests
	grunt.registerTask( 'test', [ 'jshint', 'qunit' ] );

};
