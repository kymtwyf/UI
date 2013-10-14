sap.ui.jsview("ui.whoiswhere", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf demo.MainPage
	*/ 
	getControllerName : function() {
		return "ui.whoiswhere";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf demo.MainPage
	*/ 
	createContent : function(oController) {
		
		var oShell= new sap.m.Shell("myShell", {
			title: "who is where",
			
		});
		
		var oApp = new sap.m.App("myApp");
		
		var tab = new sap.m.IconTabBar({
			items: [
					new sap.m.IconTabFilter({
						icon: "sap-icon://task",
						iconColor: sap.ui.core.IconColor.Critical,
						count: "1",
						text: "Country",
						key: "country"
					}),
					new sap.m.IconTabFilter({
						icon: "sap-icon://task",
						iconColor: sap.ui.core.IconColor.Critical,
						count: "2",
						text: "Reason",
						key: "reason"
					}),
					new sap.m.IconTabFilter({
						icon: "sap-icon://instance",
						iconColor: sap.ui.core.IconColor.Negative,
						count: "3",
						text: "Person",
						key: "person"
					}),
					new sap.m.IconTabFilter({
						icon: "sap-icon://shipping-status",
						iconColor: sap.ui.core.IconColor.Positive,
						count: "4",
						text: "Time",
						key: "time"
					}),
					
					new sap.m.IconTabSeparator(),
					new sap.m.IconTabFilter({
						showAll: true,
						count: "22",
						text: "Total Cost",
						key: "All"
					})
					
				],
				content: new sap.m.List("list", {
					columns: [
						new sap.m.Column({
							width: "2em",
							header: new sap.m.Label({text: "ID"})
						}),
						new sap.m.Column({
							width: "7em",
							header: new sap.m.Label({text: "Name"})
						}),
						new sap.m.Column({
							width: "3em",
							header: new sap.m.Label({text: "Status"})
						}),
						new sap.m.Column({
							width: "2em",
							minScreenWidth: "Tablet",
							hAlign: "Right",
							header: new sap.m.Label({text: "Amount"})
						}),
						new sap.m.Column({
							width: "3em",
							hAlign: "Right",
							minScreenWidth: "Tablet",
							header: new sap.m.Label({text: "Price"})
						})
					],
				})
			});
		

		tab.addStyleClass("tab");
		
		var page =  new sap.m.Page({
			title: "Who is Where",
			showNavButton: true,
			navButtonText: "Page 1",
			navButtonPress: function(){ app.back(); },
			content: [
			          
				tab,
				
			
			]
		});
		

		oApp.addPage(page);
		oShell.setAppWidthLimited(true);
		oShell.setApp(oApp);

 		
 		return oShell;
	}

});