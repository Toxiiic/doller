// import qs from 'querystring';

var vm = new Vue({
    el: '#app',
    data: {
        username: '',
        password: ''
    },
    methods: {
        login: function() {
            // var params = new URLSearchParams();
            // params.append('username',this.username);
            // params.append('password', this.password);
            // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
            axios.post('/api/login', {
                username: this.username,
                password: this.password
            }).then(function(res) {
                console.log(res);
                if(res.data.result.success) {
                    location.reload();
                } else {
                    console.log(res.data.result.err);
                }
            }).catch(function(err) {
                console.log(err);
            });
        }
    }
});