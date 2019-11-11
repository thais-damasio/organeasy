<template>
    <div class="uk-card uk-card-default uk-width-4-5@m uk-align-center">
        <!-- Header -->
        <div class="uk-card-header">
            <h3 class="uk-card-title uk-margin-remove-bottom">Nova Atividade</h3>
        </div>
        <!--  -->
        <div class="uk-card-body">
            <!-- Alerta de erro -->
            <div v-if="errorMessage" class="uk-alert-danger" uk-alert>
                <a class="uk-alert-close" uk-close></a>
                <p>{{errorMessage}}</p>
            </div>

            <form @submit.prevent.stop="cadastrarAtividade()">
                <!-- Tipo da Atividade -->
                <div class="uk-margin">
                    <label class="uk-form-label">Tipo de Atividade</label>
                    <div class="uk-form-controls">
                        <select class="uk-select" v-model="tipo_atividade" @change="loadSelect()">
                            <option value="1" selected>Atividade Rotina/ Lazer</option>
                            <option value="2">De Curso</option>
                            <option value="3">De Matéria</option>
                        </select>
                    </div>
                </div>
                <!--  -->

                <!-- Loading para cursos -->
                <div v-if="isLoadingCursos" class="spinner-loading" uk-spinner="ratio: 0.5"></div>
                <!-- Loading para cursos -->
                <div v-if="isLoadingMaterias" class="spinner-loading" uk-spinner="ratio: 0.5"></div>

                <!-- Curso da Atividade -->
                <transition name="fade">
                    <div v-if="showCursos">
                        <!-- Curso associado a atividade -->
                        <div class="uk-margin">
                            <label class="uk-form-label">
                                Curso
                            </label>
                            <div class="uk-form-controls">
                                <select class="uk-select" v-model="atividade.id_curso" :class="{ 'form-group-error': $v.atividade.id_curso.$error }">
                                    <option :value="null" selected>-- Selecione um curso --</option>
                                    <option v-for="curso in cursos" :key="curso.id" :value="curso.id" v-if="!curso.tem_materias">
                                        {{curso.nome}}
                                    </option>
                                </select>
                            </div>
                            <span v-if="$v.atividade.id_curso.$error" class="error-message">{{validationMsg($v.atividade.id_curso)}}</span>
                        </div>
                        <!-- Se tem pontos -->
                        <div class="uk-margin">
                            <label class="uk-form-label">É uma atividade com pontuação?</label>
                            <div class="uk-form-controls">
                                <div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                                    <label>
                                        <input class="uk-radio" type="radio" v-model="atividade.tem_pontos" :value="true"> Sim
                                    </label>
                                    <label>
                                        <input class="uk-radio" type="radio" v-model="atividade.tem_pontos" :value="false"> Não
                                    </label>
                                </div>
                            </div>
                            <span v-if="$v.atividade.tem_pontos.$error" class="error-message">{{validationMsg($v.atividade.tem_pontos)}}</span>
                        </div>
                        <!--  -->
                        <!-- Valor -->
                        <div class="uk-margin" v-if="atividade.tem_pontos">
                            <label class="uk-form-label">Valor <small class="uk-text-muted">(Opcional)</small></label>
                            <div class="uk-form-controls">
                                <input class="uk-input" type="text" placeholder="Valor em pontuação da atividade" v-model="atividade.valor" :class="{ 'form-group-error': $v.atividade.valor.$error }">
                            </div>
                            <span v-if="$v.atividade.valor.$error" class="error-message">{{validationMsg($v.atividade.valor)}}</span>
                        </div>
                        <!--  -->
                        <!-- Valor ganho -->
                        <div class="uk-margin" v-if="atividade.tem_pontos">
                            <label class="uk-form-label">Valor Ganho <small class="uk-text-muted">(Opcional)</small></label>
                            <div class="uk-form-controls">
                                <input class="uk-input" type="text" placeholder="Valor ganho das pontuações" v-model="atividade.valor_ganho" :class="{ 'form-group-error': $v.atividade.valor_ganho.$error }">
                            </div>
                            <span v-if="$v.atividade.valor_ganho.$error" class="error-message">{{validationMsg($v.atividade.valor_ganho)}}</span>
                        </div>
                        <!--  -->
                    </div>
                </transition>
                <!--  -->

                <!-- Matéria da Atividade -->
                <transition name="fade">
                    <div v-if="showMaterias">
                        <!-- Materia associada a atividade -->
                        <div class="uk-margin">
                            <label class="uk-form-label">
                                Curso <span class="uk-text-muted">|</span> Matéria
                            </label>
                            <div class="uk-form-controls">
                                <select class="uk-select" v-model="atividade.id_materia" :class="{ 'form-group-error': $v.atividade.id_materia.$error }">
                                    <option :value="null" selected>-- Selecione uma matéria --</option>
                                    <option v-for="materia in materias" :key="materia.id" :value="materia.id" >
                                        {{materia.curso.nome}} | {{materia.nome}}</option>
                                </select>
                            </div>
                            <span v-if="$v.atividade.id_materia.$error" class="error-message">{{validationMsg($v.atividade.id_materia)}}</span>
                        </div>
                        <!-- Se tem pontos -->
                        <div class="uk-margin">
                            <label class="uk-form-label">É uma atividade com pontuação?</label>
                            <div class="uk-form-controls">
                                <div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                                    <label>
                                        <input class="uk-radio" type="radio" v-model="atividade.tem_pontos" :value="true"> Sim
                                    </label>
                                    <label>
                                        <input class="uk-radio" type="radio" v-model="atividade.tem_pontos" :value="false"> Não
                                    </label>
                                </div>
                            </div>
                            <span v-if="$v.atividade.tem_pontos.$error" class="error-message">{{validationMsg($v.atividade.tem_pontos)}}</span>
                        </div>
                        <!--  -->
                        <!-- Valor -->
                        <div class="uk-margin" v-if="atividade.tem_pontos">
                            <label class="uk-form-label">Valor <small class="uk-text-muted">(Opcional)</small></label>
                            <div class="uk-form-controls">
                                <input class="uk-input" type="text" placeholder="Valor em pontuação da atividade" v-model="atividade.valor" :class="{ 'form-group-error': $v.atividade.valor.$error }">
                            </div>
                            <span v-if="$v.atividade.valor.$error" class="error-message">{{validationMsg($v.atividade.valor)}}</span>
                        </div>
                        <!--  -->
                        <!-- Valor ganho -->
                        <div class="uk-margin" v-if="atividade.tem_pontos">
                            <label class="uk-form-label">Valor Ganho <small class="uk-text-muted">(Opcional)</small></label>
                            <div class="uk-form-controls">
                                <input class="uk-input" type="text" placeholder="Valor ganho da pontuação" v-model="atividade.valor_ganho" :class="{ 'form-group-error': $v.atividade.valor_ganho.$error }">
                            </div>
                            <span v-if="$v.atividade.valor_ganho.$error" class="error-message">{{validationMsg($v.atividade.valor_ganho)}}</span>
                        </div>
                        <!--  -->
                    </div>
                </transition>
                <!--  -->

                <!-- Título da Atividade -->
                <div class="uk-margin">
                    <label class="uk-form-label">Título</label>
                    <div class="uk-form-controls">
                        <input class="uk-input" type="text" placeholder="Título da atividade" v-model="atividade.titulo" :class="{ 'form-group-error': $v.atividade.titulo.$error }">
                    </div>
                    <span v-if="$v.atividade.titulo.$error" class="error-message">{{validationMsg($v.atividade.titulo)}}</span>
                </div>
                <!--  -->
                <!-- Descrição da Atividade -->
                <div class="uk-margin">
                    <label class="uk-form-label">Descrição</label>
                    <div class="uk-form-controls">
                        <textarea class="uk-textarea" v-model="atividade.descricao" rows="5" placeholder="Descrição da atividade" :class="{ 'form-group-error': $v.atividade.descricao.$error }"></textarea>
                    </div>
                    <span v-if="$v.atividade.descricao.$error" class="error-message">{{validationMsg($v.atividade.descricao)}}</span>
                </div>
                <!--  -->
                <!-- Data de Realização -->
                <div class="uk-margin">
                    <label class="uk-form-label">Data de Realização <small class="uk-text-muted">(Opcional)</small></label>
                    <div class="uk-form-controls">
                        <input class="uk-input" type="date" v-model="atividade.data_entrega" :class="{ 'form-group-error': $v.atividade.data_entrega.$error }">
                    </div>
                    <span v-if="$v.atividade.data_entrega.$error" class="error-message">{{validationMsg($v.atividade.data_entrega)}}</span>
                </div>
                <!--  -->
                <!-- Se foi concluída -->
                <div class="uk-margin">
                    <label class="uk-form-label">Já foi concluída?</label>
                    <div class="uk-form-controls">
                        <div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                            <label>
                                <input class="uk-radio" type="radio" v-model="atividade.concluida" :value="true"> Sim
                            </label>
                            <label>
                                <input class="uk-radio" type="radio" v-model="atividade.concluida" :value="false"> Não
                            </label>
                        </div>
                    </div>
                    <span v-if="$v.atividade.concluida.$error" class="error-message">{{validationMsg($v.atividade.concluida)}}</span>
                </div>
                <!--  -->

                <!-- Submit -->
                <div class="uk-card-footer uk-text-center">
                    <button :disabled="isLoading || $v.$error" type="submit" class="uk-button uk-button-primary">
                        Salvar
                        <div v-if="isLoading" class="spinner-loading" uk-spinner="ratio: 0.5"></div>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
// Imports
import { required, requiredIf, maxLength } from "vuelidate/lib/validators";
import { validationMessage } from "vuelidate-messages";

// Mensagens de validação
const formMessages = {
  required: () => "Este campo é obrigatório"
};

export default {
    data(){
        return {
            tipo_atividade: 1,
            errorMessage: null,
            cursos: [],
            materias: [],
            isLoading: false,
            isLoadingCursos: false,
            isLoadingMaterias: false,
            showCursos: false,
            showMaterias: false,
            atividade: {
                // dados gerais
                titulo: "",
                descricao: "",
                concluida: false,
                data_entrega: "",
                // para atividade de curso e materia
                id_curso: null,
                id_materia: null,
                tem_pontos: false,
                valor: null,
                valor_ganho: null,
            }
        }
    },
    methods: {
        async cadastrarAtividade() {
            this.$v.$touch();
            if (!this.$v.$invalid) {
                try {
                    this.isLoading = true;
                    this.errorMessage = null;

                    // Recupera o token
                    let token = this.$session.get('jwt');
                    let atividade = {
                        titulo: this.atividade.titulo,
                        descricao: this.atividade.descricao,
                        concluida: this.atividade.concluida          
                    }
                    if(this.atividade.data_entrega)
                        atividade.data_entrega = this.atividade.data_entrega;

                    // para atividade de curso e materia
                    if(this.tipo_atividade != 1) {
                        atividade.tem_pontos = this.atividade.tem_pontos;
                        if(this.atividade.valor)
                            atividade.valor = this.atividade.valor;
                        if(this.atividade.valor_ganho)
                            atividade.valor_ganho = this.atividade.valor_ganho;
                        if(this.tipo_atividade == 2){
                            atividade.id_curso = this.atividade.id_curso;
                            atividade = await this.$http.post(process.env.API_URL + 'atividade-curso/create', atividade, {headers: {Authorization: token}});
                        }
                        else{
                            atividade.id_materia = this.atividade.id_materia;
                            atividade = await this.$http.post(process.env.API_URL + 'atividade-materia/create', atividade, {headers: {Authorization: token}});
                        }
                    }
                    else {
                        atividade = await this.$http.post(process.env.API_URL + 'atividade-lazer/create', atividade, {headers: {Authorization: token}});
                    }

                    // Redireciona para a página de dashboard
                    if(this.tipo_atividade == 1)
                        this.$router.push({ name: 'verAtividadeLazer', params: {id: atividade.body.data.atividadesLazer[0].id}});
                    else if(this.tipo_atividade == 2)
                        this.$router.push({ name: 'verAtividadeCurso', params: {id: atividade.body.data.atividadesCurso[0].id}});
                    else
                        this.$router.push({ name: 'verAtividadeMateria', params: {id: atividade.body.data.atividadesMateria[0].id}});
                }
                catch(e){
                    this.errorMessage = e.body.message;
                    this.isLoading = false;
                }  
            }
        },
        loadSelect() {
            if(this.tipo_atividade == 2)
                this.loadCursos();
            else if(this.tipo_atividade == 3)
                this.loadMaterias();
            else {
                this.showCursos = false;
                this.showMaterias = false;
            }
        },
        async loadCursos() {
            try {
                this.errorMessage = null;
                this.isLoadingCursos = true;
                // Recupera os tokens
                let token = this.$session.get('jwt');

                // Recupera os cursos
                let response = await this.$http.get(process.env.API_URL + 'curso', {headers: {Authorization: token}});

                this.cursos = response.body.data;
                this.showMaterias = false;
                this.showCursos = true;
                this.isLoadingCursos = false;
            }
            catch(e){
                this.errorMessage = e.body.message;
                this.isLoadingCursos = false;
                this.tipo_atividade = 1;
                this.showCursos = false;
            } 
        },
        async loadMaterias() {
            try {
                this.errorMessage = null;
                this.isLoadingMaterias = true;
                // Recupera os tokens
                let token = this.$session.get('jwt');

                // Recupera os materias
                let response = await this.$http.get(process.env.API_URL + 'materia', {headers: {Authorization: token}});

                this.materias = response.body.data;
                this.showCursos = false;
                this.showMaterias = true;
                this.isLoadingMaterias = false;
            }
            catch(e){
                this.errorMessage = e.body.message;
                this.isLoadingMaterias = false;
                this.tipo_atividade = 1;
                this.showMaterias = false;
            } 
        },
        validationMsg: validationMessage(formMessages)
    },
    // Validação dos campos
    validations: {
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
            concluida: { },
            data_entrega: { },
            // para atividade de curso e materia
            id_curso: { 
                required: requiredIf(function (nestedModel) {
                    return this.tipo_atividade == 2;
                })
            },
            id_materia: { 
                required: requiredIf(function () {
                    return this.tipo_atividade == 3;
                })
            },
            tem_pontos: { 
                required: requiredIf(function () {
                    return this.tipo_atividade != 1;
                })
            },
            valor: { },
            valor_ganho: { }
        }
    }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .7s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active em versões anteriores a 2.1.8 */ {
  opacity: 0;
}
</style>