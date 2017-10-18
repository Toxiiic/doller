var vm = new Vue({
    el: '#app',
    data: {
        username: '',
        password: ''
    },
    methods: {
        login: function() {
            axios.post('/api/login', {
                username: this.username,
                password: this.password
            });
        }
    }
});