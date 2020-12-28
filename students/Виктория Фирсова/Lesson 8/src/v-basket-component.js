exports.init = function()
{
Vue.component('v-basket', {
  props: ['goods'],
  template: `
    <div class="cart">
        <div class="cart-item" v-for="item in goods">
            <p class="cart-item__title">{{item.title}}</p>
            <p>{{item.quantity}} x {{item.price}}</p>
            <button @click="$emit('delete', item.id)">Удалить</button>
        </div>
    </div>
  `,
});
}