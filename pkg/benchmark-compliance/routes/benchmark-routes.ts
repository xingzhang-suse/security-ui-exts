import Overview from '../pages/overview.vue'

const benchmarkName = 'benchmark';
const routes = [
  {
    name: `c-cluster-${ benchmarkName }-overview`,
    path: `/c/:cluster/${ benchmarkName }/overview`,
    component: Overview
  }
]

export default routes;