<template>
    <div>
        <!-- Menu Superior -->
        <div class="uk-grid-column-small uk-child-width-1-2@s uk-child-width-expand@s" uk-grid>
            <!-- Filtro de atividades -->
            <div class="uk-margin uk-inline">
                <label class="uk-margin-small-bottom">
                    <span class="uk-margin-small-right" uk-icon="settings"></span>Filtro
                </label>
                <select class="uk-select">
                    <option selected>Cursos</option>
                    <option>Atividades de Rotina</option>
                </select>
            </div>
            <!-- Botões de cadastro -->
            <div class="uk-text-right@s" uk-margin>
                <router-link :to="{ name: 'createCurso'}" class="uk-button uk-button-secondary uk-button-small">
                    <span class="uk-margin-small-right" uk-icon="plus"/>Curso
                </router-link >
                <router-link :to="{ name: 'createAtividade'}" class="uk-button uk-button-primary uk-button-small">
                    <span class="uk-margin-small-right" uk-icon="plus"/>Atividade
                </router-link>
            </div>
        </div>

        <!-- Alerta de erro -->
        <div v-if="errorMessage" class="uk-alert-danger" uk-alert>
            <a class="uk-alert-close" uk-close></a>
            <p>{{errorMessage}}</p>
        </div>        
        
        <!-- Cards de Atividade e Cursos -->
        <div v-for="curso in cursos" :key="curso.id" class="uk-card uk-card-hover uk-card-secondary uk-grid-collapse uk-margin" uk-grid>
            <div class="uk-card-media-left uk-cover-container uk-width-1-4@s uk-width-1-5@l">
                <img src="static/img/biblioteca.jpg" alt="" uk-cover>
                <canvas width="600" height="250"></canvas>
            </div>
            <div class="uk-card-body uk-width-1-2@s uk-width-expand@m">
                <h4 class="uk-card-title">{{curso.nome}}</h4>
                <p v-if="curso.tem_materias">
                    <b>Matérias: </b> {{curso.materias.length}}
                </p>
                <p v-else>
                    <b>Atividades: </b> {{curso.atividadesCurso.length}}
                </p>
            </div>
            <div class="uk-padding-small uk-child-width-expand uk-width-1-4@s uk-width-1-5@m">
                <button class="uk-button uk-button-primary uk-display-block uk-margin-bottom">Ver</button>
                <button class="uk-button uk-button-danger uk-display-block">Editar</button>
            </div>
        </div>
        <!-- Quando não possui nenhum curso -->
        <div v-if="cursos.length == 0" class="uk-card uk-card-body uk-card-default uk-flex uk-flex-center">
            <div class="uk-text-center">
                <img src="static/img/books.svg" width="100">
                <span class="uk-padding-small uk-display-block">
                    Não há nenhum curso cadastrado ainda...
                </span>
            </div>
        </div>

    </div>
</template>

<script>
export default {
  data() {
    return {
      cursos: [],
      errorMessage: null
    }
  },
  created(){
    let token = this.$session.get('jwt');
    this.$http.get(process.env.API_URL + 'curso', {headers: {Authorization: token}})
    .then(
      cursos => {
        cursos.body.data.forEach(curso => {
          this.cursos.push(curso);
        });
      },
      err => {
        this.errorMessage = err.body.message;
      });
  }
}
</script>