var mongoose = require('mongoose');
var slug = require('slug');
slug.defaults.mode = 'rfc3986';
var Schema = mongoose.Schema;

var schema = new Schema({
	id: Number,
	name: {
		en: String,
		de: String,
		es: String,
		fr: String,
		it: String,
		tr: String
	},
	slug: String,
	online: Boolean,
	namespace: String
}, {
	timestamps: {}
});

schema.pre('save', function(next){
	this.slug = slug(this.name.en);
	next();
})

var Server = mongoose.model('Server', schema);

module.exports = Server;