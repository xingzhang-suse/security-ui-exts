import { mount } from '@vue/test-utils';
import Dashboard from '@image-scan/pages/index.vue';

describe('page: dashboard', () => {
  it('display dashboard page', async() => {
    const wrapper = mount(Dashboard, {
        global: { mocks: { $store: { getters: { 'i18n/t': jest.fn() } } } },
      });
    expect(wrapper.find('h2').exists()).toBe(true);

  });
});