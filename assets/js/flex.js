

var FlexController = FlexController || {};
FlexController = (function (FlexController, $, _) {

	var _initializer = {
		configureLog4jq : function() {
			var self = _initializer;
			self.logger = $.configureLog4jq({
				enabled: true,
				level : "debug",
				targets : [
					{
						name: "console",
						enabled: true
					}
				]
			});
		},
		init : function() {
			var self = _initializer;
			self.configureLog4jq();
		}
	};
	var _overridenController = $.extend(FlexController, {
		init : _initializer.init
	});
	return _overridenController;
	
}(FlexController, jQuery, _));

$(document).ready (function() {
	FlexController.init();
});

