<template>
    <div class="uk-card uk-card-default uk-width-4-5@m uk-align-center">
        <!-- Header -->
        <div class="uk-card-header">
            <h3 class="uk-card-title uk-margin-remove-bottom">Novo Curso</h3>
        </div>
        <!--  -->
        <form @submit.prevent.stop="cadastrarCurso()">
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
                <!-- Curso de matérias -->
                <div class="uk-margin">
                    <label class="uk-form-label">Curso com matéria?</label>
                    <div class="uk-form-controls">
                        <div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                            <label><input class="uk-radio" type="radio" v-model="curso.tem_materias" :value="true"> Sim</label>
                            <label><input class="uk-radio" type="radio"  v-model="curso.tem_materias" :value="false"> Não</label>
                        </div>
                        <span v-if="$v.curso.tem_materias.$error" class="error-message">{{validationMsg($v.curso.tem_materias)}}</span>
                    </div>
                </div>
                <!--  -->
                <!-- Lista de Matérias -->
                <ul v-if="curso.tem_materias" uk-accordion>
                    <li>
                        <a class="uk-accordion-title uk-button-accordion-li uk-background-muted uk-padding-small" href="#">
                            Matérias <span class="uk-text-small uk-text-muted">(Opcional)</span>
                        </a>
                        <div class="uk-accordion-content">
                            <ul v-if="curso.materias.length > 0" class="uk-list uk-list-striped">
                                <li v-for="(materia, index) in curso.materias" :key="index">
                                    <span class="i-remove" @click="removeMateria(index)" uk-icon="close" uk-tooltip="Apagar"></span>&emsp;
                                    {{materia.nome}}
                                </li>
                            </ul>
                            <ul v-else class="uk-list uk-list-striped">
                                <li>Nenhuma matéria inserida</li>
                            </ul>
                            <hr>
                            <!-- Nova Matéria -->
                            <input class="uk-input" type="text" v-model="materiaParam.nome"
                                placeholder="Insira o nome de uma nova matéria">
                            <a class="uk-display-block uk-text-right uk-margin-top" @click="addMateria()">
                                <span class="uk-margin-small-right" uk-icon="plus"></span>
                                Adicionar
                            </a>
                            <!--  -->
                        </div>
                    </li>
                </ul>
                <!--  -->
            </div>
            <div class="uk-card-footer uk-text-center">
                <button :disabled="isLoading || $v.$error || registerCurso" type="submit" class="uk-button uk-button-primary">
                    Salvar
                    <div v-if="isLoading" class="spinner-loading" uk-spinner="ratio: 0.5"></div>
                </button>
            </div>
        </form>
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
            curso: {
                nome: '',
                tem_materias: false,
                materias: []
            },
            registerCurso: false,
            isLoading: false,
            errorMessage: null,
            materiaParam: {
                nome: ''
            }
        }
    },
    methods: {
        async cadastrarCurso() {
            this.$v.$touch();
            if (!this.$v.$invalid && !this.registerCurso) {
                try {
                    this.isLoading = true;
                    this.errorMessage = null;

                    // Recupera o token
                    let token = this.$session.get('jwt');
                    let curso = {
                        nome: this.curso.nome,
                        tem_materias: this.curso.tem_materias,
                    }

                    // Salva os cursos e as matérias
                    let response = await this.$http.post(process.env.API_URL + 'curso/create', curso, {headers: {Authorization: token}});
                    this.registerCurso = true;

                    for(let i = 0; i < this.curso.materias.length; i++){
                        let materia = this.curso.materias[i];
                        materia.id_curso = response.body.data.id;
                        await this.$http.post(process.env.API_URL + 'materia/create', materia, {headers: {Authorization: token}});
                    };

                    // Redireciona para a página de dashboard
                    this.$router.push({ name: 'verCurso', params: {id: response.body.data.id}});
                }
                catch(e){
                    if(this.registerCurso){
                        this.errorMessage = "O curso foi salvo, porém ocorreu um erro aos salvar as matérias. Error: ";
                        this.errorMessage = this.errorMessage + e.body.message;
                    }
                    else {
                        this.errorMessage = e.body.message;
                    }
                    this.isLoading = false;
               }   
            }
        },
        addMateria(){
            this.curso.materias.push({nome: this.materiaParam.nome});
            this.materiaParam.nome = null;
        },
        removeMateria(id) {
            this.curso.materias.splice(id, 1);
        },
        validationMsg: validationMessage(formMessages)
    },
    // Validação dos campos
    validations: {
        curso: {
            nome: {
                required,
                maxLength: maxLength(255)
            },
            tem_materias: {
                required
            }
        }
    }
}
</script>
