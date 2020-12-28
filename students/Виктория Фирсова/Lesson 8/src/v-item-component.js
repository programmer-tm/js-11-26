exports.init = function()
{
Vue.component('v-item', {
  props: ['element'],
  template: `
    <div class="item">
        <h4>{{element.title}}</h4>
        <p>{{element.price}}</p>
        <button type="button" v-on:click="addToBasket">Add to basket</button>
    </div>
  `,
  methods: {
    addToBasket() {
      this.$emit('addToBasket', this.element);
    }
  }
});
}