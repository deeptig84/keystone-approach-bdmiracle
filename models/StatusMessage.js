exports.reportProcessedMsg = 'Your report has arrived.';
exports.counsellingDoneMsg = 'Your conselling has been done today.';
exports.scanScheduledMsg = 'Congratulations! Your scan has been scheduled with us' ;
exports.scanTakenreportNotArrivedMsg = 'Your scan has been taken and we are processing your details, We shall inform you once report is avaialble with us';
exports.greetingMessage = 'Greetings for the day. Hope you are doing great.';
exports.closingMessage = 'Please contact us at +91 9686381336 or email us at anuraggupta86@gmail.com in case you need further details.';
exports.reportProcessedSub = 'Find Your Talents : Scan Report is Generated.';
exports.counsellingDoneSub = 'Find Your Talents : Conuselling is Done.';
exports.scanScheduledSub = 'Find Your Talents : Scan has been schehduled.' ;
exports.scanTakenreportNotArrivedSub = 'Find Your Talents : Scan Taken, Waiting for your Report.';
exports.signature = '\n' + 'Thanks and Regards,' + '\n' + 'Find Your Talents' + '\n' + 'Contact - 91 9739742036' + '\n' + 'Email : anuraggupta86@gmail.com';


exports.sendEmail =  function (fetchedUsers,content,subject){
	console.log("Should send an email:"+content);
	var message = {
    "text": content,
    "subject": subject,
    "from_email": "lsagar.12@gmail.com",
    "from_name": "Sagar",
    "to": fetchedUsers,
    "important": false,
    "track_opens": true,
    "track_clicks": true,
    "auto_text": true
	};
	
	mandrill_client.messages.send({"message": message}, function(result) {
    console.log(result);
   
	}, function(e) {
    // Mandrill returns the error as an object with name and message keys
		console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
	});

};