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
		
		var button1 = new sap.m.Button('button1', {
			type: sap.m.ButtonType.Default,
			text: "Times",
			enabled: true,
		});
		
		var button2 = new sap.m.Button('button2', {
			type: sap.m.ButtonType.Default,
			text: "Money",
			enabled: true,
		});
		
		var button3 = new sap.m.Button('chart', {
			type: sap.m.ButtonType.Default,
			icon: "./images/chart.png",
			enabled: true,
		});
		
		var button4 = new sap.m.Button('table', {
			type: sap.m.ButtonType.Default,
			icon: "./images/table.png",
			enabled: true,
		});
		
		var Segmented1= new sap.m.SegmentedButton('Segmented1', {
			buttons: [button1, button2], 
			selectedButton: button1
		});
		
		var Segmented2= new sap.m.SegmentedButton('Segmented2', {
			buttons: [button3, button4], 
			selectedButton: button3
		});
		
		
		Segmented2.addStyleClass('segCont');
		
		var PieModel = {
				  data : [
					{country:'China',year:'2001',profit:25},
					{country:'China',year:'2002',profit:58},
					{country:'USA',year:'2001',profit:58},
					{country:'USA',year:'2002',profit:159},
					{country:'Canada',year:'2001',profit:149},
					{country:'Canada',year:'2002',profit:38},
				  ]};
				var PieData = {
				  dimensions : [
					{axis : 1, name : 'Country', value: "{country}"},
					{axis : 1, name : 'Year', value: "{year}"},
				  ],
				  measures : [
					{name : "Profit", value : "{profit}"},
				  ],
				  data : {
					path : "/data"
				  }
				};
				
				var oChart,oDataset,oModel;
				
				oDataset = new sap.viz.ui5.data.FlattenedDataset(PieData);
				oModel = new sap.ui.model.json.JSONModel(PieModel);
				oDataset.setModel(oModel);
			
				oChart = new sap.viz.ui5.Pie({
							width : "100%",
					        height : "100%",
							dataset: oDataset
						});
		
		
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
					
					
				],
				content: [
				          	Segmented1,Segmented2,oChart
				          ]
			});
		
		
			
				
		
		

		tab.addStyleClass("tab");
		Segmented1.addStyleClass('segCont1');
		Segmented2.addStyleClass('segCont2');
		
		var page =  new sap.m.Page({
			title: "Who is Where",
			showNavButton: true,
			navButtonText: "Page 1",
			navButtonPress: function(){ app.back(); },
			content: [ tab ]
		});
		

		oApp.addPage(page);
		oShell.setAppWidthLimited(true);
		oShell.setApp(oApp);

 		
 		return oShell;
	}

});