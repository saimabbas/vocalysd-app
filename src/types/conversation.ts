
type Conversation = {
  id:  string,
  jobId:  string,
  conversationId:  string,
  status: string,
  spotterId: string,
  spotterName: string,
  direction: string,
  agentId: string,
  agentName: string
  qa_assigned_id: string,
  qaName:string,
  fileName: string,
  fileSize: string,
  source: string,
  fileType:string,
  duration: string,
  create_date:  firebase.default.firestore.Timestamp,
  last_update_date:  firebase.default.firestore.Timestamp,
  active_ind:  boolean
};
export type {Conversation};
