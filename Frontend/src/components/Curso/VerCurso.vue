<template>
    <div v-if="!isLoadingInitial" class="uk-card uk-card-default uk-width-4-5@m uk-align-center">
        <!-- Header -->
        <div class="uk-card-header">
            <!-- Alerta de erro -->
            <div v-if="errorMessage" class="uk-alert-danger" uk-alert>
                <a class="uk-alert-close" uk-close></a>
                <p>{{errorMessage}}</p>
            </div>
            <div class="uk-clearfix">
                <div class="uk-float-left">
                    <h3 class="uk-card-title uk-margin-remove-bottom">{{curso.nome}}</h3>
                </div>
                <div class="uk-float-right">
                    <a @click.prevent.stop="apagarCurso()" class="i-remove" uk-icon="trash"></a>
                </div>
            </div>
            <small v-if="curso.atualizado_em">Última atualização: {{curso.atualizado_em | formatDate}}</small>
        </div>
        <!--  -->
        <div v-if="curso.id">
            <div class="uk-card-body">   
                <!-- Lista de Matérias -->
                <ul v-if="curso.tem_materias" uk-accordion>
                    <li class="uk-open">
                        <a class="uk-accordion-title uk-button-accordion-li uk-background-muted uk-padding-small" href="#">
                            Matérias (<small>{{curso.materias.length}}</small>)
                        </a>
                        <div class="uk-accordion-content">
                            <ul v-if="curso.materias.length > 0" class="uk-list uk-list-striped">
                                <li v-for="(materia, index) in curso.materias" :key="index">
                                    <router-link :to="{name: 'verMateria', params: {id: materia.id}}">{{materia.nome}}</router-link>
                                </li>
                            </ul>
                            <ul v-else class="uk-list uk-list-striped">
                                <li>Nenhuma matéria inserida</li>
                            </ul>
                            <hr>
                            <!-- Nova Matéria -->
                            <router-link class="uk-display-block uk-text-right uk-margin-top" :to="{name: 'criarAtividade'}">
                                <span class="uk-margin-small-right" uk-icon="plus"></span>
                                Adicionar Atividade
                            </router-link>
                            <!--  -->
                        </div>
                    </li>
                </ul>
                <!-- Lista de Atividades do Curso -->
                <ul v-else-if="curso.atividadesCurso" uk-accordion>
                    <li class="uk-open">
                        <a class="uk-accordion-title uk-button-accordion-li uk-background-muted uk-padding-small" href="#">
                            Atividades <small>({{curso.atividadesCurso.length}})</small>
                        </a>
                        <div class="uk-accordion-content">
                            <ul v-if="curso.atividadesCurso.length > 0" class="uk-list uk-list-striped">
                                <li v-for="(atv) in curso.atividadesCurso" :key="atv.id">
                                    <span v-if="atv.atividade.concluida" class="uk-badge uk-background-success"></span>
                                    <span v-else class="uk-badge uk-background-danger"></span>
                                    <router-link :to="{ name: 'verAtividadeCurso', params: { id: atv.id}}">{{atv.atividade.titulo}}</router-link>
                                    <span class="uk-align-right">{{atv.atividade.data_entrega | formatDate}}</span>
                                </li>
                            </ul>
                            <ul v-else class="uk-list uk-list-striped">
                                <li>Nenhuma atividade inserida</li>
                            </ul>
                            <hr>
                            <!-- Nova Atividade -->
                            <router-link class="uk-display-block uk-text-right uk-margin-top" :to="{name: 'criarAtividade'}">
                                <span class="uk-margin-small-right" uk-icon="plus"></span>
                                Adicionar
                            </router-link>
                            <!--  -->
                        </div>
                    </li>
                </ul>
                <!--  -->
            </div>
            <!-- Submit -->
            <div class="uk-card-footer">
                <div class="uk-clearfix">
                    <div class="uk-float-left">
                        <router-link :to="{name: 'editarCurso', params: {id: curso.id}}" class="uk-button uk-button-primary">Editar</router-link>
                    </div>
                    <div class="uk-float-right">
                        <router-link :to="{name: 'cursos'}" class="uk-button uk-button-default">Voltar</router-link>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="uk-padding uk-text-center">
            Curso não encontrado
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
            curso: {},
            isLoadingInitial: true,
            errorMessage: null
        }
    },
    methods: {
        apagarCurso() {
            try {
                this.errorMessage = null;

                this.$swal.fire({
                    title: 'Tem certeza que deseja deletar?',
                    text: "Todas as matérias/atividades associadas a esse curso serão apagados e você não será capaz de reverter essa ação!",
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
                        let response = await this.$http.delete(process.env.API_URL + 'curso/delete/' + this.id, {headers: {Authorization: token}});

                        this.$swal.fire('Pronto!','Deletado com sucesso.','success');
                        // Redireciona para a página de dashboard
                        this.$router.push({ name: 'cursos'});
                    }
                });
            }
            catch(e){
                this.errorMessage = e.body.message;
            }
        }
    },
    props: ['id'],
    created() {
        let token = this.$session.get('jwt');
        // Carrega os cursos
        this.$http.get(process.env.API_URL + 'curso/get/' + this.id, {headers: {Authorization: token}})
        .then(
        curso => {
            this.curso = curso.body;
            this.isLoadingInitial = false;
        },
        err => {
            this.errorMessage = err.body.message;
            this.isLoadingInitial = false;
        });
    }
}
</script>
