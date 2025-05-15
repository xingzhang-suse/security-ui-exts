import Overview from '../pages/overview.vue'

const networkName = 'network';
const routes = [
    {
        name: `c-cluster-${ networkName }-overview`,
        path: `/c/:cluster/${ networkName }/overview`,
        component: Overview
    }
]

export default routes;