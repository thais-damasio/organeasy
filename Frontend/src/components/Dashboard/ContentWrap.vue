<template>
  <div class="content-wrapper">
    
    <!-- Cabeçalho de link -->
    <section class="content-header uk-margin-bottom">
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
        <li class="active">Dashboard</li>
      </ol>
    </section>

    <!-- Router View -->
    <section class="content">
      <transition name="page" mode="out-in">
        <router-view></router-view>
      </transition>
    </section>

    <!-- Rodapé da página -->
    <div class="uk-footer uk-overlay-primary">
      &copy; Organeasy 2019 &mdash;
      Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
    </div>
    
  </div>

</template>

<script>
export default {
}
</script>

<style>
@media (max-width: 767px){
  .content-wrapper{
    margin-top: 100px !important;    
  }
}
.content-wrapper{
  margin-top: 50px;
  min-height: 100vh;
}
.page-enter-active, .page-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.page-enter, .page-leave-to {
  opacity: 0;
}
.uk-footer {
  bottom: 0;
  position: absolute !important;
  width: 100%;
  padding: 5px;
}
</style>
