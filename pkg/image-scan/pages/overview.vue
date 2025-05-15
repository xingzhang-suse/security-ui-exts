<template>
  <div class="page">
    <h2>{{ content }}</h2>
  </div>


</template>

<script lang="ts">

  export default {
    name: 'overview',
  }
</script>

<script lang="ts" setup>
  import { ref } from "vue";

  let content = ref("Image Scan");

</script>

<style scoped>
  .page {
    display: flex;
    flex-direction: column;
    padding: 20px;
    min-height: 100%;
  }

</style>