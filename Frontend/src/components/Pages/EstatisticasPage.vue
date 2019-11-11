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
        colors='["#36A2EB", "#FF6384" ]' 
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
            this.donutData = [
                { label: 'Concluídas', value: estatisticas.body.data.atividades.count_concluida },
                { label: 'Não Concluídas', value: estatisticas.body.data.nao_concluidas.count_n_concluida }
            ];
        },
        err => {
          this.errorMessage = "Houve um erro ao carregar as estatísticas!";
        });
    }
}
</script>