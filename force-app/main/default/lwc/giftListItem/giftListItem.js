import { LightningElement, api, track } from 'lwc';
import openGift from '@salesforce/apex/GiftController.openGift';
import getRecipient from '@salesforce/apex/GiftController.getRecipient';
import { refreshApex } from '@salesforce/apex';

export default class GiftListItem extends LightningElement {
    @api gift;

    _opened = false;
    get opened() {
        if( this.gift.Opened__c == true) {
            this._opened = true;
        }
        return this._opened;
    }
    

    _showRecipientInput = false;
    get showRecipientInput() {
        return this._showRecipientInput;
    }
   

    _title = "Gift";
    get title() {
        if ( this.gift.Recipient__c != null && this._title == "Gift") {
            this._title = this.gift.Recipient__c;
        } 
        return this._title;
    }

    showHandler(event) {
        console.log("handler");
        this._showRecipientInput = true;
        if(   this._opened == false) {
   
            this._opened = true;

             openGift({ recordId: this.gift.Id })
            .then((result) => {
                console.log("update success");
             })
             .catch((error) => {
                 this.error = error;
                 console.log(error);
             });
       
        }
    }

    handleAssignGift(event) {
  
        event.preventDefault();       // stop the form from submitting
       
        const fields = event.detail.fields;
        this.template.querySelector('lightning-record-edit-form').submit(fields);
        console.log("Assign Gift5");
        this._showRecipientInput = false;
        console.log("Assign Gift6");
        console.log(this.gift.Recipient__c);
      
    }

    handleSucess(event){
        const updatedRecord = event.detail.id;
        console.log('onsuccess: ', updatedRecord);
        getRecipient({ recordId: this.gift.Id })
        .then((result) => {
            console.log("get success");
            console.log(result);
            this._title = result;
            
         })
         .catch((error) => {
             this.error = error;
             console.log(error);
         });
         
         
       
     }

     handleCancel(event) {
        this._showRecipientInput = false;
        console.log("clear input");
     }


}