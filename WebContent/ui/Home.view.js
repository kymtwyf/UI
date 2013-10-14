sap.ui.jsview("ui.Home", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf ui.Home
	*/ 
	getControllerName : function() {
		return "ui.Home";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf ui.Home
	*/ 
	createContent : function(oController) {
// 		return new sap.m.Page({
//			title: "Title",
//			content: [
//			
//			]
//		});
//		var content = new sap.m.TileContainer("home", {
//			tiles:"{/apps}",
//		});
		var T1 = new sap.m.StandardTile({
			title:"T1"
		});
		var T2 = new sap.m.StandardTile({
			title:"T2"
		});
		var tileContainer = new sap.m.TileContainer({});
		
		tileContainer.addTile(T1);
		tileContainer.addTile(T2);
		var Page = new sap.m.Page({title:"Home",enableScrolling: false});  
		
		Page.addContent(tileContainer);
		return Page;
	}

});