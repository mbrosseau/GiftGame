public with sharing class GiftController {
    public GiftController() {

    }

    @AuraEnabled(cacheable=true)
    public static List<Gift__c> getAllGifts() {
        return [
            SELECT Name, Id, From__c, Image_URL__c, Recipient__c, Wrapped_URL__c, Opened__c
            FROM Gift__c
        ];
    }

    @AuraEnabled(cacheable=true)
    public static List<Gift__c> getGiftsByExchangeId(String id) {
        return [
            SELECT Name, Id, From__c, Image_URL__c, Recipient__c, Wrapped_URL__c, Opened__c
            FROM Gift__c where Gift_Exchange__c =: id
        ];
    }

    @AuraEnabled(cacheable=true)
    public static List<Gift_Exchange__c> getExchangeNames() {
        return [
            SELECT Name, Id
            FROM Gift_Exchange__c WHERE Active__c = true
        ];
    }

    @AuraEnabled
    public static void openGift(String recordId) {
        Gift__c openedGift = new Gift__c();
        openedGift.id = recordId;
        openedGift.Opened__c = true;
        update openedGift;

        return ;
    }

    @AuraEnabled
    public static String getRecipient(String recordId) {
        String recipient = 'bob';
       Gift__c item = [ SELECT Id, Recipient__c
        FROM Gift__c where id =: recordId];
        return item.Recipient__c;
    }
}