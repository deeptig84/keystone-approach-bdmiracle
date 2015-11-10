var keystone = require('keystone');
var Types = keystone.Field.Types;
	Genius = keystone.list('Genius');
	ObjectId = require('mongoose').Types.ObjectId; 
	async = require('async');

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
	/*new keystone.Email('enquiry-notification').send({
		to: fetchedUsers,
		from: {
				name: 'Find Your Talents Adminn',
				email: 'contact@find-your-talents-adminn.com'
		},
		subject: 'New Enquiry for Find Your Talents Adminn',
		enquiry: enquiry
	}, callback);*/
}

function sendMessage(fetchedUsers){
	console.log("Should send a message");
	//Add Twilio code here..
}

Post.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Post.register();
