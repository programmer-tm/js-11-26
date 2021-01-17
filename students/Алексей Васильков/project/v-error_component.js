'use strict';

exports.init = function () {
    Vue.component('v-error', {
        props: ['message'],
        template: `
            <div class="error">
                Ошибка! {{message}}
            </div>
        `,
    });
}
