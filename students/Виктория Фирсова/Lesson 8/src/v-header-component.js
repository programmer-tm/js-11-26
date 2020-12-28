exports.init = function()
{
Vue.component('v-header', {
  template: `
    <header class="header d-flex">
        <span class="logo">E-Shop</span>
        <slot />
        <button @click="handleClick" type="button" class="cart-button">Корзина</button>
        <slot name="basket" />
    </header>
  `,
  methods: {
    handleClick() {
      this.$emit('change-is-cart-visible');
    }
  }
});
}