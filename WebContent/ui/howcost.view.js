sap.ui.jsview("ui.howcost", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.howcost
	*/ 
	getControllerName : function() {
		return "ui.howcost";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.howcost
	*/ 
	createContent : function(oController) {
		var oTable = new sap.m.Table({
			  headerText: "Trip Statistics",
			  columns: [
			    new sap.m.Column({
			      width : "12em",
			      header: new sap.m.Label({text: "Country"})
			    }),
			    new sap.m.Column({
			      header: new sap.m.Label({text: "Trip Count"}),
			      minScreenWidth: "Tablet",
			      demandPopin: true
			    })			   
			  ],
			  items: {
			    path: "/results",
			    template: new sap.m.ColumnListItem({
			      cells: [
			        new sap.m.ObjectIdentifier({
			          title: "{LANDX}",
			          text: "{LANDX}"
			        }),
			        new sap.m.Text({
			          text: "{ONE}"
			        })
			      ]
			    })
			  }
			});
		
 		return new sap.m.Page({
 			title: "How Cost",
 			content:[oTable],
 			AppWidthLimited:true,
			showNavButton: true,
			navButtonText: "Page 1",
			navButtonPress: function(){ app.back();},
		});
	}

});