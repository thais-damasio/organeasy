<template>
  <form @submit.prevent.stop="login()">
    <!-- E-mail do usuário -->
    <div class="uk-margin">
      <div class="uk-inline uk-width-1-1" :class="{ 'form-group-error': $v.user.email.$error }">
        <span class="uk-form-icon" uk-icon="icon: user"></span>
        <input class="uk-input" placeholder="E-mail" type="text" v-model="user.email"/>
      </div>
      <span class="error-message">
        {{validationMsg($v.user.email)}}
      </span>
    </div>
    <!--  -->

    <!-- Senha do usuário -->
    <div class="uk-margin">
      <div class="uk-inline uk-width-1-1" :class="{ 'form-group-error': $v.user.senha.$error }">
        <span class="uk-form-icon" uk-icon="icon: lock"></span>
        <input class="uk-input" placeholder="Senha" type="password" v-model="user.senha" />
      </div>
      <span class="error-message">
        {{validationMsg($v.user.senha)}}
      </span>
    </div>
    <!--  -->

    <!-- Submits -->
    <div class="uk-text-center" >
      <button 
        :disabled="isLoading || $v.$error"
        type="submit"
        class="uk-button uk-button-primary"
        :class="{ 'btn-loading': isLoading}">
        Entrar 
        <div v-if="isLoading" class="spinner-loading" uk-spinner="ratio: 0.5"></div>
      </button>
      <span class="uk-display-block">
        Não tem uma conta? Cadastre-se
        <router-link class="uk-link-muted" to="register.html">aqui</router-link>
      </span>
    </div>
    <!--  -->

  </form>
</template>


<script>
// Imports
import { required, email } from 'vuelidate/lib/validators'
import { validationMessage } from 'vuelidate-messages'

// Mensagens de validação
const formMessages = {
  required: () => 'Este campo é obrigatório',
  email: () => 'Preencha um e-mail de formato válido'
}

export default {
  // Dados da aplicação
  data: function() {
      return {
          user: {
            email: '',
            senha: ''
          },
          isLoading: false
      }
  },
  // Métodos da aplicação
  methods: {
    login() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        // do your submit logic here
        this.isLoading = true;
        setTimeout(() => {
          this.isLoading = false;
        }, 2000)
      }
    },
    validationMsg: validationMessage(formMessages)
  },
  // Validação dos campos
  validations: {
    user: {
      email: {
        required,
        email
      },
      senha: {
        required
      }
    }
  },
};
</script>


<style scoped>
</style>