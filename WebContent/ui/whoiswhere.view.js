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
			icon: "sap-icon://line-charts",
			//text: "Times"
		});
		

		var button2 = new sap.m.Button('bt_showByCost', {
			type: sap.m.ButtonType.Default,
			icon: "sap-icon://lead",
			//text: "Cost"
		});
		
		var button3 = new sap.m.Button('bt_showbyChart', {
			type: sap.m.ButtonType.Default,
			icon: "sap-icon://pie-chart",
			press:function() {				
				panel1.removeAllContent();
				panel1.addContent(bar);
				panel1.addContent(pieChart);
				}
		});
		
		var button4 = new sap.m.Button('bt_showByTable', {
			type: sap.m.ButtonType.Default,
			icon: "sap-icon://table-chart",
			//text: "Table"
			press:function() {
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
		
		var t_cost = sap.m.Text({text:"81.199"} );
		
		var objectheader = new sap.m.ObjectHeader({
		      //title : "Turbine K7",
		      number : t_cost.getText(),
		      numberUnit : "€",
		      firstStatus : new sap.m.ObjectStatus({
		          text : "Overspend",
		          icon : "sap-icon://alert",
		          state : "Error"
		        })
		  });
		
		var bar = new sap.m.Bar({
			contentLeft:Segmented1,
			contentRight:Segmented2,
			translucent:true
		});
		
		var oVBox_page = new sap.m.VBox("hbox_page", {
			items:[
					bar,
					pieChart
			]
		});
		
		var page1 = new sap.m.Page("pageContent",{
			showNavButton: false,
			enableScrolling:false,
			height:"100%",
			//  width:"120%",
			//  headerText: "Three Balloons and a Text",
			showHeader:false,
			content: [oVBox_page] 
			});
	

		var tab = new sap.m.IconTabBar({
			items: [
					new sap.m.IconTabFilter({
						icon: "sap-icon://globe",
						iconColor: sap.ui.core.IconColor.Positive,
						text: "Country"
					}),
					new sap.m.IconTabFilter({
						icon: "sap-icon://task",
						iconColor: sap.ui.core.IconColor.Positive,
						text: "Reason"
					}),
					new sap.m.IconTabFilter({
						icon: "sap-icon://customer",
						iconColor: sap.ui.core.IconColor.Positive,
						text: "Person"
					}),
					new sap.m.IconTabFilter({
						icon: "sap-icon://history",
						iconColor: sap.ui.core.IconColor.Positive,
						text: "Time"
					})
				],
				content: [page1]
			});
		tab.setExpandable(false);
		tab.addStyleClass("tab");
		
		var oShell= new sap.m.Shell("myShell");
		
		var oApp = new sap.m.App("myApp");
		
		var oVBox1 = new sap.m.VBox("hbox1", {
			items:[
			       objectheader,tab
			]
		});
		oVBox1.setHeight("0%");
		
		var page =  new sap.m.Page({
			title: "Travel Analysis",
			showNavButton: false,
			enableScrolling:false,
			navButtonPress: function(){ app.back(); },
			content: [oVBox1]
		});
		
	
		var footer = new sap.m.Bar({ 
			contentRight: [new sap.m.Button({
				icon: "sap-icon://settings",
					press : function() {
						
					}	
				})]
		});

		page.setFooter(footer);
		
		oApp.addPage(page);
		oShell.setAppWidthLimited(true);
		oShell.setApp(oApp);
		
 		return oShell;
	}

});
