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

function checkTop3Skills(){
	if (this.notify && this.top3Skills.trim() == ''){
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
	parent: { type: Types.Name, dependsOn: { status: 'Report Processed'},index: true,initial: true },
	dob: {type: Types.Date, dependsOn: { status: 'Report Processed'}, format: 'MM/DD/YYYY',initial: true},
	address : { type: Types.Textarea, height:2,dependsOn: { status: 'Report Processed'} ,initial: true},
	email: { type: Types.Email, initial: true, required: true, index: true },
	gender:{ type: Types.Select, options: 'M,F',index: true,initial: true,required: false},
	phoneNumber: {type: Types.Text, initial: true, required: false, index: true},
	password: { type: Types.Password, initial: true, required: true },
	status: {type: Types.Select, options: 'Scan Not Taken, Scan Scheduled,Scan Taken-Report Not Arrived, Report Processed', default: 'Scan Not Taken', index: true,initial: true, required: false },
	scanAppointmentDate: {type: Types.Datetime, dependsOn: { status: 'Scan Scheduled'}, initial: true,label:'Scan Appointment Date'},
	//Brain Specific information here
	preFrontalLobe: {type: Types.Number, initial: true, index: true,dependsOn: { status: 'Report Processed'},label:'PRE-FRONTAL LOBE'},
	frontalLobe: {type: Types.Number, initial: true, index: true,dependsOn: { status: 'Report Processed'},label:'FRONTAL LOBE'},
	parietalLobe: {type: Types.Number, initial: true, index: true,dependsOn: { status: 'Report Processed'},label:'PARIETAL LOBE'},
	temporalLobe: {type: Types.Number, initial: true, index: true,dependsOn: { status: 'Report Processed'},label:'TEMPORAL LOBE'},
	occipitalLobe: {type: Types.Number, initial: true, index: true,dependsOn: { status: 'Report Processed'},label:'OCCIPITAL LOBE'},
	leftBrain: {type: Types.Number, initial: true, index: true,dependsOn: { status: 'Report Processed'},label:'LEFT BRAIN %'},
	rightBrain: {type: Types.Number, initial: true, index: true,dependsOn: { status: 'Report Processed'},label:'RIGHT BRAIN %'},
	motive: {type: Types.Number, initial: true, index: true,dependsOn: { status: 'Report Processed'},label:'MOTIVE %'},
	process: {type: Types.Number, initial: true, index: true,dependsOn: { status: 'Report Processed'},label:'REFLECTIVE %'},
	composite: {type: Types.Number, initial: true, index: true,dependsOn: { status: 'Report Processed'},label:'COMPOSITE %'},
	tfrc: { type: Types.Text, initial: true, required: false, dependsOn: { status: 'Report Processed'},label:'TFRC'},
	elementInHolland: {type: Types.Number, initial: true, index: true,dependsOn: { status: 'Report Processed'},label:'ELEMENT IN HOLLAND %'},
	cognitive: {type: Types.Number, initial: true, index: true,dependsOn: { status: 'Report Processed'},label:'COGNITIVE %'},
	affective: {type: Types.Number, initial: true, index: true,dependsOn: { status: 'Report Processed'},label:'AFFECTIVE %'},
	critical: {type: Types.Number, initial: true, index: true,dependsOn: { status: 'Report Processed'},label:'CRITICAL %'},
	reflective: {type: Types.Number, initial: true, index: true,dependsOn: { status: 'Report Processed'},label:'REFLECTIVE %'},
	integrated: {type: Types.Number, initial: true, index: true,dependsOn: { status: 'Report Processed'},label:'INTEGRATED %'},
	//Skill specific information here
	managementFingerPattern: { type: Types.Text, initial: true, required: false, dependsOn: { status: 'Report Processed'},label:'MANAGEMENT FINGER PATTERN'},
	managementRank: {type: Types.Number, initial: true, index: true,dependsOn: { status: 'Report Processed'},label:'MANAGEMENT RANK'},
	mathLogicFingerPattern: { type: Types.Text, initial: true, required: false, dependsOn: { status: 'Report Processed'},label:'MATH/LOGIC FINGER PATTERN'},
	mathLogicRank: {type: Types.Number, initial: true, index: true,dependsOn: { status: 'Report Processed'},label:'MATH/LOGIC RANK'},
	fineMotorFingerPattern: { type: Types.Text, initial: true, required: false, dependsOn: { status: 'Report Processed'},label:'FINE MOTOR SKILL FINGER PATTERN'},
	fineMotorRank: {type: Types.Number, initial: true, index: true,dependsOn: { status: 'Report Processed'},label:'FINE MOTOR SKILL RANK'},
	languageListenFingerPattern: { type: Types.Text, initial: true, required: false, dependsOn: { status: 'Report Processed'},label:'LANGUAGE LISTEN FINGER PATTERN'},
	languageListenRank: {type: Types.Number, initial: true, index: true,dependsOn: { status: 'Report Processed'},label:'LANGUAGE LISTEN RANK'},
	observationFingerPattern: { type: Types.Text, initial: true, required: false, dependsOn: { status: 'Report Processed'},label:'OBSERVATION FINGER PATTERN'},
	observationRank: {type: Types.Number, initial: true, index: true,dependsOn: { status: 'Report Processed'},label:'OBSERVATION RANK'},
	leadershipFingerPattern: { type: Types.Text, initial: true, required: false, dependsOn: { status: 'Report Processed'},label:'LEADERSHIP FINGER PATTERN'},
	leadershipRank: {type: Types.Number, initial: true, index: true,dependsOn: { status: 'Report Processed'},label:'LEADERSHIP RANK'},
	imagineFingerPattern: { type: Types.Text, initial: true, required: false, dependsOn: { status: 'Report Processed'},label:'IMAGINE FINGER PATTERN'},
	imagineRank: {type: Types.Number, initial: true, index: true,dependsOn: { status: 'Report Processed'},label:'IMAGINE RANK'},
	grossMotorFingerPattern: { type: Types.Text, initial: true, required: false, dependsOn: { status: 'Report Processed'},label:'GROSS MOTOR SKILL FINGER PATTERN'},
	grossMotorRank: {type: Types.Number, initial: true, index: true,dependsOn: { status: 'Report Processed'},label:'GROSS MOTOR SKILL RANK'},
	musicFingerPattern: { type: Types.Text, initial: true, required: false, dependsOn: { status: 'Report Processed'},label:'MUSIC FINGER PATTERN'},
	musicRank: {type: Types.Number, initial: true, index: true,dependsOn: { status: 'Report Processed'},label:'MUSIC RANK'},
	visualPerceptionFingerPattern: { type: Types.Text, initial: true, required: false, dependsOn: { status: 'Report Processed'},label:'VISUAL PERCEPTION FINGER PATTERN'},
	visualPerceptionRank: {type: Types.Number, initial: true, index: true,dependsOn: { status: 'Report Processed'},label:'VISUAL PERCEPTION RANK'},
	//IQ Info here
	eq: {type: Types.Number, initial: true, index: true,dependsOn: { status: 'Report Processed'},label:'EQ'},
	iq: {type: Types.Number, initial: true, index: true,dependsOn: { status: 'Report Processed'},label:'IQ'},
	aq: {type: Types.Number, initial: true, index: true,dependsOn: { status: 'Report Processed'},label:'AQ'},
	cq: {type: Types.Number, initial: true, index: true,dependsOn: { status: 'Report Processed'},label:'CQ'},
	//Learning Style Info here
	visual: {type: Types.Number, initial: true, index: true,dependsOn: { status: 'Report Processed'},label:'VISUAL'},
	auditory: {type: Types.Number, initial: true, index: true,dependsOn: { status: 'Report Processed'},label:'AUDITORY'},
	kinesthetic: {type: Types.Number, initial: true, index: true,dependsOn: { status: 'Report Processed'},label:'KINESTHETIC'},
	learningBy: { type: Types.Text, initial: true, required: false, dependsOn: { status: 'Report Processed'},label:'LEARNING BY'},
	//Multiple Intelligence Info here
	languagePercent: { type: Types.Number, initial: true, required: false, dependsOn: { status: 'Report Processed'},label:'LANGUAGE PERCENT'},
	languageRank: {type: Types.Number, initial: true, index: true,dependsOn: { status: 'Report Processed'},label:'LANGUAGE RANK'},
	mathPercent: { type: Types.Number, initial: true, required: false, dependsOn: { status: 'Report Processed'},label:'MATH PERCENT'},
	mathRank: {type: Types.Number, initial: true, index: true,dependsOn: { status: 'Report Processed'},label:'MATH RANK'},
	spatialPercent: { type: Types.Number, initial: true, required: false, dependsOn: { status: 'Report Processed'},label:'SPATIAL PERCENT'},
	spatialRank: {type: Types.Number, initial: true, index: true,dependsOn: { status: 'Report Processed'},label:'SPATIAL RANK'},
	kinestheticPercent: { type: Types.Number, initial: true, required: false, dependsOn: { status: 'Report Processed'},label:'KINESTHETIC PERCENT'},
	kinestheticRank: {type: Types.Number, initial: true, index: true,dependsOn: { status: 'Report Processed'},label:'KINESTHETIC RANK'},
	musicPercent: { type: Types.Number, initial: true, required: false, dependsOn: { status: 'Report Processed'},label:'MUSIC PERCENT'},
	musicMIRank: {type: Types.Number, initial: true, index: true,dependsOn: { status: 'Report Processed'},label:'MUSIC RANK'},
	intraPercent: { type: Types.Number, initial: true, required: false, dependsOn: { status: 'Report Processed'},label:'INTRA PERCENT'},
	intraRank: {type: Types.Number, initial: true, index: true,dependsOn: { status: 'Report Processed'},label:'INTRA RANK'},
	interPercent: { type: Types.Number, initial: true, required: false, dependsOn: { status: 'Report Processed'},label:'INTER PERCENT'},
	interRank: {type: Types.Number, initial: true, index: true,dependsOn: { status: 'Report Processed'},label:'INTER RANK'},
	naturePercent: { type: Types.Number, initial: true, required: false, dependsOn: { status: 'Report Processed'},label:'NATURE PERCENT'},
	natureRank: {type: Types.Number, initial: true, index: true,dependsOn: { status: 'Report Processed'},label:'NATURE RANK'},
	atdLeft: {type: Types.Number, initial: true, index: true,dependsOn: { status: 'Report Processed'},label:'ATD LEFT'},
	atdRight: {type: Types.Number, initial: true, index: true,dependsOn: { status: 'Report Processed'},label:'ATD RIGHT'},
	realistic: {type: Types.Number, initial: true, index: true,dependsOn: { status: 'Report Processed'},label:'REALISTIC'},
	investigate: {type: Types.Number, initial: true, index: true,dependsOn: { status: 'Report Processed'},label:'INVESTIGATIVE'},
	artistic: {type: Types.Number, initial: true, index: true,dependsOn: { status: 'Report Processed'},label:'ARTISTIC'},
	social: {type: Types.Number, initial: true, index: true,dependsOn: { status: 'Report Processed'},label:'SOCIAL'},
	enterprise: {type: Types.Number, initial: true, index: true,dependsOn: { status: 'Report Processed'},label:'ENTERPRISE'},
	conventional: {type: Types.Number, initial: true, index: true,dependsOn: { status: 'Report Processed'},label:'CONVENTIONAL'},
	charInner: { type: Types.Text, initial: true, required: false, dependsOn: { status: 'Report Processed'},label:'CHARACTERISTIC INNER'},
	charOUTER: { type: Types.Text, initial: true, required: false, dependsOn: { status: 'Report Processed'},label:'CHARACTERISTIC OUTER'},
	thinkingTypeL: { type: Types.Text, initial: true, required: false, dependsOn: { status: 'Report Processed'},label:'THINKING TYPE L'},
	thinkingTypeR: { type: Types.Text, initial: true, required: false, dependsOn: { status: 'Report Processed'},label:'THINKING TYPE R'},
	topSkill: { type: Types.Select,options: 'inter,intra,musical,kinesthetic,natural,logical,visual,linguistic,auditory,default', initial: true, required: false, dependsOn: { status: 'Report Processed'},default:'default',validate: checkTopSkill },
	top3Skills:{type: Types.Text, initial: true, required: false, dependsOn: { status: 'Report Processed'},label:'TOP 3 SKILLS(COMMA SEPERATED)',validate:checkTop3Skills},
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
