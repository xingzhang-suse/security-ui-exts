import { mount, shallowMount, flushPromises } from '@vue/test-utils';
import Dashboard from '../Dashboard.vue';

const RESOURCE = {
  REGISTRY: 'sbomscanner.kubewarden.io.registry',
  SCAN_JOB: 'sbomscanner.kubewarden.io.scanjob',
};

function makeScanJob({
  namespace = 'default',
  registry = 'my-registry',
  scannedImagesCount = 5,
  imagesCount = 10,
  completionTime = Date.now(),
  conditions =  [{ error: false }],
} = {}) {
  return {
    metadata: { namespace },
    spec: { registry },
    status: {
      imagesCount,
      scannedImagesCount,
      completionTime,
      conditions,
    },
  };
}

describe('Dashboard.vue full coverage', () => {
  let storeMock: any;

  beforeEach(() => {
    storeMock = {
      dispatch: jest.fn().mockResolvedValue([]),
      getters: {
        'cluster/all': jest.fn(() => [makeScanJob()]),
      },
    };
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  function factory(options = {}) {
    return shallowMount(Dashboard, {
      global: {
        mocks: {
          $store: storeMock,
          t: (key: any) => key,
        },
      },
      ...options,
    });
  }

  it('renders component correctly', () => {
    const wrapper = factory();
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.vm.selectedRegistry).toBe('All registries');
    expect(wrapper.vm.scaningStats.lastCompletionTimestamp).toBe(0);
  });

  it('computed: displayedCurrDate and displayedCurrTime return strings', () => {
    const wrapper = factory();
    expect(typeof wrapper.vm.displayedCurrDate).toBe('string');
    expect(typeof wrapper.vm.displayedCurrTime).toBe('string');
  });

  it('computed: displayedDetectedErrorCnt pluralization', () => {
    const wrapper = factory();
    wrapper.vm.scaningStats.detectedErrorCnt = 1;
    expect(wrapper.vm.displayedDetectedErrorCnt).toBe('1 error');
    wrapper.vm.scaningStats.detectedErrorCnt = 2;
    expect(wrapper.vm.displayedDetectedErrorCnt).toBe('2 errors');
  });

  it('computed: displayedFailedImagesCnt pluralization', () => {
    const wrapper = factory();
    wrapper.vm.scaningStats.failedImagesCnt = 1;
    expect(wrapper.vm.displayedFailedImagesCnt).toBe('1 image');
    wrapper.vm.scaningStats.failedImagesCnt = 2;
    expect(wrapper.vm.displayedFailedImagesCnt).toBe('2 images');
  });

  it('computed: displayedTotalScannedImageCnt pluralization', () => {
    const wrapper = factory();
    wrapper.vm.scaningStats.totalScannedImageCnt = 1;
    expect(wrapper.vm.displayedTotalScannedImageCnt).toBe('1 image');
    wrapper.vm.scaningStats.totalScannedImageCnt = 3;
    expect(wrapper.vm.displayedTotalScannedImageCnt).toBe('3 images');
  });

  it('computed: durationFromLastScan handles all ranges', () => {
    const wrapper = factory();

    // initialDuration
    wrapper.vm.scaningStats.lastCompletionTimestamp = 0;
    expect(wrapper.vm.durationFromLastScan).toContain('initialDuration');

    // seconds
    wrapper.vm.scaningStats.lastCompletionTimestamp = Date.now() - 10 * 1000;
    expect(wrapper.vm.durationFromLastScan).toContain('seconds');

    // minutes
    wrapper.vm.scaningStats.lastCompletionTimestamp = Date.now() - 10 * 60 * 1000;
    expect(wrapper.vm.durationFromLastScan).toContain('minutes');

    // hours
    wrapper.vm.scaningStats.lastCompletionTimestamp = Date.now() - 2 * 60 * 60 * 1000;
    expect(wrapper.vm.durationFromLastScan).toContain('hours');

    // days
    wrapper.vm.scaningStats.lastCompletionTimestamp = Date.now() - 3 * 24 * 60 * 60 * 1000;
    expect(wrapper.vm.durationFromLastScan).toContain('days');
  });

  it('computed: registryOptions returns unique list', async () => {
    const wrapper = factory();
    await wrapper.setData({
      scanJobsCRD: [
        makeScanJob({ namespace: 'ns1', registry: 'reg1' }),
        makeScanJob({ namespace: 'ns1', registry: 'reg1' }),
      ],
    });
    const options = wrapper.vm.registryOptions;
    expect(options).toContain('All registries');
    expect(options).toContain('ns1/reg1');
  });

  it('method: getFailedImageCnt calculates correctly', () => {
    const wrapper = factory();
    
    const jobWithError = { status: { conditions: [{error: true}], scannedImagesCount: 6, imagesCount: 10 } };
    const jobWithoutError = { status: { conditions: [{error: false}], scannedImagesCount: 8, imagesCount: 8 } };

    expect(wrapper.vm.getFailedImageCnt(jobWithError)).toBe(4);
    expect(wrapper.vm.getFailedImageCnt(jobWithoutError)).toBe(0);
  });

  it('method: getScaningStats aggregates correctly', () => {
    const wrapper = factory();
    const jobs = [
      makeScanJob({ conditions: [{error: false}], scannedImagesCount: 5 }),
      makeScanJob({ conditions: [{error: true}], scannedImagesCount: 3 }),
    ];
    wrapper.vm.scanJobsCRD = jobs;
    const stats = wrapper.vm.getScaningStats();
    expect(stats.totalScannedImageCnt).toBe(8);
    expect(stats.detectedErrorCnt).toBe(1);
    expect(stats.failedImagesCnt).toBeGreaterThanOrEqual(0);
    expect(stats.lastCompletionTimestamp).toBeGreaterThan(0);
  });

  it('method: loadData replaces data when reloading', async () => {
    const wrapper = factory();
    const mockData = [makeScanJob()];
    storeMock.getters['cluster/all'].mockReturnValueOnce(mockData);

    wrapper.vm.loadData(true);
    expect(storeMock.getters['cluster/all']).toHaveBeenCalledWith(RESOURCE.SCAN_JOB);
  });

  it('method: fetch loads data and sets interval', async () => {
    const mockDispatch = jest.fn().mockResolvedValue([]);
    const mockClearInterval = jest.spyOn(global, 'clearInterval').mockImplementation(() => {});
    const mockSetInterval = jest.spyOn(global, 'setInterval').mockImplementation((fn, t) => {
      fn(); // call it immediately
      return 123;
    });

    const wrapper = factory({
      global: {
        mocks: {
          $store: {
            dispatch: mockDispatch,
            getters: { 'cluster/all': jest.fn(() => []) },
          },
          t: (key) => key,
        },
      },
    });

    await wrapper.vm.$options.fetch.call(wrapper.vm);
    // verify dispatch called
    expect(mockDispatch).toHaveBeenCalledWith('cluster/findAll', { type: 'sbomscanner.kubewarden.io.scanjob' });

    // verify clearInterval & setInterval called
    expect(mockClearInterval).toHaveBeenCalled();
    expect(mockSetInterval).toHaveBeenCalled();

    // verify keepAliveTimer assigned
    expect(wrapper.vm.keepAliveTimer).toBe(123);

    mockSetInterval.mockRestore();
    mockClearInterval.mockRestore();
  });

  it('watch: selectedRegistry triggers getScaningStats', async () => {
    const wrapper = factory();
    const spy = jest.spyOn(wrapper.vm, 'getScaningStats');
    await wrapper.setData({ selectedRegistry: 'custom' });
    wrapper.vm.$options.watch.selectedRegistry.call(wrapper.vm);
    expect(spy).toHaveBeenCalled();
  });

  it('beforeUnmount clears interval', () => {
    const wrapper = factory();
    const clearSpy = jest.spyOn(global, 'clearInterval');
    wrapper.vm.keepAliveTimer = setInterval(() => {}, 2000);
    wrapper.vm.$options.beforeUnmount.call(wrapper.vm);
    expect(clearSpy).toHaveBeenCalled();
  });
});