
export const FETCH_ACCESS_TOKEN = process.env.REACT_APP_FIREBASE_URL + '/fetchAccessToken';

// Job status Calls
export const GET_JOB_STATUS = process.env.REACT_APP_SYMBL_BASE_URL+'/job/{jobId}';
export const WEB_HOOK_URL = process.env.REACT_APP_FIREBASE_URL + '/symblCallback';


// Upload Calls
export const POST_AUDIO  = process.env.REACT_APP_SYMBL_BASE_URL+'/process/audio';
export const POST_VIDEO  = process.env.REACT_APP_SYMBL_BASE_URL+'/process/video';

// Trackers
export const POST_TRACKERS = process.env.REACT_APP_SYMBL_BASE_URL+'/manage/trackers';
export const GET_TRACKER_BY_ID = process.env.REACT_APP_SYMBL_BASE_URL+'/manage/tracker/{{trackerid}}';

// Conversation API Calls
export const GET_MESSAGES = process.env.REACT_APP_SYMBL_BASE_URL+'/conversations/{conversationId}/messages?sentiment=true';
export const DELETE_CONVERSATION =process.env.REACT_APP_SYMBL_BASE_URL+'/conversations/{{conversation_id}}/delete';