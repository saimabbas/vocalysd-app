import React, { FunctionComponent } from 'react';
import Logo from '../../assets/vocal-white.png';
import './Reset.css';

const Reset: FunctionComponent = () => {
    return (
        <div className="reset__pwd__main">
            <div className="reset__pwd">
                <div className="reset__pwd__left">
                    <div className="reset__pwd__left__child">
                        <h2>Let’s start over</h2>
                        <h5>
                            Reset your password using
                            <br />
                            your OTP to re-access the <br /> Vocalysd Vault.
                        </h5>
                    </div>

                    <img src={Logo} />
                </div>
                <div className="reset__pwd__right">
                    <div className="reset__pwd__right__title">
                        <h1>RESET YOUR PASSWORD</h1>
                        <h4>Oops, forgot your password?</h4>
                    </div>
                    <div className="part__box">
                        <h5 className="label__title">Enter the email address you used to register your account</h5>
                        <div className="part1">
                            <div>
                                <input className="input" type="email" placeholder="Email Address" />
                                <h5>
                                    Didn’t receive an OTP? <span>Resend</span>
                                </h5>
                            </div>
                            <button>SEND</button>
                        </div>
                    </div>

                    <div className="part__box">
                        <div className="part2">
                            <div>
                                <h4 className="label__title">Enter your new password below</h4>
                                <input className="input" type="password" placeholder="Password" />
                                <input className="input" type="password" placeholder="Re-enter Password" />
                            </div>

                            <div className="reset__otp">
                                <h4 className="label__title">OTP</h4>
                                <input
                                    className="input"
                                    type="number"
                                    placeholder="00000"
                                    pattern="/^-?\d+\.?\d*$/"
                                    maxLength={5}
                                    max={5}
                                />
                            </div>
                        </div>
                    </div>
                    <h6 className="password__details">
                        Passwords must contain at least: 1 letter, 1 number, 1 capital letter and 1 special character.
                        Minimum length of 8 characters.
                    </h6>

                    <button>RESET PASSWORD</button>
                    <h5 className="t__s">Privacy Policy | Terms & Conditions</h5>
                </div>
            </div>
        </div>
    );
};

export default Reset;
