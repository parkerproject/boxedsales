module.exports = function(grunt) {
    var config = {
        jshint: {
            options: {
                ignores: ['node_modules/**', 'public/vendor/**', '**/*.min.js'],
                jshintrc: '.jshintrc'
            },
            gruntfile: 'Gruntfile.js',
            server: ['routes/**/*.js', 'app.js', 'config.js'],
            client: 'public/**/*.js'
        },
        sass: {
            src: {
                files: [{
                    expand: true,
                    cwd: 'public/sass',
                    src: '**/*.scss',
                    dest: 'public/css',
                    ext: '.css'
                }]
            }
        },
        cssmin: {
            src: {
                files: [{
                    expand: true,
                    cwd: 'public/css',
                    src: '**/*.css',
                    dest: 'public/css',
                    ext: '.min.css'
                }]
            }
        },
        'node-inspector': {
            options: {
                'save-live-edit': true
            }
        },
        nodemon: {
            dev: {
                script: 'app.js',
                options: {
                    nodeArgs: ['--debug'],
                    cwd: __dirname,
                    ignore: ['node_modules/', 'public/'],
                    ext: 'js',
                    watch: ['routes/**/*.js', 'app.js', 'config.js'],
                    delay: 1,
                    legacyWatch: true
                }
            }
        },
        watch: {
            all: {
                files: ['public/**/*', 'views/**', '!**/node_modules/**', '!public/vendor/**/*', '!**/*.min.*'],
                options: {
                    livereload: 3006
                }
            },
            gruntfile: {
                files: 'Gruntfile.js',
                tasks: 'jshint:gruntfile'
            },
            scripts: {
                files: 'public/js/**/*.js',
                //tasks: 'jshint:client'
            },
            server: {
                files: ['routes/**/*.js', 'app.js', 'config.js'],
                tasks: 'jshint:server'
            },
            scss: {
                files: ['public/sass/**/*.scss'],
                tasks: ['sass', 'cssmin']
            }
        },
        concurrent: {
            tasks: ['nodemon', 'node-inspector', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        }
    };

    grunt.initConfig(config);

    // Load the tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    //grunt.registerTask('default', ['jshint', 'sass', 'cssmin', 'concurrent']);
    grunt.registerTask('default', ['sass', 'cssmin', 'concurrent']);
};