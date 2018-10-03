import * as Constants from './constants'

export function saveTokenInfo(response) {
    localStorage.accessToken = response.token;
    localStorage.refreshToken = response.refreshToken;
}

export function getTokenInfo(cb) {
    if (Constants.DEBUG) {
        cb({
            "token": "e63d263c-ed02-4142-9ea7-9ad464ee2145"
        });
    }
    //TODO : Remove later
    else {
        cb({
            "token": "e63d263c-ed02-4142-9ea7-9ad464ee2145"
        });
    }
}

export function getToken() {
    return localStorage.accessToken;
}
export function getRefreshToken() {
    return localStorage.refreshToken;
}

export function convertErrorResponseToLogMessage(response){
  
    if(response){
      var logMessage={};
      logMessage.status=response.status;
      logMessage.statusText=response.statusText;
      if(response.config){
        logMessage.url=response.config.url;
        logMessage.responseType=response.config.responseType;
      }
      if(response.request&&response.request.__rollbar_xhr){
        logMessage.startTime= response.request.__rollbar_xhr.start_time_ms;
        logMessage.endTime= response.request.__rollbar_xhr.end_time_ms;
      }
      return logMessage;
    }
    return null;
  }
  export function convertErrorToLogMessage(error){
    if(error){
      if(error.response){
        return convertErrorResponseToLogMessage(error.response);
      }
      return convertErrorResponseToLogMessage(error);
    }  
    return null;
  }