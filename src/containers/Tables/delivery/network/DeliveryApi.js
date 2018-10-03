import BaseApi from '../../../../network/BaseApi';
import * as Constants from '../../../../customApp/constants';

class DeliveryApi extends BaseApi{

    static getUserDelivery() {
        return this.initiateRequestByUrl(Constants.ORDER_LISTING_API);
    }
    // static getNotebookById(contextPath,accountId,notebook) {
    //   return this.initiateRequestByUrl(contextPath+'/Delivery/'+accountId+'/'+notebook.guid);
    // }
    // static startSyncNotebook(contextPath,accountId,notebook) {
    //   return this.initiateRequestByUrl(contextPath+'/Delivery/'+accountId+'/sync/'+notebook.guid);
    // }
    // static startSyncDelivery(contextPath,accountId,data) {
    //   return this.initiateRequestByUrlAndMethod(contextPath+'/Delivery/sync/'+accountId,"POST",null,data);
    // }
    // static unsyncNotebook(contextPath,accountId,notebook,keepCopy) {
    //   return this.initiateRequestByUrl(contextPath+'/Delivery/'+accountId+'/unsync/'+notebook.guid+"?keepNoteCopy="+keepCopy);
    // }  
    // static cancelSync(contextPath,accountId,notebook,keepCopy) {
    //   return this.initiateRequestByUrl(contextPath+'/Delivery/'+accountId+'/cancelSync/'+notebook.guid);
    // }
  }
  
  export default DeliveryApi;
  