/**
 * This component will be responsible for 
 * logging in the user to the system using
 *    Firebase or MySQL
 */
import React, { Component } from 'react'
import firebaseConfig from './config';
import { FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect } from 'firebase/auth';

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email:"",
            password:"",
        }
        this.handleSubmitWithEmailAndPassword = this.handleSubmitWithEmailAndPassword.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSigninWithGoogle = this.handleSigninWithGoogle.bind(this);
        this.handleSigninWithFacebook = this.handleSigninWithFacebook.bind(this);
    }
    handleSubmitWithEmailAndPassword(event){
        const auth = getAuth();
        signInWithEmailAndPassword(auth,this.state.email,this.state.password)
        .then(_=>{
            alert('Signed In');
            console.log(_);
        })
        .catch(_=>{
            alert(_.toString());
        });
        event.preventDefault();
    }
    handleEmailChange(event){
        this.setState({email:event.target.value});
    }
    handlePasswordChange(event){
        this.setState({password:event.target.value});
    }
    handleSigninWithGoogle(event){
        const auth = new getAuth();
        const provider = new GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        signInWithPopup(auth,provider)
        .then((result)=>{
            const credentials = GoogleAuthProvider.credentialFromResult(result);
            const token = credentials.accessToken;
            const user = result.user;
            alert("Signed In")
        })
        .catch((error) => {
            console.log(error.message);
            alert("Error with gauth")
        })
    }
    handleSigninWithFacebook(event){
        // 1035046307050522 appid
        // 554e2840c508aa4aee1dfc8653bbc5dc appsecret
        // https://authsystem-f085e.firebaseapp.com/__/auth/handler
        const auth = new getAuth();
        const provider = new FacebookAuthProvider();
        signInWithPopup(auth,provider)
        .then((result)=>{
            const user = result.user;

            const credentials = FacebookAuthProvider.credentialFromResult(result);
            const token = credentials.accessToken;
            alert("Signed In");
        })
        .catch((error) => {
            alert(error.message)
        });
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmitWithEmailAndPassword}>
                    Login with email and password <br/>
                    <input value={this.state.email} onChange={this.handleEmailChange}/> <br/>
                    <input value={this.state.password} onChange={this.handlePasswordChange}/> <br/>
                    <input type='submit' value={"login"}/>
                </form><br/>
                ------ <br/>
                <button onClick={this.handleSigninWithGoogle}>Sign in With Google</button> <br/>
                ------ <br/>
                <button onClick={this.handleSigninWithFacebook}>Sign in With Facebook</button> <br/>
                ------ <br/>
            </div>
        )
    }
}
