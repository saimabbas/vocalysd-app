
import firebase from 'firebase/app'
import React from 'react';

export interface IFirebaseContext {
    firebase: firebase.app.App,
    authProviders: string[]
}

export const FirebaseContext = React.createContext({} as IFirebaseContext)