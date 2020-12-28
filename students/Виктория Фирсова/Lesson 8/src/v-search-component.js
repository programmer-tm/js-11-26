exports.init = function()
{
Vue.component('v-search', {
  props: ['value'],
  template: `
    <div>
      <input type="text" :value="value" @input="$emit('input', $event.target.value)"  class="search" placeholder="Search..." />
    </div>
  `,
});
}