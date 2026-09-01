import { PRODUCT_NAME } from '../types/runtime-enforcer';
import { RESOURCE } from '../types/runtime-enforcer';
export const PROD_NAME = 'security';
export const subProduct = 'policy';
const GROUP_NAME = 'Runtime Enforcer';

export function init($plugin: any, store: any) {
  const { configureType } = $plugin.DSL(store, PROD_NAME);

  const {
    product,
    virtualType,
    basicType
  } = $plugin.DSL(store, PROD_NAME);

  // registering a top-level product
  product({
    icon:                'pod_security',
    inStore:             'cluster',
    showNamespaceFilter: true,
  });

  // => => => creating a custom page
  virtualType({
    label:      'Overview',
    name:       `${subProduct}-entry`,
    namespaced: false,
    route:      {
      name:   `c-cluster-${PROD_NAME}-${ PRODUCT_NAME }-entry`,
      params: { product: PRODUCT_NAME },
      meta:   { pkg: PRODUCT_NAME, product: PRODUCT_NAME }
    },
    overview: true
  });

  configureType(RESOURCE.POLICY_PROPOSALS, {
    isCreatable: false,
  });

  configureType(RESOURCE.ACTIVE_POLICIES, {
    isCreatable: false,
    canYaml:     true,
  });

  basicType([
    // `${subProduct}-entry`,
    RESOURCE.POLICY_PROPOSALS,
    RESOURCE.ACTIVE_POLICIES,
  ], GROUP_NAME);
}