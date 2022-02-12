import React, { createContext } from 'react';
const FirebaseContext = createContext(null);

export const withFirebase = (Component: React.ComponentType) => (props: any) => (
    <FirebaseContext.Consumer>
        {firebase => <Component {...props} firebase={firebase} />}
    </FirebaseContext.Consumer>
)

export default FirebaseContext;