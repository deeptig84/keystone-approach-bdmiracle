var keystone = require('keystone');
var Types = keystone.Field.Types;
	Genius = keystone.list('Genius');
	ObjectId = require('mongoose').Types.ObjectId; 
	async = require('async');
	mandrill = require('mandrill-api/mandrill');
	mandrill_client = new mandrill.Mandrill('w-p_sIciNDC5segXB-zaEA'); 

/*var server  = email.server.connect({
   user:    "sagarmeansocean@gmail.com", 
   password:"Dec#2011", 
   host:    "smtp.gmail.com", 
   ssl:     true
});*/

/**
 * Post Model
 * ==========
 */

var Post = new keystone.List('Post', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true }
});

Post.add({
	title: { type: String, required: true },
	skill: { type: Types.Select, options: 'inter, intra, all,none', default: 'all', index: true },
	user: { type: Types.Relationship, ref: 'Genius', index: true ,dependsOn: { skill: 'none'}},
	publishedDate: { type: Types.Date, index: true},
	//image: { type: Types.CloudinaryImage },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 }
	},
	//categories: { type: Types.Relationship, ref: 'PostCategory', many: true }
});

Post.schema.virtual('content.full').get(function() {
	return this.content.brief;
});

Post.schema.post('save',function(){
	var fetchedUsers = null;
	if(this.skill == 'none'){
		console.log(this.user);
		fetchedUsers = Genius.model.find().where('_id',new ObjectId(this.user.toString())).exec();
		async.applyEach([sendEmail,sendMessage],fetchedUsers,callback);
	}
	else{
		fetchedUsers = Genius.model.find().where('skills', this.skill).exec();
		async.applyEach([sendEmail,sendMessage],fetchedUsers,callback);
	}
});

function callback(err){
  if (err) return console.error(err);
  console.log('users notified!');
}

function sendEmail(fetchedUsers){
	console.log("Should send an email"+fetchedUsers);
	var message = {
    "text": "Test email.. Please dont mind",
    "subject": "Be The Miracle Test email",
    "from_email": "lsagar.12@gmail.com",
    "from_name": "Sagar",
    "to": [{
            "email": "anuraggupta86@gmail.com",
            "name": "Anurag Gupta"
        }],
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
    // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
	});

	/*new keystone.Email('enquiry-notification').send({
		to: fetchedUsers,
		from: {
				name: 'Find Your Talents Adminn',
				email: 'anuraggupta86@gmail.com'
		},
		subject: 'Test Mail',
		enquiry: 'This is a test e-mail from me'
	}, callback);*/
}

function sendMessage(fetchedUsers){
	console.log("Should send a message");
	//Add Twilio code here..
}

Post.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Post.register();
