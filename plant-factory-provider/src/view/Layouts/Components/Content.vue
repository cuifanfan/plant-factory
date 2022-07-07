<template>
  <v-main style="100vh">
    <v-container pa-4 pt-6 ma-0 class="grey lighten-4" style="height: 100%; max-width: 100%">
      <v-scroll-x-transition>
        <slot></slot>
      </v-scroll-x-transition>
    </v-container>
  </v-main>
</template>
<script>
export default {};
</script>

<style scoped></style>
