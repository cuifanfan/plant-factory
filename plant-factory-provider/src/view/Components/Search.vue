<template>
  <v-row class="pa-0 ma-0" align="center">
    <slot name="header"></slot>
    <v-expansion-panels accordion flat :value="[1]" :mandatory="value">
      <v-expansion-panel :key="1">
        <v-expansion-panel-content class="pa-0">
          <slot></slot>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-row>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style></style>
