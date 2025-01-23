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
            },
            // Monitora as alterações no arquivo html
            html: {
                files: ['src/index.html'],
                tasks: ['replace:dev']
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
                       },
                       {
                        // Nomenclatura que irá no href do link
                        match: 'ENDERECO_DO_JS',
                        // O arquivo que será substituido
                        replacement: '../src/script/main.js'
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
                        dest: 'dev/'
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
                       },
                       {
                        // Nomenclatura que irá no href do link
                        match: 'ENDERECO_DO_JS',
                        // O arquivo que será substituido
                        replacement: '../src/script/main.min.js'
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
        },
        clean: {
            // Limpar a pasta prebuild
            src: ['prebuild']
        },
        //Gerando o arquivo javascript minificado
        uglify: {
            target: {
                files: {
                    'dist/script/main.min.js': 'src/script/main.js'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['less:production', 'htmlmin:dist', 'replace:dist', 'replace:dev' , 'clean', 'uglify']);
}

