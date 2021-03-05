import axios from "axios";

// Add a request interceptor
axios.interceptors.request.use(
    config => {
        const token = 'localStorageService.getAccessToken()';
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC92MVwvbG9naW4iLCJpYXQiOjE2MTQ5NzE5MDIsImV4cCI6MTYxNDk3NTUwMiwibmJmIjoxNjE0OTcxOTAyLCJqdGkiOiJCTHNOMUNLMzU3WXQ2NWRBIiwic3ViIjoxLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.fXGJv373rzmwcksOuNNvNqOTVY2JmlOQDqwx1W1cVM8';
        }
        return config;
    },
    error => {
        Promise.reject(error)
    });

//Add a response interceptor
axios.interceptors.response.use((response) => {
    return response
}, function(error) {
    return Promise.reject(error);
});