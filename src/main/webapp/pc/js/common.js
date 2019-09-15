// localStorage.setItem('token', '1188992233445566');

let token = localStorage.getItem('token');
let refreshToken = localStorage.getItem('refreshToken');
window.isRefreshing = false

if (!token) {
    token = '';
}
if(!refreshToken){
    refreshToken = '';
}
axios.defaults.baseURL = '/';
/*axios.defaults.headers.common['token'] = token;*/
/*axios.defaults.headers.post['content-Type'] = 'application/json;charset=UTF-8';*/

axios.interceptors.request.use((config) => {

    console.log(config);
    config.headers.token = localStorage.getItem('token');
    return config;
}, (error) => {
    console.log(error);
});
/*
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 这里写清除token的代码
                    setTimeout(function(){
                        //  控制路由跳转或者直接改变href到登录页
                        var that = this;
                        localStorage.setItem('token', refreshToken);
                        let token = localStorage.getItem('token');
                        axios.defaults.headers.common['token'] = token;
                        axios.post('/api/v1/auth/refreshToken').then((result) => {
                            localStorage.setItem('token', result.data.data.token);
                            localStorage.setItem('refreshToken', result.data.data.refreshToken);
                            /!*location.reload(true);*!/
                           /!* if (that.iview.Modal) {
                                var config = {
                                    title: '错误提示',
                                    content: '身份重新验证，请重新执行操作',
                                    onOk: function (data){
                                    }
                                };
                                that.iview.Modal.error(config);
                            } else {
                                alert("您尚未登录，或登录已超时");
                                window.open("login.html", "_parent");
                            }*!/
                        },(error) =>{
                            if (that.iview.Modal) {
                                var config = {
                                    title: '错误提示',
                                    content: '登陆超时',
                                    onOk: function (data) {
                                        window.open("login.html", "_parent");
                                    }
                                };
                                that.iview.Modal.error(config);
                            } else {
                                alert("您尚未登录，或登录已超时");
                                window.open("login.html", "_parent");
                            }
                            localStorage.setItem('token',"");
                            localStorage.setItem('refreshToken', "");
                            window.open("login.html", "_parent");
                        });
                    },1000)
                    break;
                case 500:
                    var that = this;
                    console.log(error.response)
                    if (that.iview.Notice) {
                        var config = {
                            title: '错误提示',
                            desc: error.response.data.error,
                            onOk: function (data) {
                            }
                        };
                        that.iview.Notice.error(config);
                    } else {
                        alert("服务器500错误");
                    }
                    break;
            }
        }
        return Promise.reject(error.response.data)
    });
*/

function setTokens(access_token,refresh_token){
    localStorage.setItem('token', access_token);
    localStorage.setItem('refreshToken', refresh_token);
}

axios.interceptors.response.use(undefined, function (err) {
    var that = this;
    console.log(err)
    console.log(err.response.status);
    if (err.response.status === 401 && err.config && !err.config.__isRetryRequest){
        if(!window.isRefreshing){
            if(localStorage.getItem('refreshToken') === "" && localStorage.getItem('refreshToken') ===null){
                setTimeout(function(){
                    if (that.iview.Modal){
                        var config = {
                            title: '错误提示',
                            content: '登陆超时',
                            onOk: function (data){
                                window.isRefreshing = false;
                                localStorage.setItem('token', "");
                                localStorage.setItem('refreshToken', "");
                                window.open( axios.defaults.baseURL+"pc/login.html","_parent");
                            }
                        };
                        that.iview.Modal.error(config);
                    } else {
                        alert("您尚未登录，或登录已超时");
                        window.open( axios.defaults.baseURL+"pc/login.html","_parent");
                    }
                    // if (that.$confirm){
                    //     // var config = {
                    //     //     title: '错误提示',
                    //     //     content: '登陆超时',
                    //     //     onOk: function (data){
                    //     //         window.isRefreshing = false;
                    //     //         localStorage.setItem('token', "");
                    //     //         localStorage.setItem('refreshToken', "");
                    //     //         window.open("/Oyqwl/login.html", "_parent");
                    //     //     }
                    //     // };
                    //     // that.$confirm(config);
                    // } else {
                    //     alert("您尚未登录，或登录已超时");
                    //     window.open("/Oyqwl/login.html", "_parent");
                    // }
                },1000)
            }
            window.isRefreshing = true;
            localStorage.setItem('token', localStorage.getItem('refreshToken'));
            localStorage.setItem('refreshToken', "");
            /*axios.defaults.headers.common['token'] = token;*/
            return axios.post('pc/api/v1/auth/refreshToken').then(function(success){
                console.log(success)
                setTokens(success.data.data.token,success.data.data.refreshToken)
                err.config.__isRetryRequest = true;
                err.config.headers.token = token;
                window.isRefreshing = false;
                return axios(err.config);
            }).catch(function (error){
                console.log('Refresh login error: ', error);
                window.isRefreshing = false;
                if (that.iview.Modal) {
                    var config = {
                        title: '错误提示',
                        content: '登陆超时',
                        onOk: function (data){
                            localStorage.setItem('token', "");
                            localStorage.setItem('refreshToken', "");
                            window.open( axios.defaults.baseURL+"pc/login.html","_parent");
                        }
                    };
                    that.iview.Modal.error(config);
                    setTimeout("",1000)
                } else {
                    alert("您尚未登录，或登录已超时");
                    window.open( axios.defaults.baseURL+"pc/login.html","_parent");
                }

                // if (that.iview.Modal) {
                //     var config = {
                //         title: '错误提示',
                //         content: '登陆超时',
                //         onOk: function (data){
                //             localStorage.setItem('token', "");
                //             localStorage.setItem('refreshToken', "");
                //             window.open("/Oyqwl/login.html", "_parent");
                //         }
                //     };
                //     that.iview.Modal.error(config);
                //     setTimeout("",1000)
                // } else {
                //     alert("您尚未登录，或登录已超时");
                //     window.open("/Oyqwl/login.html", "_parent");
                // }
                /*localStorage.setItem('token',"");
                localStorage.setItem('refreshToken', "");
                window.open("login.html", "_parent");*/
            });
        }
    }
});
Vue.prototype.$http = axios
