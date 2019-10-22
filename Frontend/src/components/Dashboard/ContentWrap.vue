<template>

  <div id="content-wrap" class="content-wrapper">
    
    <!-- Cabeçalho de link -->
    <section class="content-header">
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
    
  </div>

</template>

<script>
export default {
}
</script>

<style>
.page-enter-active, .page-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.page-enter, .page-leave-to {
  opacity: 0;
}
</style>
