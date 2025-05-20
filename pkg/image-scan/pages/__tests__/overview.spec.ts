import { mount } from '@vue/test-utils';
import Overview from '@image-scan/pages/overview.vue';

describe('page: overview', () => {
  it('display overview page', async() => {
    const currValues = [1, 2, 3];
    const wrapper = mount(Overview, {
        props: {
          value:      currValues,
          configType: 'container'
        },
        global: { mocks: { $store: { getters: { 'i18n/t': jest.fn() } } } },
      });

    expect(wrapper.find('h2').exists()).toBe(true);
    expect(wrapper.find('h2').text()).toBe('Image Scan');

  });
});