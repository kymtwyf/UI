sap.ui.controller("ui.whoiswhere", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf demo.MainPage
*/
	onInit: function() {
		var bus = sap.ui.getCore().getEventBus();
		bus.subscribe("app", "DataLoaded", function () {
			//数据取到了就需要写这个
			/*
			 
			m.attachRequestCompleted(function () {//m是model
				sap.ui.getCore().getEventBus().publish("app", "DataLoaded");//这句来触发这个event
			}); 
			  */
			
		}, this);
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf demo.MainPage
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf demo.MainPage
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf demo.MainPage
*/
	onExit: function() {
		//logic.utils._F_Toast("exit");
//		console.log("user exited");
//		Cookie.write("tableData",logic.data);
	}

});