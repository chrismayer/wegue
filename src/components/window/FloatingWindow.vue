
<script>
  import { DraggableWin } from '../../directives/DraggableWin';

  export default {
    directives: {
      DraggableWin
    },
    props: ['icon'],
    data () {
      return {
        show: false,
        left: '100px',
        top: '200px'
      }
    }
  }
</script>

<style>

  .wgu-floatwin {
    background-color: white;
    z-index: 2;
  }

  .wgu-floatwin.card {
    position: absolute;
  }

</style>
