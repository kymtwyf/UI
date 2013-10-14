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
			text: "Chart",
			enabled: true,
		});
		
		var button4 = new sap.m.Button('table', {
			type: sap.m.ButtonType.Default,
			text: "Table",
			enabled: true,
		});
		
		var Segmented1= new sap.m.SegmentedButton('Segmented1', {
			buttons: [button1, button2], 
			selectedButton: button1
		});

		Segmented1.addStyleClass('IconTabBar');
		var Segmented2= new sap.m.SegmentedButton('Segmented2', {
			buttons: [button3, button4], 
			selectedButton: button3
		});
		
		Segmented1.addStyleClass('segCont1');
		
		Segmented2.addStyleClass('segCont2');
		
		var bar = new sap.m.Bar({
			contentLeft:Segmented1,
			contentRight:Segmented2,
			translucent:true
		});
		var panel1 = new sap.m.Panel({
			  headerText: "Three Balloons and a Text",
			  content: [
			            bar,
			    new sap.m.Text({
			      text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
			    })
			  ]
			});
		var tab = new sap.m.IconTabBar({
			items: [
					new sap.m.IconTabFilter({
						icon: "sap-icon://task",
						iconColor: sap.ui.core.IconColor.Critical,
						count: "1",
						text: "Country",
						key: "country",
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
				content: [
				panel1 				          
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