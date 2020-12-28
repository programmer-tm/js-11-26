exports.init = function()
{
Vue.component('v-goods', {
  props: ['goods'],
  template: `
    <main>
        <section class="goods">
            <v-item
              v-for="item in goods"
              v-bind:element="item"
              v-on:addToBasket="handleAddToBasket"
            />
            <div v-if="!goods.length" class="goods-empty">
                Нет данных
            </div>
        </section>
    </main>
  `,
  methods: {
    handleAddToBasket(data) {
      this.$emit('add', data);
    },
  }
});
}