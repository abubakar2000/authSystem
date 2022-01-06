/**
 * This component here will be responsible for registering the user
 * with 
 *    MySQL Database or Firebase
 */
import React, { Component } from 'react'
import firebaseConfig from './config';
//firebase
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEmailChange(event) {
        this.setState({ email: event.target.value });
    }
    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        var auth = getAuth();
        createUserWithEmailAndPassword(auth, this.state.email, this.state.password)
            .then(_ => {
                alert(`${this.state.email} has successfully signed up`);
                console.log(_);
            })
            .catch(_ => {
                let a = "FirebaseError: Firebase: a";
                a = _.toString();
                console.log(_);
                alert(a.substring(25, a.length));
            })
    }

    render() {
        return (
            <div>
                <form>
                    Register with MySQL
                </form>
                --------
                <form onSubmit={this.handleSubmit}>
                    Register with email <br />
                    <input value={this.state.email} onChange={this.handleEmailChange} /> <br />
                    <input value={this.state.password} onChange={this.handlePasswordChange} /> <br />
                    <input type='submit' value="Finish" /> <br />
                </form>
                --------
            </div>
        );
    }
}
