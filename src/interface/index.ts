import Firebase from "../firebase";
import app from 'firebase/app'
import { User } from "../types/user";
import { Company } from "../types/company";
export interface NotificationType {
    openAlert: boolean;
    severity: string;
    alertMessage: string;
    action?: {
        action: () => void;
        name: string;
    };
}

export interface PublicComponentPropsType {
    firebase: Firebase;
    setMessageObj?: (messageObj: NotificationType) => void;
}


export interface ConversationTypeProps {
    firebase: Firebase;
    setMessageObj: (messageObj: NotificationType) => void;
    loggedInUser: User;
    currentCompany: Company;
    history: any;
}

export interface UploadTypeProps {
    firebase: Firebase;
    setMessageObj: (messageObj: NotificationType) => void;
    loggedInUser: User;
    currentCompany: Company;
    history: any;
}

export interface AppHeaderProps {
    firebase: Firebase;
    setMessageObj: (messageObj: NotificationType) => void;
    loggedInUser: User;
    currentCompany: Company;
}
