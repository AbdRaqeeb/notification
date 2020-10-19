# Stand alone service used to send notifications to members

NOTIFICATION SERVICE DOCUMENTATION

* POST:      
    > email
    >> The email of the recipients.
    >>> Example:
    >> 
    > * single recipient: 'test@gmail.com',  
    > * multiple recipients: 'test1@gmail.com, test2@gmail.com, test3@gmail.com'
        
    > service 
    >> The name of the service e.g MAAL
 
    > subject
    >> The subject of the notification

    > message
    >> The content of the notification
        
    > cc &nbsp; (Optional)
    >> Added recipients to be notified
    >>> Example: 'test1@gmail.com, test2@gmail.com, test3@gmail.com, test4@gmail.com'
        

> RECEIVER:
>> Receives notifications from the services and adds them to the queue.


> DISPATCHER:
>> It picks the notifications from the queue and ensures it is sent to the recipients.
>> On error, it returns the notification back to the queue for dispatch again.
>> On success, it deletes the notification from the queue.

***
Messaging Queue: <span style="color: red; font-size: 20px">RABBIT MQ</span>
***