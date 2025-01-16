module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('Package.json'),
    });

    grunt.registerTask('helloGrunt', function(){
        const done = this.async();
        setTimeout(function(){
            console.log('Hello Grunt! with timeout');
            done();
        }, 3000)
       
    })

    grunt.registerTask('default', ['helloGrunt']);
}

