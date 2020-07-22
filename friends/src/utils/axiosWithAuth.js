import axios from 'axios';

export const axiosWithAuth = () => {
    
    const token = localStorage.getItem('token');
    return axios.create({
        headers: {Authorization: token},
        baseURL: 'http://localhost:5000'
    });
    

    /*
    const token = JSON.parse(window.localStorage.getItem('token'));
    return axios.create({
        headers: {Authorization: token}
    });
    */
};