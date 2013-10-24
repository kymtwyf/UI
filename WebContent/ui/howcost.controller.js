sap.ui.controller("ui.howcost", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf view.howcost
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf view.howcost
*/
	onBeforeRendering: function() {
		// jQuery.ajax({
		// 	url:"http://ld9415.wdf.sap.corp:8002/mouse/project/odata/Query.xsodata/Query?$select=TRIP_TOTAL&$filter=MANDT%20eq%20'578'&$format=json",
		// 	error:function(){
		// 		jQuery.sap.require("sap.m.MessageToast");
		// 		 sap.m.MessageToast.show("Some error occurred when querying, please check the network and try again");
		// 	},
		// 	success:function(data){
		// 		console.log("total data "+data.d);
		// 	}
		// });
		jQuery.ajax({
			url:"http://ld9415.wdf.sap.corp:8002/mouse/project/odata/Test.xsodata/TRIP_DEST?$select=LANDTEXX,ONE&$filter=MANDT%20eq%20'002'&$format=json",
			error:function(error){
				jQuery.sap.require("sap.m.MessageToast");
				 sap.m.MessageToast.show(error+"");
			},
			success:function(data){
				console.log(data);
				var model = new sap.ui.model.json.JSONModel(data.d);
				sap.ui.getCore().setModel(model);
			}
		})
	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf view.howcost
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf view.howcost
*/
//	onExit: function() {
//
//	}

});