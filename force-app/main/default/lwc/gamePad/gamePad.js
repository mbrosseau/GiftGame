import { LightningElement, wire, api } from 'lwc';
import getAllGifts from '@salesforce/apex/GiftController.getAllGifts';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';





export default class GamePad extends LightningElement {

    @api recordId;
    @wire(getAllGifts) gifts;

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