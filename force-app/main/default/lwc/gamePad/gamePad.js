import { LightningElement, wire, api, track } from 'lwc';
import getGiftsByExchangeId from '@salesforce/apex/GiftController.getGiftsByExchangeId';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';





export default class GamePad extends LightningElement {

  //   @api recordId;
    //@wire(getAllGifts) gifts;
   @api gifts;
   // @track error;


   /* handleLoad() {
        console.log("Loading data");
        console.log(this.recordId);
        getGiftsByExchangeId({ id: this.recordId })
            .then((result) => {
                this.gifts = result;
           //     this.error = undefined;
            })
            .catch((error) => {
                console.log("Error");
                console.log(error);
             //   this.error = error;
                
                this.gifts = undefined;
            });
    }*/


    showHandler(event) {
        // Prevents the anchor element from navigating to a URL.
        event.preventDefault();

        console.log(event.currentTarget.dataset.giftId);

        // Creates the event with the contact ID data.
        const selectEvent = new CustomEvent('giftselect', {
            detail: { giftId: event.currentTarget.dataset.giftId }
        });
     

        // Dispatches the event.
        this.dispatchEvent(selectedEvent);
    }
  

}