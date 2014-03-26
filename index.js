var request = require("request");
var xml2js = require("xml2js");

var parser = new xml2js.Parser({
	explicitArray:false,
	explicityRoot:false
});

var spreadsheet = (function() {
	return {
		get: function(obj) {

			obj = obj || {};
			var key = obj.key;
			var callback = obj.callback || function(){};

			if(!key) {
				callback("Key must be specified");
				return;
			}

			var url = "https://spreadsheets.google.com/feeds/cells/" + key + "/od6/public/basic";

			request({
				url:url,
				method:"GET",
				headers:null,
				body:null
			}, function(err, response, body) {
				if(err) {
					callback(err);
				} else if(response.statusCode >= 400) {
					callback("Invalid Authorization", null);
				} else {
					if(body) {
						parser.parseString(body, function(err, result) {
							if(err) {
								callback(err);
							} else {
								if(result && result.feed) {

									var dictionary = {};

									var entries = result.feed.entry;
									var entry;

									for(var i = 0; i < entries.length; i++) {
										// quotes are in the F column
										entry = entries[i];
										title = null;
										content = null;

										if(entry) {
											if(entry.title && entry.title._) {
												title = entry.title._;
											}
											if(entry.content && entry.content._) {
												content = entry.content._;
											}
										}

										if(title && content) {
											dictionary[title] = content;
										}
									}

									callback(null, dictionary);
								} else {
									callback("Invalid feed returned");
								}
							}
						});
					}
				}
			});
		}
	};
})();

module.exports = spreadsheet;
