import LeftMenuItem from '../LeftMenuItem/LeftMenuItem';
import React, { FunctionComponent, Fragment } from 'react';
import './AppLeftSideBar.css';
import { TogData } from '../../App';
import { withFirebase } from '../../firebase';
import {
    MdHome,
    MdDashboard,
    MdPerson,
    MdCloudUpload,
    MdChatBubble,
    MdEventSeat,
    MdHelp,
    MdTimer,
} from 'react-icons/md';
import { FaBinoculars } from 'react-icons/fa';
import { withRouter, NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { NotificationType } from '../../interface';

const useStyles = makeStyles(() => ({
    mainTitle: {
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        width: '100%',
    },
    menuTitle: {
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        width: '100%',
    },
    activeMenu: {
        opacity: 0.5,
    },
}));

const AppLeftSideBar = () => {
    const classes = useStyles();
    return (
        <div className="AppLeftSideBar" id="AppLeftSideBar">
            <NavLink key={'/home'} to={'/home'} activeClassName={classes.activeMenu} className={classes.mainTitle}>
                <LeftMenuItem text="home">
                    <MdHome className="mlm_icon" />
                </LeftMenuItem>
            </NavLink>
            <NavLink
                key={'/dashboard'}
                to={'/dashboard'}
                activeClassName={classes.activeMenu}
                className={classes.mainTitle}
            >
                <LeftMenuItem text="my dash">
                    <MdDashboard className="mlm_icon" />
                </LeftMenuItem>
            </NavLink>
            <NavLink
                key={'/account'}
                to={'/account'}
                activeClassName={classes.activeMenu}
                className={classes.mainTitle}
            >
                <LeftMenuItem text="account">
                    <MdPerson className="mlm_icon" />
                </LeftMenuItem>
            </NavLink>
            <NavLink key={'/upload'} to={'/upload'} activeClassName={classes.activeMenu} className={classes.mainTitle}>
                <LeftMenuItem text="upload">
                    <MdCloudUpload className="mlm_icon" />
                </LeftMenuItem>
            </NavLink>
            <NavLink
                key={'/conversations'}
                to={'/conversations'}
                activeClassName={classes.activeMenu}
                className={classes.mainTitle}
            >
                <LeftMenuItem text="convos">
                    <MdChatBubble className="mlm_icon" />
                </LeftMenuItem>
            </NavLink>
            <NavLink
                key={'/campaign'}
                to={'/campaign'}
                activeClassName={classes.activeMenu}
                className={classes.mainTitle}
            >
                <LeftMenuItem text="Campaign">
                    <MdEventSeat className="mlm_icon" />
                </LeftMenuItem>
            </NavLink>
            <NavLink
                key={'/spotters'}
                to={'/spotters'}
                activeClassName={classes.activeMenu}
                className={classes.mainTitle}
            >
                <LeftMenuItem text="spotters">
                    <FaBinoculars className="mlm_icon" />
                </LeftMenuItem>
            </NavLink>
            <NavLink key={'/faq'} to={'/faq'} activeClassName={classes.activeMenu} className={classes.mainTitle}>
                <LeftMenuItem text="faq">
                    <MdHelp className="mlm_icon" />
                </LeftMenuItem>
            </NavLink>
            <NavLink key={'/tips'} to={'/tips'} activeClassName={classes.activeMenu} className={classes.mainTitle}>
                <LeftMenuItem text="tips">
                    <MdTimer className="mlm_icon" />
                </LeftMenuItem>
            </NavLink>
        </div>
    );
};
export default withRouter(withFirebase(AppLeftSideBar));
