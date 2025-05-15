import Overview from '../pages/overview.vue'

const imageScanName = 'image_scan';
const routes = [
    {
        name: `c-cluster-${ imageScanName }-overview`,
        path: `/c/:cluster/${ imageScanName }/overview`,
        component: Overview
    }
]

export default routes;