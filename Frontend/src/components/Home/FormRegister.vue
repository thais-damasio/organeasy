<template>
  <form @submit.prevent.stop="cadastrar()">
    <div v-if="errorMessage" class="uk-alert-danger" uk-alert>
        <a class="uk-alert-close" uk-close></a>
        <p>{{errorMessage}}</p>
    </div>
    
    <!-- Avatar do usuário -->
    <div class="uk-grid-small uk-flex-middle" uk-grid>
      <div class="uk-width-auto">
        <img
          id="avatar"
          class="uk-border-circle"
          width="70"
          height="70"
          :src="'static/img/avatar/' + (user.avatar? user.avatar.path : 'none.svg')"
        />
      </div>
      <!-- Select -->
      <div uk-form-custom="target: > * > span:last-child">
        <select name="avatar" v-model="user.avatar">
          <option selected disabled :value="null">Escolha um avatar...</option>
          <option v-for="avatar in avatars" :key="avatar.id" :value="avatar">{{avatar.nome}}</option>
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
        <input class="uk-input" @blur="validarEmail()" placeholder="E-mail" type="email" v-model="user.email" />
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
        :disabled="isLoading || $v.$error || emailJaExiste"
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
        { id: null, nome: "Nenhum", path: "none.svg" }
      ],
      user: {
        avatar: null,
        nome: "",
        email: "",
        senha: ""
      },
      emailJaExiste: false,
      errorMessage: null,
      isLoading: false
    };
  },
  // Métodos da aplicação
  methods: {
    async validarEmail() {
      try {
        if(this.user.email && !this.$v.user.email.$invalid) {
          let response = await this.$http.post(process.env.API_URL + 'aluno/checkemail', {email: this.user.email});
          if(response.body.success == 'OK'){
            this.emailJaExiste = false;
            this.errorMessage = null;
          }
        }
      }
      catch(e) {
          this.emailJaExiste = true;
          this.errorMessage = e.body.message;
      }
    },
    async cadastrar() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        try {
          this.isLoading = true;
          this.errorMessage = null;

          // Cria o usuário
          this.user.id_avatar = this.user.avatar.id;
          delete this.user.avatar;
          let response = await this.$http.post(process.env.API_URL + 'aluno/create', this.user);
          this.isLoading = false;

          // Armazena a sessão
          this.$session.start();
          this.$session.set('jwt', response.body.token);
          this.$session.set('credential', response.body.user);

          // Redireciona para a página de dashboard
          this.$router.push('dashboard');
        }
        catch(e){
          this.errorMessage = e.body.message;
          this.isLoading = false;
        }   
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
  },
  // Lifecycles
  // Busca dados do usuário logado
  created() {
    this.$http.get(process.env.API_URL + 'avatar')
    .then(
      avatares => {
        avatares.body.data.forEach(avatar => {
          this.avatars.push(avatar);
        });
      },
      err => {
        this.errorMessage = err.body.message;
      });
  },
};
</script>


<style scoped>
</style>