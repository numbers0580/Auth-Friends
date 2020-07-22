import React, {useState} from 'react';
import {axiosWithAuth} from '../utils/axiosWithAuth';
import {useHistory} from 'react-router-dom';
//import Loader from 'react-loader-spinner';

const blankFields = {
    username: '',
    password: ''
};

const Login = () => {
    const [entries, setEntries] = useState(blankFields);
    const history = useHistory();

    const updateEntries = e => {
        const name = e.target.name;
        const value = e.target.value;

        setEntries({...entries, [name]: value});
    };

    const submitLogin = e => {
        e.preventDefault();

        axiosWithAuth()
            .post('/api/login', entries)
            .then(posting => {
                console.log('posting.data is', posting.data);
                console.log('posting.data.payload is', posting.data.payload);
                localStorage.setItem('token', posting.data.payload);
                history.push('/friends');
            })
            .catch(loginError => {
                console.log('Error with login');
            })

        setEntries(blankFields);
    };

    return (
        <form onSubmit={submitLogin}>
            <div>
                <div><label>Username:</label></div>
                <div><input type='text' name='username' value={entries.username} onChange={updateEntries} /></div>
            </div>
            <div>
                <div><label>Password:</label></div>
                <div><input type='password' name='password' value={entries.password} onChange={updateEntries} /></div>
            </div>
            <div>
                <button>Login!</button>
            </div>
        </form>
    );
};

export default Login;