import BaseApi from '../../network/BaseApi';
import * as Constants from '../../customApp/constants';
import { OAuthConfig } from '../../settings';

class AuthApi extends BaseApi{

    static authenticateUser(username, password) {
        let requestObj =  this.getAuthRequestOptions();
        requestObj.url = Constants.OAUTH_API;
        requestObj.method = "POST";
        if(username && password){
            var bodyFormData = new FormData();
            bodyFormData.set('grant_type', 'password');
            bodyFormData.set('username', username);
            bodyFormData.set('password', password);
            bodyFormData.set('client_id', 'jarnbjorn');
            requestObj.data = bodyFormData;
        }
        return this.initiateRequest(requestObj,Constants.RETRY_COUNT_ON_EXPIRY);
    }
    static getAuthRequestOptions(){
        const headers = {'authorization': `Basic `+OAuthConfig.basic};
        const requestObj = {
                          baseURL:Constants.BASE_URL_BACKEND,
                          headers: headers,
                          timeout: Constants.API_REQUEST_TIME_OUT_IN_SEC
                        };
        return requestObj;
    }
  }
  
  export default AuthApi;
  