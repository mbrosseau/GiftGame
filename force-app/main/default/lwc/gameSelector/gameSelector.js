import { LightningElement, wire, api, track } from 'lwc';
import getExchangeNames from '@salesforce/apex/GiftController.getExchangeNames';
import getGiftsByExchangeId from '@salesforce/apex/GiftController.getGiftsByExchangeId';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class GameSelector extends LightningElement {

    @track l_All_Types;
    @track TypeOptions;
    @track gameId;
    @track gifts;

    @wire(getExchangeNames) giftExchanges( { error, data }) {
      
 
        if (data) {
            console.log("Got data");
            console.log(data);
            try {
                this.l_All_Types = data; 
                let options = [];
                 
                for (var key in data) {
                    // Here key will have index of list of records starting from 0,1,2,....
                    options.push({ label: data[key].Name, value: data[key].Id  });
 
                    // Here Name and Id are fields from sObject list.
                }
                this.TypeOptions = options;
                 
            } catch (error) {
                console.error('check error here', error);
            }
        } else if (error) {
            console.error('check error here', error);
        }
 
    };

    handleTypeChange(event){
        var Picklist_Value = event.target.value; 
     
        this.gameId = Picklist_Value;

        console.log(this.gameId);


        getGiftsByExchangeId({ id: this.gameId })
        .then((result) => {
            console.log("got gifts");
            console.log(result);
            this.gifts = result;
            this.error = undefined;
        })
        .catch((error) => {
            this.error = error;
            this.gifts = undefined;
        });
        // Navigate to a URL
       /* this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: 'http://salesforce.com'
            }
        },
        true // Replaces the current page in your browser history with the URL
      );*/
        // Do Something.
    }
   

}