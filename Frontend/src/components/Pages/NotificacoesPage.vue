<template>
    <div>
        <!-- Alerta de erro -->
        <div v-if="errorMessage" class="uk-alert-danger" uk-alert>
            <a class="uk-alert-close" uk-close></a>
            <p>{{errorMessage}}</p>
        </div>  

        <!-- Notificações -->
        <ul uk-accordion class="uk-background-muted">
            <li class="uk-open">
                <!-- Para hoje -->
                <a class="uk-accordion-title uk-button-accordion uk-padding-small uk-background-secondary uk-text-white" href="#">Notificações</a>
                <div class="uk-accordion-content">
                    <ul class="uk-list uk-list-striped">
                        <!-- Lista de Notificações -->
                        <li v-for="notification in notifications" :key="notification.id">
                            <router-link :to="{name: notification.route, params: {id: notification.id}}">
                                <span class="uk-text-middle" uk-icon="icon: bell"></span>
                                <span class="uk-text-middle">{{notification.message}}</span>
                                <div class="uk-margin-remove uk-align-right uk-text-light">
                                    <span>Para hoje...</span>
                                    <span class="" uk-icon="icon: clock">
                                    </span>
                                </div>
                            </router-link>
                        </li>
                        <!--  -->
                    </ul>
                </div>
                <!--  -->
            </li>
        </ul>
        <!--  -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            notifications: [],
            errorMessage: null
        }
    },
    created() {
      let hoje = new Date(Date.now());
      let token = this.$session.get('jwt');

      this.$http.get(process.env.API_URL + "atividade/today/" + hoje.toDateString(), {headers: {Authorization: token}}).
      then(
        notificacoes => {
          notificacoes.body.data.atividadesLazer.forEach(atv => {
            this.notifications.push({id: atv.atividadesLazer[0].id, route: "verAtividadeLazer", message: atv.titulo});
          });
          notificacoes.body.data.atividadesCurso.forEach(atv => {
            this.notifications.push({id: atv.atividadesCurso[0].id, route: "verAtividadeCurso", message: atv.titulo});
          });
          notificacoes.body.data.atividadesMateria.forEach(atv => {
            this.notifications.push({id: atv.atividadesMateria[0].id, route: "verAtividadeMateria", message: atv.titulo});
          });
        },
        err => {
          this.errorMessage = "Houve um erro ao carregar as notificações!";
        });
    }
}
</script>