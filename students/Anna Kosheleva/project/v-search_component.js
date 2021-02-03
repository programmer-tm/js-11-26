'use strict';

exports.init = function () {
    Vue.component('v-search', {
        props: ['value'],
        template: `
            <form>
                <input class="search" :value="value" @input="$emit('input', $event.target.value)" type="text" placeholder="Что будем искать?">
                <button class="search_button" @click="filteredGoods()">Найти</button>
            </form>
        `,
    });
}