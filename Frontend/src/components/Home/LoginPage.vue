<template>
  <div
    class="uk-background-blend-soft-light uk-background-black uk-background-cover uk-height-viewport uk-panel uk-flex uk-flex-center uk-flex-middle"
    data-src="static/img/home.jpg"
    uk-img
  >
    <!-- Content da página -->
    <div class="uk-container uk-section">
      <!-- Card de Login -->
      <div
        class="uk-align-center uk-card uk-card-hover uk-card-default uk-width-1-3@l uk-width-1-2@m uk-width-1-2@s"
      >
        <!-- Topo do card -->
        <div class="uk-card-media-top">
          <img src="static/img/logos/banner1.png" alt />
        </div>
        <!--  -->
        <!-- Corpo do card -->
        <div class="uk-card-body uk-padding-remove-bottom uk-padding-remove-top uk-margin-small-top">
          <!-- Formulário de login ou cadastro -->
          <router-view>
            <span class="uk-display-block" slot="register">
              Não tem uma conta? Cadastre-se
              <router-link class="uk-link-muted" :to="{ name: 'register'}">aqui</router-link>.
            </span>
            <span class="uk-display-block" slot="login">
              Já possui uma conta? Acesse por
              <router-link class="uk-link-muted" :to="{ name: 'login'}">aqui</router-link>.
            </span>
          </router-view>
          <!--  -->
        </div>

        <!-- Direitors autorais -->
        <div class="uk-padding-small uk-text-center uk-text-muted uk-background-light uk-text-small">
          Icons made by
          <a class="uk-link-muted" href="https://www.flaticon.com/authors/good-ware" title="Good Ware">Good Ware</a> from
          <a class="uk-link-muted" href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
        </div>
        <!--  -->
        <!--  -->
      </div>
      <!--  -->
    </div>
    <!--  -->
  </div>
</template>

<style scoped>
</style>

<script>
//Imagens

export default {
  // Lifecycles
  //Redireciona usuário autenticado
  beforeCreate: function () {
    if (this.$session.exists()) {
      this.$router.push({ name: 'dashboard'})
    }
  }
};
</script>