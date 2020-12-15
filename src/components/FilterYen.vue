<template>
  <span>{{val | numberFormat}}</span>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "FilterYen",
  
  props: {
    val: Number,
  },
  filters: {
    numberFormat: function(value: number) {
      return `¥${value.toLocaleString()}`;
    },
  },
});
</script>