import Overview from '../pages/overview.vue'

const runtimeProcessProfileName = 'runtime_process_profile';
const routes = [
    {
        name: `c-cluster-${ runtimeProcessProfileName }-overview`,
        path: `/c/:cluster/${ runtimeProcessProfileName }/overview`,
        component: Overview
    }
]

export default routes;