<template>
  <div
    class="uk-background-blend-soft-light uk-background-black uk-background-cover uk-height-viewport uk-panel uk-flex uk-flex-center uk-flex-middle"
    :data-src="background"
    uk-img>
    <!-- Content da página -->
    <div class="uk-container uk-section">
      <!-- Card de Login -->
      <div
        class="uk-align-center uk-card uk-card-hover uk-card-default uk-width-1-3@l uk-width-1-2@m uk-width-1-2@s"
      >
        <!-- Topo do card -->
        <div class="uk-card-media-top">
          <img :src="logo" alt />
        </div>
        <!--  -->
        <!-- Corpo do card -->
        <div class="uk-card-body">
          <h3 class="uk-card-title uk-margin-remove">Olá!</h3>
          <p class="uk-margin-small">Para continuar organizando suas atividades faça seu login.</p>

          <form-login></form-login>

        </div>
        <!--  -->
      </div>
      <!--  -->
    </div>
    <!--  -->

  </div>
</template>

<style scoped>
.uk-background-black {
  background-color: #444444;
}
.uk-section,
.uk-container {
  padding-bottom: 0;
  padding-top: 0;
}
</style>

<script>
//Imagens
import homeImage from "@/assets/img/home.jpg";
import FormLogin from "@/components/Home/FormLogin";
import logoImage from "@/assets/img/logos/banner1.png";

export default {
  components: {
    "form-login": FormLogin
  },
  data: function() {
    return {
      background: homeImage,
      logo: logoImage,
    };
  }
};
</script>