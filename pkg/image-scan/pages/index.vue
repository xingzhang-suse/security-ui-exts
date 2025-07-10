<template>
  <div class="page">
    <h2>{{ content }}</h2>
  </div>


</template>

<script>
  import { CR_SBOM, GRP_SBOM } from '../types/image-scan';
  export default {
    name: 'dashboard',
    components: {},
    mixins: [],
    async fetch() {
      this.content = "Image Scan";
      //Test API request
      let res1 = await this.$store.dispatch('management/request', {
        url:    '/v3/authconfig/azuread',
        method: 'GET',
        redirectUnauthorized: false,
      });
      //Test Scoped resource
      let res2 = await this.$store.getters["management/schemaFor"]('management.cattle.io.podsecurityadmissionconfigurationtemplate');
      //Test SBOMBastic resource
      let res3 = await this.$store.getters["cluster/schemaFor"](CR_SBOM);
      console.log("res1:", res1)
      console.log("res2:", res2)
      console.log("res3:", res3)
    }
  }
</script>


<style scoped>
  .page {
    display: flex;
    flex-direction: column;
    padding: 20px;
    min-height: 100%;
  }

</style>