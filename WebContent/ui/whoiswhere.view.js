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
		
		var t_cost = 81499; 			//total cost
		
		var overspend = new sap.m.ObjectStatus({
	          text : "Overspend",
	          icon : "sap-icon://alert",
	          state : "Error"
	      });
		
		var inthebudget = new sap.m.ObjectStatus({
	          text : "In the budget",
	          icon : "sap-icon://sys-enter",
	          state : "Success"
	      });
		
		//var closetothebudget = new sap.m.ObjectStatus({ 
	 //         text : "Close to the budget",
	 //         icon : "sap-icon://warning",
	  //        state : "Warning"
	 //     });
		
		var costlimit; 		//default
		
		
		function getCookie(c_name)
		{
		if (document.cookie.length>0)
		  {
		  c_start=document.cookie.indexOf(c_name + "=");
		  if (c_start!=-1)
		    { 
		    c_start=c_start + c_name.length+1 ;
		    c_end=document.cookie.indexOf(";",c_start);
		    if (c_end==-1) c_end=document.cookie.length;
		    return unescape(document.cookie.substring(c_start,c_end));
		    } 
		  }
		return "";
		}

		
		function setCookie(value,expiredays)				//store object in cookie
		{
		var exdate=new Date();
		exdate.setDate(exdate.getDate()+expiredays);
		document.cookie="costlimit"+ "=" +escape(value)+
		((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
		}
		
		function checkCookie()
		{
		var c_name=getCookie('costlimit');
		var costlimit= 50000;
		if (c_name!=null && c_name!="")
		  {
			costlimit=c_name;
		  }
		return costlimit;
		}
		
		costlimit=checkCookie();
		
		var objectheader = new sap.m.ObjectHeader({			//header 
		      number : t_cost,
		      numberUnit : "€"
		  });
		
		function setFirstStatus()
		{
			if(costlimit > t_cost)
			objectheader.setFirstStatus(inthebudget);
			else
			objectheader.setFirstStatus(overspend);
		}
		setFirstStatus();
		


		var pieChart = sap.ui.view({id:"piechart", viewName:"ui.PieChart", type:sap.ui.core.mvc.ViewType.JS});
		//pie chart of data

		
		var barChart = sap.ui.view({id:"barchart", viewName:"ui.BarChart", type:sap.ui.core.mvc.ViewType.JS});
		//bar chart of data
		
		
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
				oVBoxpage.removeAllItems();
				oVBoxpage.addItem(bar);
				oVBoxpage.addItem(pieChart);
				}
		});
		
		var button4 = new sap.m.Button('bt_showByTable', {		//table button
			type: sap.m.ButtonType.Default,
			icon: "sap-icon://table-chart",
			//text: "Table"
			press:function() {
				oVBoxpage.removeAllItems();
				oVBoxpage.addItem(bar);
				oVBoxpage.addItem(new sap.m.Text({
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
			contentLeft:[Segmented1,selecttimeinterval],
			contentRight:Segmented2,
			translucent:true
		});
		

		var oVBoxpage = new sap.m.VBox("hboxpage", {		//contain bar and pie chart 
			items:[bar,pieChart
				]
		});
		
		function reloadPage()
		{
			Segmented1.setSelectedButton(button1);
			Segmented2.setSelectedButton(button3);
			oVBoxpage.removeAllItems();
			oVBoxpage.addItem(bar);
		}
		
		var tab = new sap.m.IconTabBar({	//icon tab  under the objectheader
			items: [
					new sap.m.IconTabFilter({
						icon: "sap-icon://globe",
						text: "Country"
					}),
					
					new sap.m.IconTabFilter({
						icon: "sap-icon://task",
						text: "Reason"
					}),
					
					new sap.m.IconTabFilter({
						icon: "sap-icon://customer",
						text: "Person"
					}),
					
					new sap.m.IconTabFilter({
						icon: "sap-icon://history",
						text: "Time"
					})
					
				],
				content: [oVBoxpage],
				select: function (oEvent) {
					var selected = oEvent.getParameter("item") ;
					if(selected == 'Element sap.m.IconTabFilter#__filter0')
					{ 
						reloadPage();
						oVBoxpage.addItem(pieChart);
					}
					else if (selected == 'Element sap.m.IconTabFilter#__filter1')
					{
						reloadPage();
						oVBoxpage.addItem(pieChart);
						
					}
					else if (selected == 'Element sap.m.IconTabFilter#__filter2')
					{
						reloadPage();
						oVBoxpage.addItem(barChart);
					}
					else
					{
						reloadPage();
						oVBoxpage.addItem(pieChart);
					}
					
				  }
			
			});
		
		tab.setExpandable(false);
		tab.addStyleClass("tab");
		
		var inputcostlimit = new sap.m.Input({
		      type: sap.m.InputType.Number,
		      //placeholder: 'Enter Cost Limit ...'
		    });
		
		inputcostlimit.setValue(costlimit);
		
		var selecttimeinterval = new sap.m.Select({
			  items: [
			          new sap.ui.core.Item("timeinterval1", {text: "Last month to Today"}),
			          new sap.ui.core.Item("timeinterval12", {text:"Last two months to Today"}),
			          new sap.ui.core.Item("timeinterval13", {text:"Last year to Today"})
			        ]
			      });
	
		
		var Form = new sap.ui.commons.form.SimpleForm({ //simple form in the dialog
			  editable: true,
			  content : [
			    new sap.m.Label({
			      text: 'Cost Limit'
			    }), inputcostlimit
			  ]
			});
		
		var Form2 = new sap.ui.commons.form.SimpleForm({ //simple form in the dialog
			  editable: true,
			  content : [
			    new sap.m.Label({
			      text: 'Time Interval'
			    }), selecttimeinterval
			  ]
			});
		
			     
		var stdDialog = new sap.m.Dialog();
		var stdDialog2 = new sap.m.Dialog();
		
		stdDialog = new sap.m.Dialog({// create standard dialog 
		  title: "Setting Cost Limit",
		  content: Form,
		  
		  leftButton: new sap.m.Button({
		    text: "Ok",
		    press: function () {
		    	costlimit=inputcostlimit.getValue();
		    	setCookie(costlimit,365);
		    	setFirstStatus();
		    	stdDialog.close();
		    }
		  }),
		  rightButton: new sap.m.Button({
		    text: "Cancel",
		    press: function () {
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
		
		
		stdDialog2 = new sap.m.Dialog({// create standard dialog 
			  title: "Setting Time Interval",
			  content: Form2,
			  
			  leftButton: new sap.m.Button({
			    text: "Ok",
			    press: function () {
			    	costlimit=inputcostlimit.getValue();
			    	setCookie(costlimit,365);
			    	setFirstStatus();
			    	stdDialog2.close();
			    }
			  }),
			  rightButton: new sap.m.Button({
			    text: "Cancel",
			    press: function () {
			     	stdDialog2.close();
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
		
		
		var settingbutton = new sap.m.Button({
			icon: "sap-icon://settings",
		  press : function() {
				 sap.ui.getCore().getEventBus().publish("nav", "virtual");
				    stdDialog.open();
			}	
		});
		
		var settingbutton2 = new sap.m.Button({
			icon: "sap-icon://past",
		  press : function() {
				 sap.ui.getCore().getEventBus().publish("nav", "virtual");
				    stdDialog2.open();
			}	
		});
		
		var footer = new sap.m.Bar({ 
			contentRight: [settingbutton2,settingbutton]
		});

		page.setFooter(footer);
		
		oApp.addPage(page);
		oShell.setAppWidthLimited(true);
		oShell.setApp(oApp);
		
 		return oShell;
	}

});
