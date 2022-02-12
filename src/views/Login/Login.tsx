import React, { FunctionComponent, useState } from 'react';
import { PublicComponentPropsType } from '../../interface';
import icon from './../../assets/vocal-white.png';
import { withFirebase } from '../../firebase';
import './Login.css';

const Login: FunctionComponent<PublicComponentPropsType> = (loginProps) => {
    const { firebase, setMessageObj } = loginProps;
    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);

    /**
     * This method user to redirect page for login
     */

    const handleLogin = async (event) => {
        event.preventDefault();
        await firebase.login(email, password);
        setMessageObj({
            openAlert: true,
            severity: 'success',
            alertMessage: 'Login successfully.',
        });
    };

    return (
        <div className="login__container">
            <div className="login">
                <div className="login_main">
                    <h1 className="login_h1">LOGIN</h1>
                    <p className="login_p">Please enter your Username and Password.</p>
                    <form onSubmit={handleLogin}>
                        <label className="login_fields">Username</label>
                        <input
                            placeholder="test@gmail.com"
                            className="login_input_field"
                            type="email"
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        <label className="login_fields">Password</label>
                        <input
                            placeholder="password"
                            className="login_input_field"
                            type="password"
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        <input className="login_checkbox" type="checkbox" value="rememberme" />
                        Remember Me
                        <button className="login_btn" type="submit">
                            LOGIN
                        </button>
                        <p className="login_reset">
                            Forgot your Password? reset it <a style={{ color: 'red', cursor: 'pointer' }}>here.</a>
                        </p>
                    </form>
                    <p className="login_p2" style={{ fontSize: 12, padding: '20px 5px 8px 5px ' }}>
                        Privacy Policy | Terms&Conditions
                    </p>
                </div>

                <div className="login_sidebar">
                    <div className="login_right">
                        <h1 className="login_h1" style={{ marginTop: '15%' }}>
                            New User?
                        </h1>
                        <p style={{ marginBottom: '87%', marginTop: '5%', padding: '0px 50px' }}>
                            Please contact your IT administrator to register your account.
                        </p>
                        <img src={icon} height="60" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withFirebase(Login);
