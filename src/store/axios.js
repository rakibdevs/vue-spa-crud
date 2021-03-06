import axios from "axios";

// Add a request interceptor
axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    error => {
        Promise.reject(error)
    });

//Add a response interceptor
axios.interceptors.response.use((response) => {
    if(response.data.status == 401){
        this.$router.push({ name: 'login' })
    }
    return response
}, function(error) {
    return Promise.reject(error);
});

/*axios.interceptors.response.use(undefined, function (err) {
    console.log(err);

    return new Promise(function () {
      if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
      // if you ever get an unauthorized, logout the user
        //this.$store.dispatch(AUTH_LOGOUT)
      // you can also redirect to /login if needed !
      console.log('um');
      }
      throw err;
    });
  });*/
