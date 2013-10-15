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
		
		var pieChart = sap.ui.view({id:"piechart", viewName:"ui.PieChart", type:sap.ui.core.mvc.ViewType.JS});
		
		var button1 = new sap.m.Button('bt_showByTimes', {
			type: sap.m.ButtonType.Default,
			text: "Times"
		});
		

		var button2 = new sap.m.Button('bt_showByCost', {
			type: sap.m.ButtonType.Default,
			text: "Cost"
		});
		
		var button3 = new sap.m.Button('bt_showbyChart', {
			type: sap.m.ButtonType.Default,
			icon: "./images/chart.png",
			//text: "Chart"
			press:function() {
				alert("btn3");
				panel1.removeAllContent();
				panel1.addContent(bar);
				panel1.addContent(pieChart);
				panel1.addContent(
					    new sap.m.Text({
						     text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
						    }));
				}
		});
		
		var button4 = new sap.m.Button('bt_showByTable', {
			type: sap.m.ButtonType.Default,
			icon: "./images/table.png",
			//text: "Table"
			press:function() {
				alert("btn4");
				panel1.removeAllContent();
				panel1.addContent(bar);
				panel1.addContent(new sap.m.Text({
			     text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
			    }));
				}
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
		
		
		
		var bar = new sap.m.Bar({
			contentLeft:Segmented1,
			contentRight:Segmented2,
			translucent:true
		});
		
		var panel1 = new sap.m.Panel({
			  width:"100%",
			  headerText: "Three Balloons and a Text",
			  content: [
			            bar,pieChart,
			    new sap.m.Text({
			     text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
			    })
			  ]
			});
		
		
		var tab = new sap.m.IconTabBar({
			width:"60%",
			items: [
					new sap.m.IconTabFilter({
						icon: "sap-icon://task",
						iconColor: sap.ui.core.IconColor.Positive,
						text: "Country"
					}),
					new sap.m.IconTabFilter({
						icon: "sap-icon://task",
						iconColor: sap.ui.core.IconColor.Positive,
						text: "Reason"
					}),
					new sap.m.IconTabFilter({
						icon: "sap-icon://instance",
						iconColor: sap.ui.core.IconColor.Positive,
						text: "Person"
					}),
					new sap.m.IconTabFilter({
						icon: "sap-icon://shipping-status",
						iconColor: sap.ui.core.IconColor.Positive,
						text: "Time"
					}),

					new sap.m.IconTabSeparator(),
					new sap.m.IconTabFilter({
						showAll: true,
						text: "Total Cost"
					})
					
				],
				content: [panel1]
			});
		
		tab.addStyleClass("tab");
	//	Segmented1.addStyleClass('segCont1');
	//	Segmented2.addStyleClass('segCont2');
		
		
		var oShell= new sap.m.Shell("myShell");
		
		var oApp = new sap.m.App("myApp");
		
		var headerHBox = new sap.m.HBox("headerHBox", {
			width:"100%",
			items:[tab,
			  new sap.m.Label('countLabel', {
			  text: "Here some figure is displayed",
			  design: sap.m.LabelDesign.Bold
			})
		]	
		});
		var mainVBox = new sap.m.VBox("mainVBox",{
			width:"100%",
			height:"100%",
			alignItems:"Center",
			items:[headerHBox]
		});
		
		
		
		var page =  new sap.m.Page({
			title: "Travel Analysis",
			showNavButton: false,
			navButtonPress: function(){ app.back(); },
			content: [ mainVBox ]
		});
		
		
		
		oApp.addPage(page);
		oShell.setAppWidthLimited(true);
		oShell.setApp(oApp);

 		
 		return oShell;
	}

});
