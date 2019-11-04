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

            <form>
                <!-- Tipo da Atividade -->
                <div class="uk-margin">
                    <label class="uk-form-label" for="form-stacked-text">Tipo de Atividade</label>
                    <div class="uk-form-controls">
                        <select class="uk-select" v-model="tipo_atividade" @change="loadCursos()">
                            <option value="1">Atividade Rotina/ Lazer</option>
                            <option value="2">De Curso</option>
                        </select>
                    </div>
                </div>
                <!--  -->

                <!-- Loading para cursos -->
                <div v-if="isLoadingCursos" class="spinner-loading" uk-spinner="ratio: 0.5"></div>

                <!-- Matéria da Atividade -->
                <transition name="fade">
                    <div v-if="showCursos" class="uk-margin">
                        <label class="uk-form-label" for="form-stacked-text">
                            Curso <span class="uk-text-muted">|</span> Matéria
                        </label>
                        <div class="uk-form-controls">
                            <select class="uk-select">
                                <option v-for="curso in cursos" :key="curso.id">Curso 1 | Matéria XX</option>
                            </select>
                        </div>
                    </div>
                </transition>
                <!--  -->
                <!-- Título da Atividade -->
                <div class="uk-margin">
                    <label class="uk-form-label" for="form-stacked-text">Título</label>
                    <div class="uk-form-controls">
                        <input class="uk-input" id="form-stacked-text" type="text"
                            placeholder="Título da atividade">
                    </div>
                </div>
                <!--  -->
                <!-- Descrição da Atividade -->
                <div class="uk-margin">
                    <label class="uk-form-label" for="form-stacked-text">Descrição</label>
                    <div class="uk-form-controls">
                        <textarea class="uk-textarea" rows="5" placeholder="Descrição da atividade"></textarea>
                    </div>
                </div>
                <!--  -->
                <!-- Data de Entrega -->
                <div class="uk-margin">
                    <label class="uk-form-label" for="form-stacked-text">Data de Entrega</label>
                    <div class="uk-form-controls">
                        <input class="uk-input" type="date">
                    </div>
                </div>
                <!--  -->
                <!-- Curso de matérias -->
                <div class="uk-margin">
                    <label class="uk-form-label" for="form-stacked-text">Já foi concluída?</label>
                    <div class="uk-form-controls">
                        <div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                            <label><input class="uk-radio" type="radio" name="radio2" value="s"> Sim</label>
                            <label><input class="uk-radio" type="radio" name="radio2" value="n" checked> Não</label>
                        </div>
                    </div>
                </div>
                <!--  -->
                <!-- Accordions -->
                <ul uk-accordion="multiple: true">
                    <!-- Checklists -->
                    <li id="has_materia">
                        <a class="uk-accordion-title uk-button-accordion-li" href="#">Checklist 1</a>
                        <div class="uk-accordion-content">
                            <ul id="materias" class="uk-list uk-list-striped">
                                <li>
                                    <input checked class="uk-checkbox" type="checkbox">
                                    &nbsp;Teste 1
                                    <span class="uk-align-right i-remove" uk-icon="close"></span>
                                </li>
                                <li>
                                    <input class="uk-checkbox" type="checkbox">
                                    &nbsp;Teste 2
                                    <span class="uk-align-right i-remove" uk-icon="close"></span>
                                </li>
                            </ul>
                            <hr>
                            <!-- Novo Curso -->
                            <input class="uk-input" id="nova_materia" type="text"
                                placeholder="Insira o nome de uma nova matéria">
                            <a class="uk-display-block uk-text-right uk-margin-top">
                                <span class="uk-margin-small-right" uk-icon="plus"></span>
                                Adicionar
                            </a>
                            <!--  -->
                        </div>
                    </li>
                    <!--  -->
                    <hr>
                    <!-- Novo Checklist -->
                    <input class="uk-input" id="nova_materia" type="text" placeholder="Insira o nome do Checklist">
                    <a class="uk-display-block uk-text-right uk-margin-top" onclick="addMateria()">
                        <span class="uk-margin-small-right" uk-icon="plus"></span>
                        Novo Checklist
                    </a>
                    <!--  -->
                </ul>
                <!--  -->
            </form>
        </div>
        <div class="uk-card-footer uk-text-center">
            <button class="uk-button uk-button-primary">Salvar</button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            tipo_atividade: 1,
            errorMessage: null,
            cursos: [],
            isLoadingCursos: false,
            showCursos: false
        }
    },
    methods: {
        async loadCursos() {
            try {
                this.errorMessage = null;
                if(this.tipo_atividade != 1){
                    this.isLoadingCursos = true;
                    // Recupera os tokens
                    let token = this.$session.get('jwt');

                    // Recupera os cursos
                    let response = await this.$http.get(process.env.API_URL + 'curso', {headers: {Authorization: token}});

                    this.cursos = response.body.data;
                    this.showCursos = true;
                    this.isLoadingCursos = false;
                }
                else {
                    this.showCursos = false;
                }
            }
            catch(e){
                this.errorMessage = e.body.message;
                this.isLoadingCursos = false;
                this.tipo_atividade = 1;
                this.showCursos = false;
            } 
        }
    }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active em versões anteriores a 2.1.8 */ {
  opacity: 0;
}
</style>