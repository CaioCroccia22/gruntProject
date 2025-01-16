module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development: {
                files: {
                    "main.css": "main.less"
                }
            },
            production: {
                options: {
                    compress: true
                },
                files:{
                    'main.min.css': 'main.less'
                }
            }
        }
    });

    grunt.registerTask('helloGrunt', function(){
        const done = this.async();
        setTimeout(function(){
            console.log('Hello Grunt! with timeout');
            done();
        }, 3000)
       
    })
    
    grunt.loadNpmTasks('grunt-contrib-less');
    // grunt.registerTask('default', ['helloGrunt']);
}

