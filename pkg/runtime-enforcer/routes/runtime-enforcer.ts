import Entry from '../pages/c/_cluster/runtime-enforcer/index.vue';
import RuntimeEnforcerResourceCreate from '../pages/c/_cluster/runtime-enforcer/_resource/create.vue';
import RuntimeEnforcerResourceId from '../pages/c/_cluster/runtime-enforcer/_resource/_id.vue';
import RuntimeEnforcerResourceNamespaceId from '../pages/c/_cluster/runtime-enforcer/_resource/_namespace/_id.vue';
import RuntimeEnforcerResourceList from '../pages/c/_cluster/runtime-enforcer/_resource/index.vue';
import { SUB_PROD_NAME } from '../types/runtime-enforcer';
import { PROD_NAME } from '../config/runtime-enforcer';

const routes = [
  {
    name:      `c-cluster-${PROD_NAME}-${ SUB_PROD_NAME }-entry`,
    path:      `/c/:cluster/${PROD_NAME}/${ SUB_PROD_NAME }/entry`,
    component: Entry,
    meta:      { product: SUB_PROD_NAME },
  },
  {
    name:      `c-cluster-${PROD_NAME}-${ SUB_PROD_NAME }-resource-create`,
    path:      `/c/:cluster/${ PROD_NAME }/:resource/create`,
    component: RuntimeEnforcerResourceCreate,
    meta:      { product: PROD_NAME },
  },
  {
    name:      `c-cluster-${PROD_NAME}-${ SUB_PROD_NAME }-resource-id`,
    path:      `/c/:cluster/${ PROD_NAME }/:resource/:id`,
    component: RuntimeEnforcerResourceId,
    meta:      { product: PROD_NAME },
  },
  {
    name:      `c-cluster-${PROD_NAME}-${ SUB_PROD_NAME }-resource-namespace-id`,
    path:      `/c/:cluster/${ PROD_NAME }/:resource/:namespace/:id`,
    component: RuntimeEnforcerResourceNamespaceId,
    meta:      { product: PROD_NAME },
  },
  {
    name:      `c-cluster-${PROD_NAME}-${ SUB_PROD_NAME }-resource`,
    path:      `/c/:cluster/${ PROD_NAME }/:resource`,
    component: RuntimeEnforcerResourceList,
    meta:      { product: PROD_NAME },
  },
];

export default routes;
