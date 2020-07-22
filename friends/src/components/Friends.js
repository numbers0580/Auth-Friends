import React, {useState, useEffect} from 'react';
import {axiosWithAuth} from '../utils/axiosWithAuth';

const blankFriends = {
    name: '',
    age: '',
    email: ''
};

const Friends = () => {
    const [friendsList, setList] = useState([]);
    const [friendValue, setFriendValue] = useState(blankFriends);

    const updateFriend = evt => {
        const {name, value} = evt.target;

        setFriendValue({...friendValue, [name]: value});
    };

    const submitFriend = evt => {
        evt.preventDefault();

        axiosWithAuth()
            .post('/api/friends', friendValue)
            .then(friendPosting => {
                console.log('Testing friend being Posted with Auth', friendPosting.data);
                setList(friendPosting.data);
            })
            .catch(fPostError => {
                console.log('Error posting new Friend to API');
            })

        setFriendValue(blankFriends);
    };

    const listStyle = () => {
        return {
            page: {
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between'
            },
            formPage: {
                width: '400px'
            },
            theForm: {
                marginTop: '10px',
                padding: '0 20%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start'
            },
            theInputs: {
                width: '250px',
                margin: '5px 0',
                display: 'flex',
                justifyContent: 'space-between'
            },
            container: {
                width: '100%',
                display: 'flex',
                flexWrap: 'wrap'
            },
            h2: {
                margin: '10px',
                color: 'red',
                fontWeight: 'bold'
            },
            div: {
                width: '240px',
                padding: '10px',
                margin: '10px',
                background: '#19DBB4',
                borderRadius: '20px',
            },
            h3: {
                color: '#000080'
            },
            p1: {
                color: 'white',
                fontWeight: 'bold'
            },
            p2: {
                color: 'blue'
            }
        };
    };

    useEffect(() => {
        axiosWithAuth()
            .get('/api/friends')
            .then(response => {
                console.log('Testing fetched list of friends using Auth', response.data);
                setList(response.data);
            })
            .catch(responseError => {
                console.log('Error fetching friends from API with Auth');
            })
    }, []);

    return (
        <div style={listStyle().page}>
            <div style={listStyle().formPage}>
                <form style={listStyle().theForm} onSubmit={submitFriend}>
                    <h2>Add New Friend</h2>
                    <div style={listStyle().theInputs}>
                        <div><label>Name:</label></div>
                        <div><input type='text' name='name' value={friendValue.name} onChange={updateFriend} /></div>
                    </div>
                    <div style={listStyle().theInputs}>
                        <div><label>Age:</label></div>
                        <div><input type='number' name='age' value={friendValue.age} onChange={updateFriend} /></div>
                    </div>
                    <div style={listStyle().theInputs}>
                        <div><label>Email:</label></div>
                        <div><input type='email' name='email' value={friendValue.email} onChange={updateFriend} /></div>
                    </div>
                    <div>
                        <button>Add Friend</button>
                    </div>
                </form>
            </div>
            <div style={{width: '600px'}}>
                <h2 style={listStyle().h2}>My F.R.I.E.N.D.S</h2>
                <div style={listStyle().container}>
                    {friendsList.map(currentFriend => {
                        return (
                            <div style={listStyle().div} key={currentFriend.id}>
                                <h3 style={listStyle().h3}>{currentFriend.name}</h3>
                                <p style={listStyle().p1}>{currentFriend.age} years old</p>
                                <p style={listStyle().p2}>{currentFriend.email}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default Friends;