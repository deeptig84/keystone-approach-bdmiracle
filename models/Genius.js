var keystone = require('keystone');
var Types = keystone.Field.Types;
	async = require('async');

/**
 * Genius Model
 * ==========
 */

var Genius = new keystone.List('Genius',{
	autokey: { path: 'skills', from: 'topSkill', unique: false },
});

function checkTopSkill(){
	console.log(this.status)
	console.log(this.topSkill)
	if (this.status == 'Report Processed' && this.topSkill == 'default'){
		return false;
	}
	return true;
}

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

Genius.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, index: true },
	password: { type: Types.Password, initial: true, required: true },
	status: {type: Types.Select, options: 'Scan Not Taken, Scan Taken-Report Not Arrived, Report Processed', default: 'Scan Not Taken', index: true,initial: true, required: true },
	tfrc: { type: Types.Text, initial: true, required: false, dependsOn: { status: 'Report Processed'}},
	topSkill: { type: Types.Select,options: 'inter,intra,default', initial: true, required: false, dependsOn: { status: 'Report Processed'},default:'default',validate: checkTopSkill },
	notify: {type: Types.Boolean,initial: true}
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true }
});

// Provide access to Keystone
Genius.schema.virtual('canAccessKeystone').get(function() {
	return this.isAdmin;
});

Genius.schema.pre('save',function(next){
	if(this.notify){
		console.log("Notify Users..");
		async.applyEach([sendEmail,sendMessage],this,callback);
	}
	this.notify = undefined;
	next();
});

/**
 * Relationships
 */

Genius.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });


/**
 * Registration
 */

Genius.defaultColumns = 'name, email, isAdmin,status';
Genius.register();
