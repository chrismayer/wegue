import Vue from 'vue';
import { shallowMount } from '@vue/test-utils'
import WguAppTpl from 'APP/WguAppTemplate'

describe('WguAppTpl.vue', () => {
  // Inspect the raw component options
  it('is defined', () => {
    expect(typeof WguAppTpl).to.not.equal('undefined');
  });

  describe('data', () => {
    let comp;
    let vm;
    beforeEach(() => {
      Vue.prototype.$appConfig = {
        showCopyrightYear: true,
        baseColor: 'red',
        modules: {}
      };
      comp = shallowMount(WguAppTpl);
      vm = comp.vm;
    });

    it('has correct default data', () => {
      expect(vm.isEmbedded).to.equal(undefined);
      expect(vm.floatingWins).to.be.an('array');
      expect(vm.sidebarWins).to.be.an('array');
      expect(vm.showCopyrightYear).to.equal(true);
      expect(vm.baseColor).to.equal('red');
    });
  });

  describe('methods', () => {
    let comp;
    let vm;
    beforeEach(() => {
      comp = shallowMount(WguAppTpl);
      vm = comp.vm;
    });

    it('getModuleWinData(\'floating\') returns always an array', () => {
      // mock a window UI instance
      const moduleData = vm.getModuleWinData('floating');
      expect(moduleData).to.be.an('array');
    });

    it('getModuleWinData(\'sidebar\') returns always an array', () => {
      // mock a window UI instance
      const moduleData = vm.getModuleWinData('sidebar');
      expect(moduleData).to.be.an('array');
    });

    it('getModuleWinData(\'floating\') returns correct data', () => {
      // mock a module conf
      Vue.prototype.$appConfig = { modules: {
        'wgu-infoclick': {
          'target': 'menu',
          'win': 'floating',
          'draggable': false,
          'initPos': {
            'left': 8,
            'top': 16
          }
        } } };
      const moduleData = vm.getModuleWinData('floating');
      expect(moduleData).to.be.an('array');
      expect(moduleData.length).to.equal(1);
      expect(moduleData[0].type).to.equal('wgu-infoclick-win');
      expect(moduleData[0].target).to.equal('menu');
      expect(moduleData[0].draggable).to.equal(false);
      expect(moduleData[0].initPos.left).to.equal(8);
      expect(moduleData[0].initPos.top).to.equal(16);
    });

    it('getModuleWinData(\'sidebar\') returns correct data', () => {
      // mock a module conf
      Vue.prototype.$appConfig = { modules: {
        'wgu-infoclick': {
          'target': 'menu',
          'win': 'sidebar'
        } } };
      const moduleData = vm.getModuleWinData('sidebar');
      expect(moduleData).to.be.an('array');
      expect(moduleData.length).to.equal(1);
      expect(moduleData[0].type).to.equal('wgu-infoclick-win');
      expect(moduleData[0].target).to.equal('menu');
    });
  });
});
