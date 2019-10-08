<template>
  <form @submit.prevent.stop="cadastrar()">
    <!-- Avatar do usuário -->
    <div class="uk-grid-small uk-flex-middle" uk-grid>
      <div class="uk-width-auto">
        <img
          id="avatar"
          class="uk-border-circle"
          width="70"
          height="70"
          :src="'static/img/avatar/' + user.avatar"
        />
      </div>
      <!-- Select -->
      <div uk-form-custom="target: > * > span:last-child">
        <select name="avatar" @change="chooseAvatar()" v-model="user.avatar">
          <option selected disabled>Escolha um avatar...</option>
          <option v-for="avatar in avatars" :key="avatar.value" :value="avatar.value">{{avatar.name}}</option>
        </select>
        <span class="uk-link">
          <span uk-icon="icon: pencil"></span>
          <span></span>
        </span>
      </div>
      <!--  -->
      <span v-if="$v.user.avatar.$error" class="error-message">{{validationMsg($v.user.avatar)}}</span>
    </div>

    <!-- Nome do Usuário -->
    <div class="uk-margin">
      <div class="uk-inline uk-width-1-1" :class="{ 'form-group-error': $v.user.nome.$error }">
        <span class="uk-form-icon" uk-icon="icon: user"></span>
        <input class="uk-input" placeholder="Nome" type="text" v-model="user.nome" />
      </div>
      <span v-if="$v.user.nome.$error" class="error-message">{{validationMsg($v.user.nome)}}</span>
    </div>

    <!-- E-mail do usuário -->
    <div class="uk-margin">
      <div class="uk-inline uk-width-1-1" :class="{ 'form-group-error': $v.user.email.$error }">
        <span class="uk-form-icon" uk-icon="icon: mail"></span>
        <input class="uk-input" placeholder="E-mail" type="email" v-model="user.email" />
      </div>
      <span v-if="$v.user.email.$error" class="error-message">{{validationMsg($v.user.email)}}</span>
    </div>

    <!-- Senha -->
    <div class="uk-margin">
      <div class="uk-inline uk-width-1-1" :class="{ 'form-group-error': $v.user.senha.$error }">
        <span class="uk-form-icon" uk-icon="icon: lock"></span>
        <input class="uk-input" placeholder="Senha" type="password" v-model="user.senha" />
      </div>
      <span v-if="$v.user.senha.$error" class="error-message">{{validationMsg($v.user.senha)}}</span>
    </div>

    <!-- Submits -->
    <div class="uk-text-center">
      <button
        :disabled="isLoading || $v.$error"
        type="submit"
        class="uk-button uk-button-primary"
        :class="{ 'btn-loading': isLoading}"
      >
        Cadastrar
        <div v-if="isLoading" class="spinner-loading" uk-spinner="ratio: 0.5"></div>
      </button>
      <slot name="login"></slot>
    </div>
    <!--  -->
  </form>
</template>


<script>
// Imports
import { required, email, maxLength } from "vuelidate/lib/validators";
import { validationMessage } from "vuelidate-messages";

// Mensagens de validação
const formMessages = {
  required: () => "Este campo é obrigatório",
  email: () => "Preencha um e-mail de formato válido"
};

export default {
  // Dados da aplicação
  data: function() {
    return {
      avatars: [
        { name: "Nenhum", value: "none.svg" },
        { name: "Garoto 01", value: "boy1.svg" },
        { name: "Garoto 02", value: "boy2.svg" },
        { name: "Garota 01", value: "girl1.svg" },
        { name: "Garota 02", value: "girl2.svg" },
        { name: "Garota 03", value: "girl3.svg" }
      ],
      user: {
        avatar: "none.svg",
        nome: "",
        email: "",
        senha: ""
      },
      isLoading: false
    };
  },
  // Métodos da aplicação
  methods: {
    cadastrar() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        // do your submit logic here
        this.isLoading = true;
        setTimeout(() => {
          this.isLoading = false;
        }, 2000);
      }
    },
    validationMsg: validationMessage(formMessages)
  },
  // Validação dos campos
  validations: {
    user: {
      avatar: {
        required
      },
      nome: {
        required,
        maxLength: maxLength(255)
      },
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
  }
};
</script>


<style scoped>
</style>