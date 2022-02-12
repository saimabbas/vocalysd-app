type User = {
  id:  string,
  name:  string,
  roleId:  string,
  roleName: string,
  companyId: string,
  companyName: string,
  create_date:  firebase.default.firestore.Timestamp,
  active_ind:  boolean
};
export  type {User};
