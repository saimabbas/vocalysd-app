import app from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/database';
import { UPLOAD } from '../config/app-constants';
import { Conversation } from '../types/conversation';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

class Firebase {
  auth: app.auth.Auth;
  fireStore: app.firestore.Firestore;
  storage: app.storage.Storage;

  constructor() {
    if (!app.apps.length) {
      app.initializeApp(config);
    }
    this.auth = app.auth();
    this.fireStore = app.firestore();
    this.storage = app.storage();
  }

  /**
   * This method used for get current user object
   * @returns current user object
   */
  currentUser(): app.User {
    return this.auth.currentUser;
  }

    /**
   * This method used for login with username and password
   */
  /**
   * This method used for delete conversation by ID
   * @returns return conversation data
   */
   async login(email:string,password:string) : Promise<void>{
     
    this.auth.signInWithEmailAndPassword(email,password)
    .then((userCredential:app.auth.UserCredential) => {
      this.auth.currentUser = userCredential.user;
      return Promise.resolve('Login Success');
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      if (errorCode === 'auth/wrong-password'){
        return Promise.reject('Invalid password');
      } else if (errorCode === 'auth/invalid-email'){
        return Promise.reject('Invalid username');
      } else if (errorCode === 'auth/user-disabled'){
        return Promise.reject('This user has been disabled. Please contact your system administrator')
      } else{
        return Promise.reject('This user does not exist');
      }
    });
  }

      /**
   * This method used for login with username and password
   */
  /**
   * This method used for delete conversation by ID
   * @returns return conversation data
   */
   async logout() : Promise<void>{
    await this.auth.signOut();
  }
  
    /**
   * Method to return Company Collection
   * @returns 
   */
     getBaseCompanyRef(): app.firestore.CollectionReference {
      return this.fireStore.collection('company');
   }
   
 
   /**
    * Method to return Roles Collection
    * @returns 
    */
   getBaseRolesRef(): app.firestore.CollectionReference {
     return this.fireStore.collection('roles');
   }

   getBaseUserRef(companyId:string): app.firestore.CollectionReference {
    return this.fireStore.collection(`company/${companyId}/user`);
  }

  getBaseTrackersRef(companyId:string): app.firestore.CollectionReference {
    return this.fireStore.collection(`company/${companyId}/trackers`);
  }

  getBaseConversationsRef(companyId:string): app.firestore.CollectionReference {
    return this.fireStore.collection(`company/${companyId}/conversations`);
  }

    /**
   * This method used for get current user object
   * @returns current user object
   */
     getCurrentUserId(): string {
       
      return this.currentUser().uid;
      //return '1aYvh4f6odRj4epmekS7tWWRqm02'; //hardcoded user id
    }

    async getCurrentUserDetails(companyId:string): Promise<app.firestore.DocumentData> {
      console.log('userid= '+JSON.stringify(this.auth.currentUser.email));
      return new Promise((resolve, reject) => {
       const userdetailsTask =  this.getBaseUserRef(companyId).doc(this.auth.currentUser.uid).get(); 
       userdetailsTask.then((doc) => {
      if(doc.exists){
        console.log('userdata ='+doc.data());
        resolve(doc.data());
      }else{
        console.log('User does not exist');
        reject('User does not exist');
      }
       })
      });
    }

  getCurrentCompany(companyName: string): Promise<app.firestore.QuerySnapshot<app.firestore.DocumentData>>{
    return this.getBaseCompanyRef().where('name','==',companyName).get();
  }

  getCurrentTime(): app.firestore.Timestamp{
    return app.firestore.Timestamp.now();
  }

  /**
   * This method used to add
   */
  async addConversation(companyId: string,conversation: Conversation): Promise<void> {
    try {
      const autoID: string = this.getBaseConversationsRef(companyId).doc().id;
      conversation.id = autoID;
      return await this.getBaseConversationsRef(companyId)
        .doc(autoID).set(conversation)
    } catch (error) {
      console.error(error);
      const message = 'Failed to create a new conversation';
      return Promise.reject(message);
    }
  }
  /**
   * This method used for get uploaded conversations
   * @returns return conversations list
   */
  fetchUploadConversations(companyId:string): app.firestore.Query<app.firestore.DocumentData>  {
    return this.getBaseConversationsRef(companyId).where('source', '==', UPLOAD).where('qa_assigned_id', '==', this.getCurrentUserId());
    
  }

  /**
   * This method used for get conversation by ID
   * @returns return conversation data
   */
  async fetchConversationById(companyId:string,conversationId:string):  Promise<app.firestore.DocumentSnapshot> {
    return await this.getBaseConversationsRef(companyId).doc(conversationId).get();
  }

  /**
   * This method used for delete conversation by ID
   * @returns return conversation data
   */
  async deleteConversationById(companyId:string,conversationId:string): Promise<void> {
    return await this.getBaseConversationsRef(companyId).doc(conversationId).delete();
  }

  /**
   * This method used for update conversation by ID
   * @returns return conversation data
   *
   */
  async updateConversation(companyId:string,conversationId:string, updateObj:Conversation): Promise<void> {
    return await this.getBaseConversationsRef(companyId).doc(conversationId).update(updateObj);
  }

  /**
   * This method used for get all conversation
   * @returns return conversation list
   */
   async fetchConversations(companyId:string): Promise<app.firestore.Query<app.firestore.DocumentData>> {
     return await this.fireStore.collection(`company/${companyId}/conversations`).where('qa_assigned_id',"==",this.getCurrentUserId())
     .limit(10);
  }
    /**
   * This method used for get all conversation
   * @returns return conversation list
   */
     async fetchJobStatusbyId(companyId:string,id:string): Promise<app.firestore.Query<app.firestore.DocumentData>> {
      return await this.fireStore.collection(`company/${companyId}/jobStatus`).where('id',"==",id);
   }

       //Handle waiting to upload each file using promise
       async uploadConversationFileAsPromise(fileType:string, file:any, id: string,companyId:string) : Promise<void>{
        return new Promise((resolve, reject) => {
            const uploadTask = this.storage.ref(`files/${companyId}`).child(fileType).child(id).put(file);
            uploadTask.on('state_changed',
                () => {
                    console.log('State changed')
                },
                (error) => {
                  switch (error.code) {
                    case 'storage/unauthorized':
                      // User doesn't have permission to access the object
                      reject('User does not have permissions to access the Storage');
                      break;
                    case 'storage/canceled':
                      // User canceled the upload
                      reject('User cancelled the File Upload');
                      break;
            
                    // ...
            
                    case 'storage/unknown':
                      reject('Unknown error:'+error.code);
                      break;
                  }
                },
                async () => {
                    const url =await uploadTask.snapshot.ref.getDownloadURL();
                    resolve(url);
                }
            );
        });
      }
}

export default Firebase;
