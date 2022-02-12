type Spotter = {
  id:  string,
  name:  string,
  usage:  number,
  vocabulary: string[],
  create_date:  firebase.default.firestore.Timestamp,
  last_update_date:  firebase.default.firestore.Timestamp,
  active_ind:  boolean
};
export type {Spotter};
