<template>
    <div class="uk-card uk-card-default uk-card-body uk-width-2-3@m uk-align-center uk-text-center">
        <!-- Alerta de erro -->
        <div v-if="errorMessage" class="uk-alert-danger" uk-alert>
            <a class="uk-alert-close" uk-close></a>
            <p>{{errorMessage}}</p>
        </div> 

        <h3 class="uk-card-title">Estatísticas das Atividades</h3>   
        <donut-chart 
        id="donut" 
        v-if="donutData.length > 0"
        :data="donutData" 
        colors='["#30FFD9", "#2CE890", "#34E82C", "#E8441C", "#E81C5F", "#FF6B1F" ]' 
        resize="true"
        class="uk-align-center">
        </donut-chart>
        <div v-else>
            Nenhuma atividade para este mês
        </div>
    </div>
</template>

<script>
import Raphael from 'raphael/raphael'
global.Raphael = Raphael
import 'expose-loader?$!expose-loader?jQuery!jquery'
import { DonutChart } from 'vue-morris'

export default {
    data() {
        return {
            errorMessage: null,
            donutData: []
        }
    },
    components: {
        'donut-chart': DonutChart
    },
    created() {
      let hoje = new Date(Date.now());
      let mes = hoje.getMonth() + 1;
      let ano = hoje.getFullYear();
      let token = this.$session.get('jwt');

      this.$http.get(process.env.API_URL + `atividade/estatisticas/${mes}/${ano}`, {headers: {Authorization: token}}).
      then(
        estatisticas => {
            // Concluídas
            let lazer = estatisticas.body.data.concluidas.lazer.count_concluida;
            let materia = estatisticas.body.data.concluidas.materia.count_concluida;
            let curso = estatisticas.body.data.concluidas.curso.count_concluida;
            // Não Concluídas
            let n_lazer = estatisticas.body.data.nao_concluidas.lazer.count_n_concluida;
            let n_materia = estatisticas.body.data.nao_concluidas.materia.count_n_concluida;
            let n_curso = estatisticas.body.data.nao_concluidas.curso.count_n_concluida;

            if(lazer > 0 ||
               n_lazer > 0 ||
               materia > 0 ||
               n_materia > 0 ||
               curso > 0 ||
               n_curso > 0
               )
                this.donutData = [
                    { label: 'Concluídas de Lazer',  value: lazer},
                    { label: 'Concluídas de Matéria',  value: materia},
                    { label: 'Concluídas de Curso',  value: curso},
                    { label: 'Não Concluídas de Lazer', value: n_lazer },
                    { label: 'Não Concluídas de Matéria', value: n_materia },
                    { label: 'Não Concluídas de Curso', value: n_curso }
                ];
        },
        err => {
          this.errorMessage = "Houve um erro ao carregar as estatísticas!";
        });
    }
}
</script>