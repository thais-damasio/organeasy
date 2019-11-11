<template>
    <div v-if="!isLoadingInitial" class="uk-card uk-card-default uk-width-4-5@m uk-align-center">
        <!-- Header -->
        <div class="uk-card-header">
            <!-- Alerta de erro -->
            <div v-if="errorMessage" class="uk-alert-danger" uk-alert>
                <a class="uk-alert-close" uk-close></a>
                <p>{{errorMessage}}</p>
            </div>
            <div v-if="dados.atividade">
                <div class="uk-clearfix">
                    <div class="uk-float-left">
                        <h3 class="uk-card-title uk-margin-remove-bottom">{{dados.atividade.titulo}}</h3>
                    </div>
                    <div class="uk-float-right">
                        <a @click.prevent.stop="apagarAtividadeLazer()" class="i-remove" uk-icon="trash"></a>
                    </div>
                </div>
                <small>Última atualização: {{dados.atividade.atualizado_em | formatDate}}</small>
            </div>
        </div>
        <!--  -->
        <div v-if="dados.atividade">
            <div class="uk-card-body"> 
                <!-- Concluído -->
                <div class="uk-margin">
                    <label><input class="uk-checkbox" type="checkbox" v-model="dados.atividade.concluida" @change="concluirAtividade()"/>&nbsp;Concluída</label>
                    <div v-if="isLoading" class="spinner-loading" uk-spinner="ratio: 0.5"></div>
                </div>
                <!--  -->
                
                <!-- Descrição -->
                <div class="uk-margin">
                    <label class="uk-form-label">Descrição</label>
                    <div>{{dados.atividade.descricao}}</div>
                </div>
                <!--  -->

                <!-- Data de Realização -->
                <div class="uk-margin" v-if="dados.atividade.data_entrega">
                    <label class="uk-form-label">Data de Realização</label>
                    <div>{{dados.atividade.data_entrega |formatDate}}</div>
                </div>
                <!--  -->
            </div>
            <!-- Submit -->
            <div class="uk-card-footer">
                <div class="uk-clearfix">
                    <div class="uk-float-left">
                        <router-link :to="{name: 'editarAtividadeLazer', params: {id: dados.id}}" class="uk-button uk-button-primary">Editar</router-link>
                    </div>
                    <div class="uk-float-right">
                        <router-link :to="{name: 'cursos'}" class="uk-button uk-button-default">Voltar</router-link>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="uk-padding uk-text-center">
            Atividade não encontrada
        </div>
    </div>
    <div v-else class="uk-text-center uk-spinner-loading">
        <div class="spinner-loading" uk-spinner="ratio: 3"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dados: {},
            isLoading: false,
            isLoadingInitial: true,
            errorMessage: null
        }
    },
    props: ['id'],
    methods: {
        async concluirAtividade() {
            try {
                this.isLoading = true;
                this.errorMessage = null;

                // Recupera o token
                let token = this.$session.get('jwt');
                let atividade = {
                    concluida: this.dados.atividade.concluida
                }

                // Salva os cursos e as matérias
                let response = await this.$http.put(process.env.API_URL + 'atividade-lazer/update/' + this.id, atividade, {headers: {Authorization: token}});

                this.isLoading = false;
                UIkit.notification({
                    message: '<span uk-icon=\'icon: check\'></span> Atividade Atualizada!',
                    status: 'success',
                    pos: 'bottom-right'
                })
            }
            catch(e){
                this.errorMessage = e.body.message;
                this.isLoading = false;
                UIkit.notification({
                    message: '<span uk-icon=\'icon: check\'></span> Erro ao atualizar atividade!',
                    status: 'warning',
                    pos: 'bottom-right'
                })
            } 
        },
        apagarAtividadeLazer() {
            try {
                this.errorMessage = null;

                this.$swal.fire({
                    title: 'Tem certeza que deseja deletar?',
                    text: "Você não será capaz de reverter essa ação!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sim, desejo apagar!',
                    cancelButtonText: 'Cancelar',
                }).then(async (result) => {
                    if (result.value) {
                        // Recupera o token
                        let token = this.$session.get('jwt');

                        // Salva os cursos e as matérias
                        let response = await this.$http.delete(process.env.API_URL + 'atividade-lazer/delete/' + this.id, {headers: {Authorization: token}});

                        this.$swal.fire('Pronto!','Deletado com sucesso.','success');
                        // Redireciona para a página de dashboard
                        this.$router.push({ name: 'cursos'});
                    }
                });
            }
            catch(e){
                this.errorMessage = e.body.message;
            }
        },
        loadAtividadeLazer() {
            let token = this.$session.get('jwt');
            // Carrega os cursos
            this.$http.get(process.env.API_URL + 'atividade-lazer/get/' + this.id, {headers: {Authorization: token}})
            .then(
            atividade => {
                this.dados = atividade.body;
                this.isLoadingInitial = false;
            },
            err => {
                this.errorMessage = err.body.message;
                this.isLoadingInitial = false;
            });
        }
    },
    created() {
        this.loadAtividadeLazer();
    },
    watch: {
        '$route' (to, from) {
            this.loadAtividadeLazer();
        }
    }
}
</script>
