const { watch } = require("fs");

module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            //Arquivo CSS para o ambiente de desenvolvimento
            development: {
                files: {
                    //Destino: Origem
                    "dev/styles/main.css": "src/style/main.less"
                }
            },
            //Arquivo minificado CSS para a produção
            production: {
                options: {
                    compress: true
                },
                files:{
                    //Destino: Origem
                    'dist/styles/main.min.css': 'src/style/main.less'
                }
            }
        },
        watch:{
            less: {
                files: ['src/style/**/*.less'],
                tasks: ['less:development']
            }
        },
        // Substitui o endereço do CSS no arquivo HTML
        replace:{
            // Dev -> se refere ao ambiente de desenvolvimento
            dev:{
                options:{
                    patterns: [
                       {
                            // Nomenclatura que irá no href do link
                            match: 'ENDERECO_DO_CSS',
                            // O arquivo que será substituido
                            replacement: './styles/main.css'
                       }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        // O local do arquivo
                        src: ['src/index.html'],
                        // O local de destino
                        dest: 'dist/'
                    }
                ]
            },
            dist:{
                options:{
                    patterns: [
                       {
                            // Nomenclatura que irá no href do link
                            match: 'ENDERECO_DO_CSS',
                            // O arquivo que será substituido
                            replacement: './styles/main.min.css'
                       }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        // O local do arquivo
                        src: ['prebuild/index.html'],
                        // O local de destino
                        dest: 'dist/'
                    }
                ]
            }
        },
        // Arquivo html minificado
        htmlmin:{
            // Dist é a pasta de destino (produção)
            dist: {
                options: {
                    // Remove os comentários
                    removeComments: true,
                    // Remove os espaços em branco
                    collapseWhitespace: true
                },
                files: {
                    // Fazer a minificação 
                    //Destino : origem
                    'prebuild/index.html' : 'dev/index.html'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['less:production', 'htmlmin:dist', 'replace:dist']);
}

