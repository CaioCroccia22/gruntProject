module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development: {
                files: {
                    "dev/styles/main.css": "src/style/main.less"
                }
            },
            //Arquivo minificado CSS para a produção
            production: {
                options: {
                    compress: true
                },
                files:{
                    'dist/styles/main.min.css': 'src/style/main.less'
                }
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.registerTask('default', ['less:development']);
    grunt.registerTask('build', ['less:production']);
}

