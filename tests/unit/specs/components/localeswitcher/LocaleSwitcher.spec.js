import Vue from 'vue'
import { mount, shallowMount } from '@vue/test-utils';
import LocaleSwitcher from '@/components/localeswitcher/LocaleSwitcher';
import Vuetify from 'vuetify';

const vuetify = new Vuetify();

const appConfig = {
  lang: {
    supported: {
      en: 'English',
      de: 'Deutsch'
    },
    fallback: 'de'
  }
};

describe('localeswitcher/LocaleSwitcher.vue', () => {
  it('is defined', () => {
    expect(LocaleSwitcher).to.not.be.an('undefined');
  });

  describe('props', () => {
    let comp;
    let vm;
    beforeEach(() => {
      comp = shallowMount(LocaleSwitcher, { vuetify });
      vm = comp.vm;
    });

    it('has correct default props', () => {
      expect(vm.icon).to.equal('language');
    });

    afterEach(() => {
      comp.destroy();
    });
  });

  describe('data', () => {
    let comp;
    let vm;
    beforeEach(() => {
      Vue.prototype.$appConfig = appConfig;
      comp = shallowMount(LocaleSwitcher, { vuetify });
      vm = comp.vm;
    });

    it('has correct default data', () => {
      expect(typeof LocaleSwitcher.data).to.equal('function');
      expect(vm.lang).to.be.an('object');
      expect(Object.keys(vm.lang).length).to.eql(2);
      expect(vm.lang.en).to.eql('English');
      expect(vm.lang.de).to.eql('Deutsch');
    });

    afterEach(() => {
      comp.destroy();
    });
  });

  describe('methods', () => {
    let comp;
    let vm;
    beforeEach(() => {
      Vue.prototype.$appConfig = appConfig;
      comp = mount(LocaleSwitcher, {
        vuetify
      });
      vm = comp.vm;
    });

    it('are implemented', () => {
      expect(typeof vm.onItemClick).to.equal('function');
    });

    it('onItemClick toggles language', () => {
      vm.onItemClick('de');
      expect(vm.$i18n.locale).to.equal('de');
      expect(vm.$vuetify.lang.current).to.equal('de');

      vm.onItemClick('en');
      expect(vm.$i18n.locale).to.equal('en');
      expect(vm.$vuetify.lang.current).to.equal('en');
    });

    afterEach(() => {
      comp.destroy();
    });
  });
});
