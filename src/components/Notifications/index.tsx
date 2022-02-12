import React, { FunctionComponent } from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import {
  Snackbar, Button
} from '@material-ui/core';
import { NotificationType } from '../../interface';
import PropTypes from 'prop-types';
const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Notification: FunctionComponent<NotificationType & {
  setAlert: () => void;
}> = ({ openAlert, severity, alertMessage, setAlert, action }) => {
  return (
    <Snackbar open={openAlert} autoHideDuration={6000} onClose={() => setAlert()}>
      <Alert severity={severity} action={action ? <Button style={{
        textTransform: 'capitalize',
        textDecoration: 'underline'
      }} color="inherit" size="small" onClick={() => {
        action.action()
        setAlert()
      }}>
        {action.name}
      </Button> : null}>{alertMessage}</Alert>
    </Snackbar>
  )
}

Notification.propTypes = {
  openAlert: PropTypes.bool.isRequired,
  severity: PropTypes.string.isRequired,
  alertMessage: PropTypes.string.isRequired,
  setAlert: PropTypes.func.isRequired,
  action: PropTypes.any
};
export default Notification;