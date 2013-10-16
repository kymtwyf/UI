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
		
		var oShell= new sap.m.Shell("myShell");
		
		var oApp = new sap.m.App("myApp");
		
		var t_cost = sap.m.Text({text:"81.199"} ); 			//total cost
		
		var objectheader = new sap.m.ObjectHeader({			//header 
		      number : t_cost.getText(),
		      numberUnit : "€",
		      firstStatus : new sap.m.ObjectStatus({
		          text : "Overspend",
		          icon : "sap-icon://alert",
		          state : "Error"
		        })
		  });
		
		var pieChart = sap.ui.view({id:"piechart", viewName:"ui.PieChart", type:sap.ui.core.mvc.ViewType.JS});
		//pie chart of data
		
		
		
		var button1 = new sap.m.Button('bt_showByTimes', {
			type: sap.m.ButtonType.Default,
			icon: "sap-icon://line-charts",
																//times button 
		});
		

		var button2 = new sap.m.Button('bt_showByCost', {
			type: sap.m.ButtonType.Default,
			icon: "sap-icon://lead",
																//cost button
		});
		
		var button3 = new sap.m.Button('bt_showbyChart', {		//chart button
			type: sap.m.ButtonType.Default,
			icon: "sap-icon://pie-chart",
			press:function() {				
				oVBox_page.removeAllItems();
				oVBox_page.addItem(bar);
				oVBox_page.addItem(pieChart);
				}
		});
		
		var button4 = new sap.m.Button('bt_showByTable', {		//table button
			type: sap.m.ButtonType.Default,
			icon: "sap-icon://table-chart",
			//text: "Table"
			press:function() {
				oVBox_page.removeAllItems();
				oVBox_page.addItem(bar);
				oVBox_page.addItem(new sap.m.Text({
			     text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
			    }));
				
				}
		});
		
		
		var Segmented1= new sap.m.SegmentedButton('Segmented1', {	//segment button 1
			buttons: [button1, button2], 
			selectedButton: button1
		});

		var Segmented2= new sap.m.SegmentedButton('Segmented2', {	//segment button 2
			buttons: [button3, button4], 
			selectedButton: button3
		});
		
		var bar = new sap.m.Bar({		// bar of segment buttons
			contentLeft:Segmented1,
			contentRight:Segmented2,
			translucent:true
		});
		
		var oVBox_page = new sap.m.VBox("hbox_page", {		//contain bar and pie chart 
			items:[
					bar,
					pieChart
			]
		});
		
		var tab = new sap.m.IconTabBar({	//icon tab  under the objectheader
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
				content: [oVBox_page]
			});
		
		tab.setExpandable(false);
		tab.addStyleClass("tab");
		
		var Form = new sap.ui.commons.form.SimpleForm({ //simple form in the dialog
			  editable: true,
			  content : [
			   
			    new sap.m.Label({
			      text: 'Cost Limit'
			    }),
			    new sap.m.Input({
			      type: sap.m.InputType.Number,
			      placeholder: 'Enter Cost Limit ...'
			    })
			  ]
			});
				     
		var stdDialog = new sap.m.Dialog();
		stdDialog = new sap.m.Dialog({// create standard dialog 
		  title: "Configuration",
		  content: Form,
		  
		  leftButton: new sap.m.Button({
		    text: "Ok",
		    press: function () {
		    	alert("ok");
		    	stdDialog.close();
		    }
		  }),
		  rightButton: new sap.m.Button({
		    text: "Cancel",
		    press: function () {
		    	alert("cancel");
		    	stdDialog.close();
		    }
		  }),
		  afterClose: function (oEvent) {
		    // if dialog is closed by pressing on one of the buttons in dialog, 
		    // a history back needs to be called.
		    if (oEvent.getParameter("origin")) {
		      sap.ui.getCore().getEventBus().publish("nav", "back");
		    }
		  }
		});

		
		var oVBox1 = new sap.m.VBox("hbox1", {	// shorten the mergin between the object header and tab
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
						 sap.ui.getCore().getEventBus().publish("nav", "virtual");
						    stdDialog.open();
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
