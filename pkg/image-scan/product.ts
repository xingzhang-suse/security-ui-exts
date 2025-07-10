import { IPlugin } from '@shell/core/types';
import { DSL } from '@shell/store/type-map';
import { CR_SBOM, GRP_SBOM } from './types/image-scan';

export function init($plugin: IPlugin, store: any) {
    const PROD_NAME = 'image_scan';
    const {
        product,
        configureType,
        mapGroup,
        virtualType,
        basicType
    } = DSL(store, PROD_NAME);

    // registering a top-level product
    product({
        icon: 'pod_security',
        inStore: 'cluster',
        // ifHaveGroup: GRP_SBOM,
        weight: 100,
        typeStoreMap: {
            [CR_SBOM]: 'cluster',
        },
        to: {
            name: `c-cluster-${ PROD_NAME }`,
            params: {
                product: PROD_NAME,
            },
            meta: {
                product: PROD_NAME
            }
        }
    });

    mapGroup('storage.sbombastic.rancher.io', 'sbombastic');
    
    configureType(CR_SBOM, {
        isCreatable: true,
        isEditable:  true,
        isRemovable: true,
        showAge:     true,
        showState:   true,
        canYaml:     true,
        customRoute: {
            name: `c-cluster-${ PROD_NAME }-sbombastic`,
            params: {
                product: PROD_NAME,
                resource: CR_SBOM
            },
            meta: {
                product: PROD_NAME,
            }
        }
    });

    virtualType({
        label:   "Dashbaord",
        name:   'dashboard',
        namespaced: false,
        route:    {
            name:   `c-cluster-${PROD_NAME}`,
            params: {
                product: PROD_NAME,
            },
            meta: {
                product: PROD_NAME,
            }
        }
    });

    basicType([
        CR_SBOM,
        "dashboard",
    ],GRP_SBOM);
}