<script>

import { WguEventBus } from '../../WguEventBus.js'
import ToggleUiButton from '../ToggleUiButton'

export default ToggleUiButton.extend({
  name: 'wgu-toggle-measurewin-button',
  mounted () {
  },
  methods: {
    toggleUi () {
      // TODO check how to call the super method
      // show / toggle child UI
      this.showUi = !this.showUi;

      // inform sub component (layer list)
      WguEventBus.$emit('toggle-measurewin', this.showUi);
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
