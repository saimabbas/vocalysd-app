/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { FETCH_ACCESS_TOKEN } from '../config/api-constant';
import { DEFAULT_ERROR } from '../config/app-constants';
import Firebase from '../firebase';
import { NotificationType } from '../interface';
export class API {
    firebase: Firebase;
    setMessageObj: (messageObj: NotificationType) => void;

    constructor(setMessageObj: (messageObj: NotificationType) => void) {
        this.firebase = new Firebase();
        this.setMessageObj = setMessageObj || (() => {
            console.log('Inside SetMessageobj');
        });
    }
    /**
     * This method user for create a wrapper to get api call to add Authorization header for logged in user
     * @param url get api url
     */
    async get(url:string, customHeaders?: any) : Promise <any>{
        try {
            const headers = new Headers({});
            if (customHeaders) {
                for (const customHeader in customHeaders) {
                    headers.set(customHeader, customHeaders[customHeader]);
                }
            }
             const request = await fetch(url, {
                method: 'GET',
                headers,
            });
            
            if (request.status === 401) {
                return await this.fetchAccessToken('get', url, customHeaders, null, headers);
            } else if(request.status === 401 || request.status > 500){
                const response = await request.json();
                this.setMessageObj({
                    openAlert: true,
                    severity: 'error',
                    alertMessage: ((response || {}).message || DEFAULT_ERROR)
                })
                return null;
            }
            const response = await request.json();
            return response;
        } catch (error) {
            this.setMessageObj({
                openAlert: true,
                severity: 'error',
                alertMessage: ((error.response.data || {}) || DEFAULT_ERROR) 
            })
            return null;
        }
    }

    /**
     * This method user for create a wrapper to post api call to add Authorization header for logged in user
     * @param url get api url
     * @param body request body
     */
    async post(url:string, body:any, customHeaders:any): Promise<any>{
        try {
            const headers = new Headers();
            if (customHeaders) {
                for (const customHeader in customHeaders) {
                    headers.set(customHeader, customHeaders[customHeader]);
                }
            } else {
                headers.set('Content-Type', 'application/json');
                headers.set('Accept', 'application/json');
            }
            const request = await fetch(url, {
                method: 'POST',
                headers,
                body: JSON.stringify(body)
            });
            if (request.status === 400 || request.status >= 500) {
                const response = await request.json();
                this.setMessageObj({
                    openAlert: true,
                    severity: 'error',
                    alertMessage: ((response || {}).message || DEFAULT_ERROR)
                })
            } else if (request.status === 401) {
                return await this.fetchAccessToken('post', url, customHeaders, body, headers);
            } 
            const response = await request.json();
            return response;
        } catch (error) {
            return null;
        }
    }

    /**
     * This method user for create a wrapper to put api call to add Authorization header for logged in user
     * @param url get api url
     * @param body request body
     */
    async put(url:any, body:any): Promise<any> {
        try {
            const headers = new Headers();
            headers.set('Content-Type', 'application/json');
            const request = await fetch(url, {
                method: 'PUT',
                headers,
                body: JSON.stringify(body)
            });
            if (request.status === 400 || request.status >= 500) {
                const response = await request.json();
                this.setMessageObj({
                    openAlert: true,
                    severity: 'error',
                    alertMessage: ((response || {}).message || DEFAULT_ERROR)
                })
            } else if (request.status === 401) {
                return await this.fetchAccessToken('put', url, null, body, headers);
            } 
            const response = await request.json();
            return response;
        } catch (error) {
            return null;
        }
    }

    /**
     * This method user for create a wrapper to delete api call to add Authorization header for logged in user
     * @param url get api url
     * @param body request body
     */
    async delete(url:any, body:any): Promise<any> {
        try {
            const headers = new Headers();
            headers.set('Content-Type', 'application/json');
            const request = await fetch(url, {
                method: 'DELETE',
                headers,
                body: JSON.stringify(body)
            });
            if (request.status === 400 || request.status >= 500) {
                const response = await request.json();
                this.setMessageObj({
                    openAlert: true,
                    severity: 'error',
                    alertMessage: ((response || {}).message || DEFAULT_ERROR)
                })
            } else if (request.status === 401) {
                return await this.fetchAccessToken('delete', url, null, body, headers);
            } 
            const response = await request.json();
            return response;
        } catch (error) {
            return null;
        }
    }

    /**
     * This method user for create a wrapper to post api call to add Authorization header for logged in user for upload
     * @param url get api url
     * @param body request body
     */
    async uploadPost(url:string, body:any, customHeaders:any) {
        try {
            const headers = new Headers();
            if (customHeaders) {
                for (const customHeader in customHeaders) {
                    headers.set(customHeader, customHeaders[customHeader]);
                }
            }
            const request = await fetch(url, {
                method: 'POST',
                headers,
                body
            });
            if (request.status === 400 || request.status >= 500) {
                const response = await request.json();
                this.setMessageObj({
                    openAlert: true,
                    severity: 'error',
                    alertMessage: ((response || {}).message || DEFAULT_ERROR)
                })
                return null;
            } else if (request.status === 401) {
                return await this.fetchAccessToken('uploadPost', url, customHeaders, body, headers);
            } 
            const response = await request.json();
            return response;
        } catch (error) {
            return null;
        }
    }


    objToQueryString(obj:any) {
        const keyValuePairs = [];
        for (const key in obj) {
            keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
        }
        return keyValuePairs.join('&');
    }


    async fetchAccessToken(actionType:any, url:string, customHeaders:any, body:any,headers?: any): Promise<any>{
            const result = await this.get(`${FETCH_ACCESS_TOKEN}`);
            console.log(headers);
            if (result) {
                localStorage.setItem('token', result.token);
                customHeaders['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
                customHeaders['x-api-key'] = localStorage.getItem('token');
                if (['post', 'put', 'delete', 'uploadPost'].includes(actionType)) {
                    return await this[actionType](url, body, customHeaders);
                } else {
                    return await this[actionType](url, customHeaders);
                }
            }
         else {
            this.firebase.auth.signOut();
            return null;
        }
    }

}