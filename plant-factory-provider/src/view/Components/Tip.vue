<template>
  <v-snackbar
    :value="value"
    @input="$emit('input', $event)"
    top
    :timeout="timeout"
    transition="scroll-y-transition"
    color="rgba(0, 0, 0, 0)"
    elevation="0"
    class="pt-0"
  >
    <v-alert :type="type" class="rounded-lg"><slot></slot></v-alert>
  </v-snackbar>
</template>

<script>
export default {
  props: ["value", "timeout", "type"]
};
</script>

<style></style>
