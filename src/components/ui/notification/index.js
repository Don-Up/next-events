import classes from './index.module.css';
import {useNotificationContext} from "../../../store/notification-context";

function Notification(props) {

    const {hideNotification} = useNotificationContext()
    const {title, message, status} = props;

    let statusClasses = '';

    if (status === 'success') {
        statusClasses = classes.success;
    }

    if (status === 'error') {
        statusClasses = classes.error;
    }

    if (status === 'pending') {
        statusClasses = classes.pending;
    }

    const activeClasses = `${classes.notification} ${statusClasses}`;

    return (
        <div className={activeClasses} onClick={hideNotification}>
            <h2>{title}</h2>
            <p>{message}</p>
        </div>
    );
}

export default Notification;