import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js';



const app = createApp({

    data() {
        return {
            url: 'https://vue3-course-api.hexschool.io/v2',
            path: 'steven1220',
            products: [],
            temp: {}
        }
    },

    methods: {
        checkLogin() {
            axios.post(`${this.url}/api/user/check`)
                .then(res => {
                    console.log(res.data);
                    this.getAllProducts();
                })
                .catch(error => {
                    // console.log(error.data.message);
                    alert(error.data.message)
                    window.location.href = 'index.html';
                })
        },
        getAllProducts() {
            axios.get(`${this.url}/api/${this.path}/admin/products`)
                .then(res => {
                    console.log(res.data.products);
                    this.products = res.data.products;
                })
                .catch(error => {
                    console.log(error.data);
                })

        },
        checkProductDetail(item) {
            this.temp = item;
        },
        changeState(item) {
            item.is_enabled = !item.is_enabled;
        }
    },
    //生命週期
    created() {
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        // console.log(token);
        axios.defaults.headers.common['Authorization'] = token;
        this.checkLogin();
    },


}).mount('#app');