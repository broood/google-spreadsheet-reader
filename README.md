google-spreadsheet-reader
=========================

Node.js module for fetching data from a google spreadsheet

## Basic Usage

``` javascript
var spreadsheet = require("google-spreadsheet-reader");

spreadsheet.get({
	key:"<published-google-spreadsheet-key>",
	callback:function(err, dictionary) {
		if(!err) {
			console.log(dictionary["A1"]);
			console.log(dictionary["B1"]);
			console.log(dictionary["F5"]);
		}
	}
});
```
