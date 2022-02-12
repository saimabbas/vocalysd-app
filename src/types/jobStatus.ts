
type JobStatus = {
    id:  string,
    jobId: string
    status:  string,
    last_update_date:  firebase.default.firestore.Timestamp,
  };
  export type {JobStatus};
  