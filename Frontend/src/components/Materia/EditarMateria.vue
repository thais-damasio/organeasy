<template>
    <div v-if="!isLoadingInitial" class="uk-card uk-card-default uk-width-4-5@m uk-align-center">
        <!-- Header -->
        <div class="uk-card-header">
            <div v-if="materia">
                <h3 class="uk-card-title uk-margin-remove-bottom">Editar</h3>
                <small>Editando: {{materia.nome}}</small>
            </div>
        </div>
        <!--  -->
        <form @submit.prevent.stop="editarMateria()" v-if="materia">
            <div class="uk-card-body">
                <!-- Alerta de erro -->
                <div v-if="errorMessage" class="uk-alert-danger" uk-alert>
                    <a class="uk-alert-close" uk-close></a>
                    <p>{{errorMessage}}</p>
                </div>
                
                <!-- Nome da materia -->
                <div class="uk-margin">
                    <label class="uk-form-label">Nome</label>
                    <div class="uk-form-controls" :class="{ 'form-group-error': $v.materia.nome.$error }">
                        <input class="uk-input" v-model="materia.nome" type="text" placeholder="Nome da matéria">
                    </div>
                    <span v-if="$v.materia.nome.$error" class="error-message">{{validationMsg($v.materia.nome)}}</span>
                </div>
                <!--  -->
            </div>
            <div class="uk-card-footer uk-text-center">
                <div class="uk-clearfix">
                    <div class="uk-float-left">                            
                        <button :disabled="isLoading || $v.$error" type="submit" class="uk-button uk-button-primary">
                            Salvar
                            <div v-if="isLoading" class="spinner-loading" uk-spinner="ratio: 0.5"></div>
                        </button>
                    </div>
                    <div class="uk-float-right">
                        <router-link :to="{name: 'cursos'}" class="uk-button uk-button-default">Voltar</router-link>
                    </div>
                </div>
            </div>
        </form>
        <div v-else class="uk-padding uk-text-center">
            Matéria não encontrada
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
            materia: {},
            isLoading: false,
            isLoadingInitial: true,
            errorMessage: null
        }
    },
    props: ['id'],
    created() {
        let token = this.$session.get('jwt');
        // Carrega a matéria
        this.$http.get(process.env.API_URL + 'materia/get/' + this.id, {headers: {Authorization: token}})
        .then(
        materia => {
            this.materia = materia.body;
            this.isLoadingInitial = false;
        },
        err => {
            this.errorMessage = err.body.message;
            this.isLoadingInitial = false;
        });
    },
    methods: {
        async editarMateria() {
            this.$v.$touch();
            if (!this.$v.$invalid && !this.registerCurso) {
                try {
                    this.isLoading = true;
                    this.errorMessage = null;

                    // Recupera o token
                    let token = this.$session.get('jwt');
                    let materia = {
                        nome: this.materia.nome
                    }

                    // Salva os cursos e as matérias
                    let response = await this.$http.put(process.env.API_URL + 'materia/update/' + this.id, materia, {headers: {Authorization: token}});

                    this.isLoading = false;
                    // Redireciona para a página de dashboard
                    this.$router.push({ name: 'verMateria', params: {id: this.id}});
                }
                catch(e){
                    this.errorMessage = e.body.message;
                    this.isLoading = false;
               }   
            }
        },
        validationMsg: validationMessage(formMessages)
    },
    // Validação dos campos
    validations: {
        materia: {
            nome: {
                required,
                maxLength: maxLength(255)
            }
        }
    }
}
</script>
