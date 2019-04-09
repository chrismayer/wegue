<template>

  <wgu-app-tpl>
    <!-- insert your app slots here  -->
  </wgu-app-tpl>

</template>

<script>
  import WguAppTemplate from '../src/WguAppTemplate.vue';

  export default {
    name: 'wgu-app',
    components: {
      'wgu-app-tpl': WguAppTemplate
    },
    data () {
      return {
      }
    },
    mounted () {
    },
    methods: {
    }
  }
</script>
