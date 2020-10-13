let app = new Vue({
    el: '#app',
    data: {
        nome: null,
        nomeValido: null,
        perguntas: [
            'Qual a sigla da universidade?',
            'Qual o nome do curso?',
            'Qual o nome da cidade que está situada a universidade?',
            'Qual a cor oficial do curso?'
        ],
        opcoes: [
            ['UCPel', 'UFPel', 'UFRGS', 'FURG'],
            ['Agronomia', 'Veterinária', 'Matemática', 'Meio Ambiente'],
            ['Rio Grande', 'Porto Alegre', 'Pelotas', 'Salvador'],
            ['Verde', 'Azul', 'Amarelo', 'Vermelho']
        ],
        gabarito: [1, 0, 2, 1],
        respostas: [],
        indice: -1,
        finalizado: false,
        nota: 0,
    },
    methods: {
        comecar: function () {
            if(this.nomeValido) {
                this.indice = 0;
            } else {
                alert('Preencha seu nome com pelo menos 3 caracteres.')
            }
        },
        proximaPergunta: function () {
            if(this.respostas[this.indice] == undefined) {
                alert('Selecione uma resposta.')
                return;
            }

            if(this.indice == (this.perguntas.length - 1)) {
                this.finalizar();
                return;
            }

            var ele = document.getElementsByName("opcao");
            for(var i=0;i<ele.length;i++) {
                ele[i].checked = false;
            }

            this.indice++;
        },
        salvarResposta: function (pergunta, resposta) {
            this.respostas[pergunta] = resposta;
        },
        finalizar: function () {
            this.calcularNota();

            this.finalizado = true;
        },
        calcularNota: function () {
            for(id_pergunta in this.respostas) {
                if(this.gabarito[id_pergunta] == this.respostas[id_pergunta]) {
                    this.nota++;
                }
            }

            this.nota = (this.nota / this.perguntas.length) * 100;
        },
        novoTeste: function () {
            this.nome = null;
            this.respostas = [];
            this.finalizado = false;
            this.indice = -1;
            this.nota = 0;
            this.nomeValido = null;
        }
    },
    watch: {
        nome: function () {
            if(this.nome.length > 0 && this.nome.length < 3) {
                this.nomeValido = false;
            } else if(this.nome.length >= 3) {
                this.nomeValido = true;
            } else {
                this.nomeValido = null;
            }
        }
    },
    mounted: function () {
        document.getElementById('loader').remove();
    }
})