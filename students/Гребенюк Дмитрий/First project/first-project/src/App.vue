<template>
    <div id="app">
        <Header :search="searchValue" :v-basket-goods="basketGoods" :v-visible="visible" @remove="removeItem" @visible="visible = !visible" v-model="searchValue">
        </Header>
        <Goods @handle-add="addToBasket" :goods="filteredGoods"></Goods>
        <!--        <v-error class="v-error" v-if="errorStatus" :errorStatus="errorStatus"></v-error>-->
    </div>
</template>

<script>
    import Header from './components/Header.vue'
    import Goods from './components/Goods.vue'
    const API = 'http://localhost:3000/api';
    const sendRequest = (path, method = 'POST', body = {}) => {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.timeout = 10000;
            xhr.ontimeout = () => {
                console.log('timeout!');
            }
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.responseText));
                    } else {
                        console.log('Error!', xhr.responseText);
                        reject(xhr.responseText);
                    }
                }
            }
            xhr.open(method, `${API}/${path}`);
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.send(JSON.stringify(body));
        });

    }

    export default {
        name: 'App',
        components: {
            Header,
            Goods,
        },
        data() {
            return {
                goods: [],
                basketGoods: [],
                searchValue: '',
                visible: false,
                errorStatus: false
            }
        },
        mounted() {
            this.fetchData();
            this.fetchBasketData();
        },

        methods: {
            fetchData() {
                return new Promise((resolve) => {
                    sendRequest('catalog', 'GET')
                        .then(
                            (data) => {
                                this.goods = data;
                                resolve();
                            }
                        )
                        .catch(
                            () => {
                                this.errorStatus = true;
                                resolve();
                            }
                        )
                })

            },
            fetchBasketData() {
                return new Promise((resolve) => {
                    sendRequest('basket', 'GET')
                        .then(
                            (data) => {
                                this.basketGoods = data;
                                resolve();
                            }
                        )
                        .catch(
                            () => {
                                this.errorStatus = true;
                                resolve();
                            }
                        )

                })
            },
            addToBasket(item) {
                sendRequest('basket', 'POST', item)
                    .then((result) => {
                        console.log('Result', result);
                        if (!result.success) {
                            console.log('addToBasket error');
                            return;
                        }
                        const index = this.basketGoods.findIndex((basketItem) => basketItem.id === item.id);
                        if (index > -1) {
                            this.basketGoods[index].quantity += 1;
                            // this.basketGoods[index] = { ...this.basketGoods[index], quantity: this.basketGoods[index].quantity + 1 };
                        } else {
                            this.basketGoods.push({
                                ...item,
                                quantity: 1
                            });
                        }
                        console.log(this.basketGoods);
                    })
//                    .catch(
//                        () => {
//                            this.errorStatus = true;
//                            resolve();
//                        }
//                    )

            },
            removeItem(item) {
                sendRequest('basket-remove', 'POST', item)
                    .then((result) => {
                        console.log('Result', result);
                        if (!result.success) {
                            console.log('Remove to basket error');
                            return;
                        }
                        const index = this.basketGoods.findIndex((basketItem) => basketItem.id === item.id);
                        if (index > -1) {
                            if (this.basketGoods[index].quantity > 1) {
                                this.basketGoods[index].quantity -= 1;
                            } else {
                                this.basketGoods = this.basketGoods.filter((goodsItem) => goodsItem.id !== parseInt(item.id));
                            }

                        }
                        console.log(item);
                    })
            }

        },
        computed: {
            filteredGoods() {
                const regexp = new RegExp(this.searchValue.trim(), 'i');
                return this.goods.filter((goodsItem) => regexp.test(goodsItem.title));
            },
            totalPrice() {
                let sum = 0;
                this.goods.map(item => {
                    sum += item.price;
                    console.log(sum)
                });
                return sum;

            }
        }

    }

</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    * {
        margin: 0;
        padding: 0;
    }

    header {
        position: relative;
        margin: 0 auto;
        max-width: 1140px;
        display: flex;
        justify-content: space-between;
        background-color: #99CC99;
        align-items: center;
        padding: 2%;
    }

    .logo {
        font-size: 20px;
        color: #333333;
    }

    .cart-button {
        width: 90px;
        height: 25px;
        background-color: #CCCCCC;
        border: 0;
        border-radius: 7px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);


    }

    .search {
        height: 20px;
        padding: 0.5%;
    }

    .basket {
        top: 60px;
        right: 20px;
        width: 200px;
        position: absolute;
        border: 1px solid black;
        padding: 1%;
        background-color: #CCFF99;
    }

    .itemBasket {
        margin-top: 15px;
        text-align: left;
    }

    .remove {
        margin-top: 4%;
        padding: 1%;
    }

    main {
        margin: 0 auto;
        max-width: 1140px;
        padding: 2%;
        background-color: #CCFF99;
        
    }

    .goods {
        display: flex;
        justify-content: space-between;
         max-width: 1140px;
        flex-wrap: wrap;
    }

    .goodsItem {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100px;
        height: 70px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
    }

    .add-to-basket {
        width: 100px;
        padding: 1%;
    }

    .v-error {
        position: absolute;
        top: 100px;
        left: 20px;
    }

</style>
