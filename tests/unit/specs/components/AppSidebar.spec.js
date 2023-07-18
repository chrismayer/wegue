import AppSidebar from 'APP/components/AppSidebar';
import { WguEventBus } from '@/WguEventBus';
import { shallowMount } from '@vue/test-utils';
import Vuetify from 'vuetify';

const vuetify = new Vuetify();

describe('AppSidebar.vue', () => {
  describe('data', () => {
    let comp;
    let vm;
    beforeEach(() => {
      comp = shallowMount(AppSidebar, { vuetify });
      vm = comp.vm;
    });

    it('has correct default data', () => {
      expect(vm.sidebarOpen).to.equal(true);
    });
  });

  describe('events', () => {
    let comp;
    let vm;
    beforeEach(() => {
      comp = shallowMount(AppSidebar, { vuetify });
      vm = comp.vm;
    });

    it('event "sidebar-toggle" forces correct open state', () => {
      // force closing sidebar by adding 'false' parameter
      WguEventBus.$emit('sidebar-toggle', false);
      expect(vm.sidebarOpen).to.equal(false);
      // toggle sidebar open state by skipping parameter
      WguEventBus.$emit('sidebar-toggle');
      expect(vm.sidebarOpen).to.equal(true);
    });
  });
});
