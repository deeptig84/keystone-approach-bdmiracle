var keystone = require('keystone');
var Types = keystone.Field.Types;

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
	skill: { type: Types.Select, options: 'inter, intra, all', default: 'all', index: true },
	//author: { type: Types.Relationship, ref: 'Genius', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
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
	console.log("Inside save.."+this.skill);
	keystone.list('Genius').model.find().where('skills', this.skill).exec(function(err, usersBasedOnSkills) {
		
		if (err) return callback(err);
		
		console.log("usersBasedOnSkills--->"+usersBasedOnSkills);
		
		/*new keystone.Email('enquiry-notification').send({
			to: usersBasedOnSkills,
			from: {
				name: 'Find Your Talents Adminn',
				email: 'contact@find-your-talents-adminn.com'
			},
			subject: 'New Enquiry for Find Your Talents Adminn',
			enquiry: enquiry
		}, callback);*/
		
	});
});

Post.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Post.register();
