<template>
    <div>
        <!-- Menu Superior -->
        <div class="uk-grid-column-small uk-child-width-1-2@s uk-child-width-expand@s" uk-grid>
            <!-- Filtro de atividades -->
            <div class="uk-margin uk-inline">
                <label class="uk-margin-small-bottom">
                    <span class="uk-margin-small-right" uk-icon="settings"></span>Filtro
                </label>
                <select class="uk-select" v-model="showAtividades">
                    <option value="curso" selected>Cursos</option>
                    <option value="atividade">Atividades de Rotina</option>
                </select>
            </div>
            <!-- Botões de cadastro -->
            <div class="uk-text-right@s uk-margin-remove-top uk-margin-bottom" uk-margin>
                <router-link :to="{ name: 'criarCurso'}" class="uk-button uk-button-secondary uk-button-small">
                    <span class="uk-margin-small-right" uk-icon="plus"/>Curso
                </router-link >
                <router-link :to="{ name: 'criarAtividade'}" class="uk-button uk-button-primary uk-button-small">
                    <span class="uk-margin-small-right" uk-icon="plus"/>Atividade
                </router-link>
            </div>
        </div>

        <!-- Alerta de erro -->
        <div v-if="errorMessage" class="uk-alert-danger" uk-alert>
            <a class="uk-alert-close" uk-close></a>
            <p>{{errorMessage}}</p>
        </div>        
        
        <div v-if="!isLoadingInitial">
            <!-- Cards de Cursos -->
            <div v-if="showAtividades == 'curso'">
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
                        <router-link :to="{name: 'verCurso', params: {id: curso.id}}" class="uk-button uk-button-primary uk-display-block uk-margin-bottom">Ver</router-link>
                        <router-link :to="{name: 'editarCurso', params: {id: curso.id}}" class="uk-button uk-button-danger uk-display-block">Editar</router-link>
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

            <!-- Cards de Atividades de Lazer -->
            <div v-if="showAtividades == 'atividade'">
                <div v-for="atv in atividadesLazer" :key="atv.id" class="uk-card uk-card-hover uk-card-secondary uk-grid-collapse uk-margin" uk-grid>
                    <div class="uk-card-media-left uk-cover-container uk-width-1-4@s uk-width-1-5@l">
                        <img src="static/img/bicicleta.jpg" alt="" uk-cover>
                        <canvas width="600" height="250"></canvas>
                    </div>
                    <div class="uk-card-body uk-width-1-2@s uk-width-expand@m">
                        <h4 class="uk-card-title">{{atv.atividade.titulo}}</h4>
                        <p>{{atv.atividade.descricao}}</p>
                    </div>
                    <div class="uk-padding-small uk-child-width-expand uk-width-1-4@s uk-width-1-5@m">
                        <router-link :to="{name: 'verAtividadeLazer', params: {id: atv.id}}" class="uk-button uk-button-primary uk-display-block uk-margin-bottom">Ver</router-link>
                        <router-link :to="{name: 'editarAtividadeLazer', params: {id: atv.id}}" class="uk-button uk-button-danger uk-display-block">Editar</router-link>
                    </div>
                </div>
                <!-- Quando não possui nenhuma atividade -->
                <div v-if="atividadesLazer.length == 0" class="uk-card uk-card-body uk-card-default uk-flex uk-flex-center">
                    <div class="uk-text-center">
                        <img src="static/img/books.svg" width="100">
                        <span class="uk-padding-small uk-display-block">
                            Não há nenhum curso cadastrado ainda...
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="uk-text-center uk-spinner-loading">
            <div class="spinner-loading" uk-spinner="ratio: 3"></div>
        </div>

    </div>
</template>

<script>
export default {
  data() {
    return {
      cursos: [],
      atividadesLazer: [],
      isLoadingInitial: true,
      errorMessage: null,
      showAtividades: 'curso'
    }
  },
  created(){
    let token = this.$session.get('jwt');
    // Carrega os cursos
    this.$http.get(process.env.API_URL + 'curso', {headers: {Authorization: token}})
    .then(
      cursos => {
        cursos.body.data.forEach(curso => {
          this.cursos.push(curso);
        });
        this.isLoadingInitial = false;
      },
      err => {
        this.errorMessage = err.body.message;
        this.isLoadingInitial = false;
      });
   
    // Carrega as atividades de rotina
    this.$http.get(process.env.API_URL + 'atividade-lazer', {headers: {Authorization: token}})
    .then(
      atividades => {
        atividades.body.data.forEach(atividadeLazer => {
          this.atividadesLazer.push(atividadeLazer);
        });
      },
      err => {
        this.errorMessage = err.body.message;
      });     
  }
}
</script>