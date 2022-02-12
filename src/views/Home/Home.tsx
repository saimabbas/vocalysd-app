import React, { FunctionComponent } from 'react';
import { NotificationType } from '../../interface';

const Home: FunctionComponent<{
    setMessageObj: (messageObj: NotificationType) => void;
}> = () => {
    return (
        <div >
            <h1>Home</h1>
        </div>
    )
}

export default Home;