module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development: {
                files: {
                    "main.css": "main.less"
                }
            },
            //Arquivo minificado CSS para a produção
            production: {
                options: {
                    compress: true
                },
                files:{
                    'main.min.css': 'main.less'
                }
            }
        },
        sass:{
            dist:{
                options: {
                    style: 'compressed'
                },
                files:{
                    'main_sass.css': 'main.scss'
                }
            }
        },
        concurrent:{
            target: ['helloGrunt','less:development', 'less:production', 'sass:dist']
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
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.registerTask('default', ['concurrent']);
}

