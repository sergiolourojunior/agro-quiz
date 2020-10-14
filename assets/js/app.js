let app = new Vue({
    el: '#app',
    data: {
        nome: null,
        nomeValido: null,
        perguntas: [
            'Qual vestimenta deve ser utilizada em uma laboratório?',
            'No caso de queimaduras com algum tipo de ácido, quais medidas tomar?',
            'Em caso de ocorrência de fogo no ambiente do laboratório qual primeira medida a tomar?',
            'Qual conduta deve ser adotada em um laboratório?',
            'Em quais situações deve-se utilizar o chuveiro de emergência?'
        ],
        opcoes: [
            ['Jaleco, braços tapados e calça cobrindo as pernas', 'Sapato aberto, camiseta e bermuda/shorts', 'Sapato fechado, camiseta manga curta'],
            ['Lavar rapidamente na água para resolver superficialmente o ferimento', 'Lavar em água corrente por bastante tempo, ver qual a situação da queimadura e se apresentar vermelhidão ir até o médico', 'Utilizar pomadas para queimadura'],
            ['Utilizar água', 'Utilizar extintor de CO2', 'Chamar responsável do local'],
            ['Estar de cabelo solto (pessoas com cabelo comprido)', 'Usar acessórios como anéis, brincos e relógios', 'Trabalhar em pé para melhora da mobilidade, usar óculos de proteção, cabelo preso e não usar acessórios'],
            ['Acidentes com produtos químicos ou fogo', 'Corte na pele', 'Lavar compartimentos para que sejam reaproveitados']
        ],
        gabarito: [0, 1, 1, 2, 0],
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