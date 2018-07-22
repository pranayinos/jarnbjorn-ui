import * as Constans from '../constants';
import * as Utils from '../utils';
import * as Logger from '../logger';
let axios = require('axios');

class BaseApi {

  static validateRespose(response){
    //debugger;
    let status = response.status;
    if(status === 404){
      Logger.warning("Got 404 from server",Utils.convertErrorResponseToLogMessage(response));
      throw Constans.NOT_FOUND;
    }else if(status === 401){
      Logger.warning("Got 401 from server",Utils.convertErrorResponseToLogMessage(response));
      throw Constans.UNAUTHORIZED;
    }else if(status!==200){
      Logger.warning("Response code not 200",Utils.convertErrorResponseToLogMessage(response));
      throw Constans.INVALID_RESPONSE;
    }
    let data = response.data;
    if(data.status!=="SUCCESS" && data.errorCode){
      Logger.warning("Failed Response",data);
      throw data;
    }
  }

  static validateError(error){
    if(error){
      if(error.code === "ECONNABORTED" && error.message && error.message.indexOf("timeout") > -1) {
        //throw Constans.ERR_TIMED_OUT;
        Logger.warning("Taking too long for request",{errorCode:error.code,message:error.message});
      }else if (error.response) {
        this.validateRespose(error.response);
      }else {
        Logger.error("API Error response",Utils.convertErrorToLogMessage(error));
        throw(error);
      }
    }
  }

  static authHeaders(tokenInfo) {

    if(tokenInfo){
      return {
              'Authorization': `bearer `+tokenInfo.token,
              'clientId':tokenInfo.clientId
            }
    }
    return {
            'Authorization': `bearer `+Utils.getToken(),
            'clientId':Utils.getClientId()
          }
  }

  static getRequestHeaders(tokenInfo) {
    return Object.assign({'Content-Type': 'application/json'}, this.authHeaders(tokenInfo));
  }
  static getDefaultRequestOptions(tokenInfo){
    const headers = this.getRequestHeaders(tokenInfo);
    const requestObj = {
                      baseURL:Constans.BASE_URL_BACKEND,
                      headers: headers,
                      timeout: Constans.API_REQUEST_TIME_OUT_IN_SEC,
                      responseType: 'json'
                    };
    return requestObj;
  }


  static initiateRequestByUrl(relativeUrlPath,tokenInfo){
    return this.initiateRequestByUrlAndMethod(relativeUrlPath,"GET",tokenInfo);
  }
  static initiateRequestByUrlAndMethod(relativeUrlPath,method,tokenInfo,data){
    let requestObj =  this.getDefaultRequestOptions(tokenInfo);
    requestObj.url = relativeUrlPath;
    requestObj.method = method;
    if(data){
      requestObj.data = data;
    }
    return this.initiateRequest(requestObj,Constans.RETRY_COUNT_ON_EXPIRY);
  }
  static initiateRequest(requestObj,retryCount){
    return axios.request(requestObj).then(response => {
      this.validateRespose(response);
      return response.data;
    }).catch(error => {
      this.validateError(error);
    }).catch(error => {
      //Retry the request on token expiry
      if(retryCount && error===Constans.UNAUTHORIZED){
        Logger.info("User token expired, getting new token");
        return Utils.getASUITokenInfoPromise().then(response =>{
              Utils.saveTokenInfo(response);
              const headers = this.getRequestHeaders();
              requestObj.headers = headers;
              return this.initiateRequest(requestObj);
        });
      }else if(error===Constans.ERR_TIMED_OUT){
        Utils.showErrorPage(Constans.ERROR_TYPE.NETWORK_ERROR);
      }else{
        throw error;
      }
    }).then(response =>{
      return response;
    });
  }
}

export default BaseApi;
