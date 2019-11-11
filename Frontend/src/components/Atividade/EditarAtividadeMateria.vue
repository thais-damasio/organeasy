<template>
    <div v-if="!isLoadingInitial" class="uk-card uk-card-default uk-width-4-5@m uk-align-center">
        <!-- Header -->
        <div class="uk-card-header">
            <!-- Alerta de erro -->
            <div v-if="errorMessage" class="uk-alert-danger" uk-alert>
                <a class="uk-alert-close" uk-close></a>
                <p>{{errorMessage}}</p>
            </div>
            <div v-if="dados.atividade">
                <h3 class="uk-card-title uk-margin-remove-bottom">Editar</h3>
                <small>Editando: {{dados.atividade.titulo}}</small>
            </div>
        </div>
        <!--  -->
        <form @submit.prevent.stop="editarAtividade()" v-if="dados.atividade">
            <div class="uk-card-body"> 
                <!-- Título da Atividade -->
                <div class="uk-margin">
                    <label class="uk-form-label">Título</label>
                    <div class="uk-form-controls">
                        <input class="uk-input" type="text" placeholder="Título da atividade" v-model="dados.atividade.titulo" :class="{ 'form-group-error': $v.dados.atividade.titulo.$error }">
                    </div>
                    <span v-if="$v.dados.atividade.titulo.$error" class="error-message">{{validationMsg($v.dados.atividade.titulo)}}</span>
                </div>
                <!--  -->
                <!-- Descrição da Atividade -->
                <div class="uk-margin">
                    <label class="uk-form-label">Descrição</label>
                    <div class="uk-form-controls">
                        <textarea class="uk-textarea" v-model="dados.atividade.descricao" rows="5" placeholder="Descrição da atividade" :class="{ 'form-group-error': $v.dados.atividade.descricao.$error }"></textarea>
                    </div>
                    <span v-if="$v.dados.atividade.descricao.$error" class="error-message">{{validationMsg($v.dados.atividade.descricao)}}</span>
                </div>
                <!--  -->
                <!-- Data de Realização -->
                <div class="uk-margin">
                    <label class="uk-form-label">Data de Realização <small class="uk-text-muted">(Opcional)</small></label>
                    <div class="uk-form-controls">
                        <input class="uk-input" type="date" v-model="dados.atividade.data_entrega" :class="{ 'form-group-error': $v.dados.atividade.data_entrega.$error }">
                    </div>
                    <span v-if="$v.dados.atividade.data_entrega.$error" class="error-message">{{validationMsg($v.dados.atividade.data_entrega)}}</span>
                </div>
                <!--  -->
                <!-- Pontuação -->
                <div class="uk-margin" v-if="dados.tem_pontos">
                    <!-- Valor -->
                    <label class="uk-form-label">Valor <small class="uk-text-muted">(Opcional)</small></label>
                    <div class="uk-form-controls">
                        <input class="uk-input" type="text" placeholder="Valor em pontuação da atividade" v-model="dados.valor" :class="{ 'form-group-error': $v.dados.valor.$error }">
                    </div>
                    <span v-if="$v.dados.valor.$error" class="error-message">{{validationMsg($v.dados.valor)}}</span>
                    <!--  -->
                    <!-- Valor ganho -->
                    <label class="uk-form-label">Valor Ganho <small class="uk-text-muted">(Opcional)</small></label>
                    <div class="uk-form-controls">
                        <input class="uk-input" type="text" placeholder="Valor ganho da pontuação" v-model="dados.valor_ganho" :class="{ 'form-group-error': $v.dados.valor_ganho.$error }">
                    </div>
                    <span v-if="$v.dados.valor_ganho.$error" class="error-message">{{validationMsg($v.dados.valor_ganho)}}</span>
                    <!--  -->
                </div>
                <!--  -->
            </div>
            <!-- Submit -->
            <div class="uk-card-footer uk-text-center">                
                <button :disabled="isLoading || $v.$error" type="submit" class="uk-button uk-button-primary">
                    Salvar
                    <div v-if="isLoading" class="spinner-loading" uk-spinner="ratio: 0.5"></div>
                </button>
            </div>
        </form>
        <div v-else class="uk-padding uk-text-center">
            Atividade não encontrada
        </div>
    </div>
    <div v-else class="uk-text-center uk-spinner-loading">
        <div class="spinner-loading" uk-spinner="ratio: 3"></div>
    </div>
</template>

<script>
// Imports
import { required, maxLength } from "vuelidate/lib/validators";
import { validationMessage } from "vuelidate-messages";

// Mensagens de validação
const formMessages = {
  required: () => "Este campo é obrigatório"
};

export default {
    data() {
        return {
            dados: {},
            isLoading: false,
            isLoadingInitial: true,
            errorMessage: null
        }
    },
    props: ['id'],
    methods: {
        async editarAtividade() {
            try {
                this.$v.$touch();
                if (!this.$v.$invalid) {
                    this.isLoading = true;
                    this.errorMessage = null;

                    // Recupera o token
                    let token = this.$session.get('jwt');
                    let atividade = {
                        // dados gerais
                        titulo: this.dados.atividade.titulo,
                        descricao: this.dados.atividade.descricao
                    }
                    if(this.dados.atividade.data_entrega)
                        atividade.data_entrega = this.dados.atividade.data_entrega;
                    if(this.dados.valor)
                        atividade.valor = this.dados.valor;
                    if(this.dados.valor_ganho)
                        atividade.valor_ganho = this.dados.valor_ganho;

                    // Salva os cursos e as matérias
                    let response = await this.$http.put(process.env.API_URL + 'atividade-curso/update/' + this.id, atividade, {headers: {Authorization: token}});

                    this.isLoading = false;

                    // Redireciona para a página de dashboard
                    this.$router.push({ name: 'verAtividadeMateria', params: {id: this.id}});
                }
            }
            catch(e){
                this.errorMessage = e.body.message;
                this.isLoading = false;
            }  
        },
        validationMsg: validationMessage(formMessages)
    },
    created() {
        let token = this.$session.get('jwt');
        // Carrega os cursos
        this.$http.get(process.env.API_URL + 'atividade-materia/get/' + this.id, {headers: {Authorization: token}})
        .then(
        atividade => {
            this.dados = atividade.body;
            this.isLoadingInitial = false;
        },
        err => {
            this.errorMessage = err.body.message;
            this.isLoadingInitial = false;
        });
    },
    // Validação dos campos
    validations: {
        dados: {
            atividade: {
                // dados gerais
                titulo: {
                    required,
                    maxLength: maxLength(255)
                },
                descricao: {
                    required,
                    maxLength: maxLength(255)
                },
                data_entrega: { },
            },
            valor: { },
            valor_ganho: { }
        }
    }
}
</script>
