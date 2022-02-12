
type ConversationAnalytics = {
    conversationId:  string,
    sentiment: string,
    direction: string,
    qa_assigned_id: string,
    qa_score: string,
    create_date: firebase.default.firestore.Timestamp,
    last_update_date:  firebase.default.firestore.Timestamp,
  };
  export type {ConversationAnalytics};