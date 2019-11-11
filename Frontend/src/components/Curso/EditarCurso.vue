<template>
    <div v-if="!isLoadingInitial" class="uk-card uk-card-default uk-width-4-5@m uk-align-center">
        <!-- Header -->
        <div class="uk-card-header">
            <div v-if="curso">
                <h3 class="uk-card-title uk-margin-remove-bottom">Editar</h3>
                <small>Editando: {{curso.nome}}</small>
            </div>
        </div>
        <!--  -->
        <form @submit.prevent.stop="editarCurso()" v-if="curso">
            <div class="uk-card-body">
                <!-- Alerta de erro -->
                <div v-if="errorMessage" class="uk-alert-danger" uk-alert>
                    <a class="uk-alert-close" uk-close></a>
                    <p>{{errorMessage}}</p>
                </div>
                
                <!-- Nome do curso -->
                <div class="uk-margin">
                    <label class="uk-form-label">Nome</label>
                    <div class="uk-form-controls" :class="{ 'form-group-error': $v.curso.nome.$error }">
                        <input class="uk-input" v-model="curso.nome" type="text" placeholder="Nome do curso">
                    </div>
                    <span v-if="$v.curso.nome.$error" class="error-message">{{validationMsg($v.curso.nome)}}</span>
                </div>
                <!--  -->
                <!-- Lista de Matérias -->
                <ul v-if="curso.tem_materias" uk-accordion>
                    <li class="uk-open">
                        <a class="uk-accordion-title uk-button-accordion-li uk-background-muted uk-padding-small" href="#">
                            Matérias <span class="uk-text-small uk-text-muted">(Opcional)</span>
                        </a>
                        <div class="uk-accordion-content">
                            <ul v-if="curso.materias.length > 0" class="uk-list uk-list-striped">
                                <li v-for="(materia, index) in curso.materias" :key="materia.id">
                                    <div uk-grid>
                                        <div class="uk-width-1-6">
                                            <span class="i-remove" @click="apagarMateria(index, materia.id)" uk-icon="close" uk-tooltip="Apagar"></span>&emsp;
                                        </div>
                                        <div class="uk-width-2-3">
                                            <input class="uk-input" type="text" v-model="materia.nome"
                                                placeholder="Insira o nome da matéria">
                                        </div>
                                        <div class="uk-width-1-6">
                                            <span class="i-save" @click="editarMateria(materia.id, materia.nome)" uk-icon="pencil" uk-tooltip="Editar"></span>&emsp;
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <ul v-else class="uk-list uk-list-striped">
                                <li>Nenhuma matéria inserida</li>
                            </ul>
                            <div v-if="isLoadingMateria" class="spinner-loading" uk-spinner="ratio: 0.5"></div>
                            <hr>
                            <!-- Nova Matéria -->
                            <input class="uk-input" type="text" v-model="materiaParam.nome"
                                placeholder="Insira o nome de uma nova matéria">
                            <a class="uk-display-block uk-text-right uk-margin-top" @click="addMateria()">
                                <span class="uk-margin-small-right" uk-icon="plus"></span>
                                Adicionar
                            </a>
                            <div v-if="isLoadingCreate" class="spinner-loading" uk-spinner="ratio: 0.5"></div>
                            <!--  -->
                        </div>
                    </li>
                </ul>
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
            Curso não encontrado
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
            curso: {},
            isLoading: false,
            isLoadingInitial: true,
            isLoadingMateria: false,
            isLoadingCreate: false,
            errorMessage: null,
            materiaParam: {
                nome: ''
            }
        }
    },
    props: ['id'],
    created() {
        let token = this.$session.get('jwt');
        // Carrega os cursos
        this.$http.get(process.env.API_URL + 'curso/get/' + this.id, {headers: {Authorization: token}})
        .then(
        curso => {
            this.curso = curso.body;
            this.isLoadingInitial = false;
        },
        err => {
            this.errorMessage = err.body.message;
            this.isLoadingInitial = false;
        });
    },
    methods: {
        async editarCurso() {
            this.$v.$touch();
            if (!this.$v.$invalid && !this.registerCurso) {
                try {
                    this.isLoading = true;
                    this.errorMessage = null;

                    // Recupera o token
                    let token = this.$session.get('jwt');
                    let curso = {
                        nome: this.curso.nome
                    }

                    // Salva os cursos e as matérias
                    let response = await this.$http.put(process.env.API_URL + 'curso/update/' + this.id, curso, {headers: {Authorization: token}});

                    this.isLoading = false;
                    // Redireciona para a página de dashboard
                    this.$router.push({ name: 'verCurso', params: {id: this.id}});
                }
                catch(e){
                    this.errorMessage = e.body.message;
                    this.isLoading = false;
               }   
            }
        },
        async editarMateria(materia_id, materia_nome){
            try {
                this.isLoadingMateria = true;

                // Recupera o token
                let token = this.$session.get('jwt');
                let materia = {
                    nome: materia_nome
                }

                // Salva os cursos e as matérias
                let response = await this.$http.put(process.env.API_URL + 'materia/update/' + materia_id, materia, {headers: {Authorization: token}});

                this.isLoadingMateria = false;
                UIkit.notification({
                    message: '<span uk-icon=\'icon: check\'></span> Matéria Editada!',
                    status: 'success',
                    pos: 'bottom-right'
                })
            }
            catch(e){
                UIkit.notification({
                    message: '<span uk-icon=\'icon: warning\'></span> Erro ao editar a matéria!',
                    status: 'danger',
                    pos: 'bottom-right'
                })
                this.isLoadingMateria = false;
            } 
        },
        async apagarMateria(index, materia_id) {
            try {
                this.isLoadingMateria = true;

                // Recupera o token
                let token = this.$session.get('jwt');

                // Salva os cursos e as matérias
                let response = await this.$http.delete(process.env.API_URL + 'materia/delete/' + materia_id, {headers: {Authorization: token}});

                this.isLoadingMateria = false;
                this.curso.materias.splice(index, 1);
                UIkit.notification({
                    message: '<span uk-icon=\'icon: check\'></span> Matéria Apagada!',
                    status: 'success',
                    pos: 'bottom-right'
                })
            }
            catch(e){
                UIkit.notification({
                    message: '<span uk-icon=\'icon: warning\'></span> Erro ao tentar apagar a matéria!',
                    status: 'danger',
                    pos: 'bottom-right'
                })
                this.isLoadingMateria = false;
            } 
        },
        async addMateria(){
            try {
                if(this.materiaParam.nome) {
                    this.isLoadingMateria = true;

                    // Recupera o token
                    let token = this.$session.get('jwt');
                    let materia = {
                        id_curso: this.curso.id,
                        nome: this.materiaParam.nome
                    }

                    // Salva os cursos e as matérias
                    let response = await this.$http.post(process.env.API_URL + 'materia/create/', materia, {headers: {Authorization: token}});

                    this.isLoadingMateria = false;
                    this.materiaParam.nome = "";
                    this.curso.materias.push(materia);
                    UIkit.notification({
                        message: '<span uk-icon=\'icon: check\'></span> Matéria Salva!',
                        status: 'success',
                        pos: 'bottom-right'
                    })
                }
            }
            catch(e){
                UIkit.notification({
                    message: '<span uk-icon=\'icon: warning\'></span> Erro ao salvar a matéria!',
                    status: 'danger',
                    pos: 'bottom-right'
                })
                this.isLoadingMateria = false;
            } 
        },
        removeMateria(id) {
        },
        validationMsg: validationMessage(formMessages)
    },
    // Validação dos campos
    validations: {
        curso: {
            nome: {
                required,
                maxLength: maxLength(255)
            }
        }
    }
}
</script>
