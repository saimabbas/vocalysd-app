import {MdCloudUpload,MdChatBubble,MdEventSeat} from 'react-icons/md';
export const redirectUrl = process.env.REDIRECT_URL;
import { FaBinoculars } from "react-icons/fa";

export const DRAWER_WIDTH = 30;

export const SIDE_MENU_ROUTES = [
    {
        title: 'Convos',
        path: '/conversations',
        icon: MdChatBubble
    },
    {
        title: 'Campaign',
        path: '/campaign',
        icon: MdEventSeat
    },{
        title: 'Spotters',
        path: '/spotters',
        icon: FaBinoculars
    }, {
        title: 'Upload',
        path: '/upload',
        icon: MdCloudUpload
    }, 
];