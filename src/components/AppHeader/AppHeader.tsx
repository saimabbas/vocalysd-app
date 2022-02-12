import React, { FunctionComponent } from 'react';
import './AppHeader.css';
import { AppHeaderProps, NotificationType } from '../../interface';
import VocalysLogo from '../../assets/vocal-white-crop.png';
import { MdMenu, MdPerson, MdPowerSettingsNew } from 'react-icons/md';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from 'react-bootstrap';

const AppHeader: FunctionComponent<AppHeaderProps> = (appheaderprops) => {
    const { firebase } = appheaderprops;

    const handleSignOut = async () => {
        console.log('About to Signout');
        await firebase.logout();
    };

    return (
        <div className="AppHeader" id="AppHeader">
            <span>
                <img src={VocalysLogo} alt="VocalysLogo" />
                <MdMenu className="left-menu-tog-icon" />
            </span>
            <Dropdown className="dropdown-box">
                <Dropdown.Toggle id="dropdown-basic">
                    <div className="user-icon-circle">
                        <MdPerson className="uic-icon" />
                    </div>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Saim Abbas</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">
                        <MdPerson className="drop-icon" /> Profile
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleSignOut} href="#/action-3">
                        <MdPowerSettingsNew className="drop-icon" />
                        Sign out
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};

export default AppHeader;
