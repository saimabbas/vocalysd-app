import React, { FunctionComponent, Suspense, useEffect, useState, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, RouteChildrenProps } from 'react-router-dom';
import { withFirebase } from './firebase';
import Login from './views/Login/Login';
import Notification from './components/Notifications';
import { makeStyles } from '@material-ui/core/styles';
import AppHeader from './components/AppHeader/AppHeader';
import Conversations from './views/Conversations/Conversations';
import Spotter from './views/Spotter/Spotter';
import Upload from './views/Upload/Upload';

import PropTypes from 'prop-types';
import { NotificationType, PublicComponentPropsType } from './interface';
import ViewConversation from './views/ViewConversation/ViewConversation';
import AppLeftSideBar from './components/AppLeftSideBar/AppLeftSideBar';
import { FETCH_ACCESS_TOKEN } from './config/api-constant';
import { API } from './utils/api';
import { Company } from './types/company';

const useStyles = makeStyles(() => ({
    root: {
        height: '100%',
    },
}));

const AuthComponent: FunctionComponent<
    RouteChildrenProps & {
        firebase;
    }
> = ({ firebase }) => {
    const [messageObj, setMessageObj] = useState<NotificationType>({
        openAlert: false,
        severity: undefined,
        alertMessage: '',
    });
    const api = new API(setMessageObj);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [currentCompany, setCurrentCompany] = useState(null);
    const [authenticateLoading, setAuthenticateLoading] = useState(true);
    const classes = useStyles();
    /**
     * This method used to get access token and set into local storage
     */
    const fetchAccessToken = async () => {
        const result = await api.get(`${FETCH_ACCESS_TOKEN}`);
        if (result) {
            localStorage.setItem('token', result.token);
        }
    };

    useEffect(() => {
        firebase.auth.onAuthStateChanged(async (userAuth) => {
            if (userAuth) {
                if (!localStorage.getItem('token')) {
                    await fetchAccessToken();
                }
                const companyResult = await firebase.getCurrentCompany('Vocalysd');
                const data = companyResult.docs.map((doc) => doc.data()) as Company[];
                const company: Company = data[0];
                console.log('company==' + company.id);
                setCurrentCompany(company);
                setLoggedInUser(userAuth);
                setAuthenticateLoading(false);
            }
        });
    }, []);

    /* if (authenticateLoading) {
        return (
            <Fragment>
                <div>Loading...</div>
            </Fragment>
        );
    } */

    return !firebase.currentUser() ? (
        <Fragment>
            <main className="main-container">
                <Notification
                    {...messageObj}
                    setAlert={() => {
                        setMessageObj({
                            alertMessage: '',
                            openAlert: false,
                            severity: undefined,
                        });
                    }}
                />
                <div className={classes.root}>
                    <AppHeader
                        {...{
                            currentCompany,
                            loggedInUser,
                            firebase,
                            setMessageObj,
                        }}
                    />
                    <div className="app-main-container">
                        <AppLeftSideBar />
                        <Switch>
                            <Route
                                path={`/home`}
                                render={(props) => (
                                    <Conversations
                                        {...{
                                            currentCompany,
                                            loggedInUser,
                                            firebase,
                                            setMessageObj,
                                        }}
                                        {...props}
                                    />
                                )}
                            />
                            <Route
                                path={`/conversations`}
                                render={(props) => (
                                    <Conversations
                                        {...{
                                            currentCompany,
                                            loggedInUser,
                                            firebase,
                                            setMessageObj,
                                        }}
                                        {...props}
                                    />
                                )}
                            />
                            <Route
                                path={`/spotters`}
                                render={(props) => (
                                    <Spotter
                                        {...{
                                            currentCompany,
                                            loggedInUser,
                                            firebase,
                                            setMessageObj,
                                        }}
                                        {...props}
                                    />
                                )}
                            />
                            <Route
                                path={`/transcript`}
                                render={(props) => (
                                    <ViewConversation
                                        {...{
                                            currentCompany,
                                            loggedInUser,
                                            firebase,
                                            setMessageObj,
                                        }}
                                        {...props}
                                    />
                                )}
                            />
                            <Route
                                path={`/upload`}
                                render={(props) => (
                                    <Upload
                                        {...{
                                            currentCompany,
                                            loggedInUser,
                                            firebase,
                                            setMessageObj,
                                        }}
                                        {...props}
                                    />
                                )}
                            />
                            <Route path="*">
                                <Redirect to={`/home`} />
                            </Route>
                        </Switch>
                    </div>
                </div>
            </main>
        </Fragment>
    ) : (
        <Fragment>
            <Notification
                {...messageObj}
                setAlert={() => {
                    setMessageObj({
                        alertMessage: '',
                        openAlert: false,
                        severity: undefined,
                    });
                }}
            />
            <PublicComponent
                {...{
                    firebase,
                    setMessageObj,
                }}
            />
        </Fragment>
    );
};
AuthComponent.propTypes = {
    firebase: PropTypes.object.isRequired,
};
const PublicComponent: FunctionComponent<PublicComponentPropsType> = (loginProps) => {
    const { firebase, setMessageObj } = loginProps;
    return (
        <Switch>
            <Route
                path={'/login'}
                render={(props) => (
                    <Login
                        {...{
                            firebase,
                            setMessageObj,
                        }}
                        {...props}
                    />
                )}
            />
            <Route path="*">
                <Redirect to={'/login'} />
            </Route>
        </Switch>
    );
};
PublicComponent.propTypes = {
    setMessageObj: PropTypes.func.isRequired,
};

const Routes = () => {
    return (
        <Suspense fallback={'loading...'}>
            <Router>
                <Switch>
                    <Route path="/" component={withFirebase(AuthComponent)} />
                </Switch>
            </Router>
        </Suspense>
    );
};

export default Routes;
