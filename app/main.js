// Required Libs, Controllers and Models ==================================
var appManager;
require(
	[
		"order!jquery",
		
		//Libs =============================
			//Spine Libs
			"order!libs/spine/spine",
			"order!libs/spine/modules/ajax",
			"order!libs/spine/modules/manager",

			"order!libs/json2",
			"order!libs/debug",

			//Jquery Libs
			"order!libs/jquery/plugins/jquery.easing.1.3",
			"order!libs/jquery/plugins/jquery.tmpl",
			"order!libs/jquery/plugins/jwerty",
			"order!libs/jquery/plugins/jquery.masonry.min",
			"order!libs/jquery/plugins/jquery.jribbble.min",



		//Controllers ==========================
			
			"order!controllers/app",
			"order!controllers/shots_controller",

		//Models ==========================
			"order!models/shot",

	],
	function( require ) {

		var spine = require('libs/spine/spine')
		log("----------------------------------------------All libs Loaded Correctly ----------------------" );
		log("----------------------------------------------Initilizing App ----------------------" );

		$(document).ready(function(){
			app = new App({ el: $("body")});
		});
    }
);
