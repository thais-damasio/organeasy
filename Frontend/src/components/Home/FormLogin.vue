<template>
  <div>
    <h3 class="uk-card-title uk-margin-remove">Olá!</h3>
    <p class="uk-margin-small">Para continuar organizando suas atividades faça seu login.</p>
    <form @submit.prevent.stop="login()">

      <!-- E-mail do usuário -->
      <div class="uk-margin">
        <div class="uk-inline uk-width-1-1" :class="{ 'form-group-error': $v.user.email.$error }">
          <span class="uk-form-icon" uk-icon="icon: user"></span>
          <input class="uk-input" placeholder="E-mail" type="text" v-model="user.email"/>
        </div>
        <span v-if="$v.user.email.$error" class="error-message">
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
        <span v-if="$v.user.senha.$error" class="error-message">
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
        <slot name="register"></slot>
      </div>
      <!--  -->

    </form>
  </div>
</template>


<script>
// Imports
import { required, email, maxLength } from 'vuelidate/lib/validators'
import { validationMessage } from 'vuelidate-messages'

// Mensagens de validação
const formMessages = {
  required: () => 'Este campo é obrigatório.',
  email: () => 'Preencha um e-mail de formato válido.',
  maxLength: ({ $params }) => `O campo deve conter no máximo ${$params.maxLength.max} carcateres.`

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
        email,
        maxLength: maxLength(255)
      },
      senha: {
        required,
        maxLength: maxLength(255)
      }
    }
  },
};
</script>


<style scoped>
</style>