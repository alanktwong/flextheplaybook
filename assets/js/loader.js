var Loader = (function (document) {
	var _helper = {
		isArray : function(obj) {
			var result = false;
			if (Array.isArray) {
				result = Array.isArray(obj);
			} else {
				result = (obj instanceof Array);
				if (result !== true && Object.prototype.toString.call( obj ) === '[object Array]' ) {
					result = true;
				}
				return result;
			}
		},
		loadInDocument : function(doesNotExist, jsSrc) {
			var self = _helper;
			if (doesNotExist) {
				if (self.isArray(jsSrc)) {
					for (var i=0;i<jsSrc.length;i++) {
						if (doesNotExist) {
							self.insertIntoDocument(jsSrc[i]);
						}
					}
				} else {
					self.insertIntoDocument(jsSrc);
				}
			}
		},
		insertIntoDocument: function(jsSrc) {
			var script = document.createElement('script');
			script.type = 'text/javascript';
			script.async = false;
			// script.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
			script.src = jsSrc;
			var s = document.getElementsByTagName('script')[0];
			s.parentNode.insertBefore(script, s);
		}
	};
	
	return {
		loadInDocument : _helper.loadInDocument
	};
}(document));

