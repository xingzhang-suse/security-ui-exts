import Dashboard from '../pages/index.vue'
import ImageScanListResource from '../pages/c/_cluster/image-scan/_resource/index.vue';
// import CreateImageScanResource from '@image-scan/pages/c/_cluster/image-scan/_resource/create.vue';
// import ViewImageScanResource from '@image-scan/pages/c/_cluster/image-scan/_resource/_id.vue';
// import ViewImageScanNamespacedResource from '@image-scan/pages/c/_cluster/image-scan/_resource/_namespace/_id.vue';

const PROD_NAME = 'image_scan';
const routes = [
     {
        name:       `c-cluster-${ PROD_NAME }`,
        path:       `/c/:cluster/${ PROD_NAME }`,
        component:  Dashboard,
        meta:       {
        product: PROD_NAME,
        pkg:     PROD_NAME
        }
    },
    {
        name:      `c-cluster-${ PROD_NAME }-resource`,
        path:      `/c/:cluster/${ PROD_NAME }/:resource`,
        component: ImageScanListResource,
        meta:      {
            product: PROD_NAME,
        },
    },
]

export default routes;