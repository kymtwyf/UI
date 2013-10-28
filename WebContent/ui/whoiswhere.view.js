sap.ui.jsview("ui.whoiswhere", {

        getControllerName : function() {
                return "ui.whoiswhere";
        },

        createContent : function(oController) {

		jQuery.sap.require("util.tools");
        jQuery.sap.require("model.conditions");
        jQuery.sap.require("model.status");
        jQuery.sap.require("model.data");
        
		var bus = sap.ui.getCore().getEventBus();
		
		var dataSelected = -1;
		var pathdata = -1;  
		
		var mousePositionX=0,
			mousePositionY=0;
		
		var oShell= new sap.m.Shell("myShell");
		
		var oApp = new sap.m.App("myApp");
		
		var costlimit; 		//default你需要parseFloat(costlimit)反它转为数字再比较
		
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
		
		
		var objectheader = new sap.m.ObjectHeader({			//header 
		      number : 0,
		      numberUnit : "EUR"
		 });

		function setFirstStatus(){
			if(parseFloat(costlimit) > objectheader.getNumber())
				objectheader.setFirstStatus(inthebudget);
			else
				objectheader.setFirstStatus(overspend);
		}			
		function updateTotal(channelId,eventId,data){
			console.log("data's value "+data.value);
			if((data.value)||data.value==0){
				objectheader.setNumber(data.value);		
			}
			setFirstStatus();
		}
		bus.subscribe("total","refresh",updateTotal,this);//triggerred when the data need to be refreshed 

		                
		costlimit=util.tools.checkCookie();			

		var pieChart = new sap.viz.ui5.Column({
			width : "100%",
			selectData: function(oControlEvent){
				console.log("oControlEvent");
				console.log(oControlEvent);
				dataSelected =  oControlEvent.mParameters.data[0].data[0].ctx.path.dii_a1;
				console.log(oControlEvent.getParameters());
                pathdata=dataSelected;
				console.log("Selected: "+ oControlEvent.mParameters.data[0].data[0].ctx.path.dii_a1	);
			}
		});
		
		//mouse event 
		function mousePosition(ev){	     //get mouse position 
			if(ev.pageX || ev.pageY){
				return {x:ev.pageX, y:ev.pageY};
			}
			return {
				x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,
				y:ev.clientY + document.body.scrollTop  - document.body.clientTop
			};
		}
		
		document.onclick = mouseClick;
		
		function mouseClick(ev){ 			//get the position of mouse , help to adjust the position of popover
			ev = ev || window.event;
		    var mousePos = mousePosition(ev);
			mousePositionX = mousePos.x;
			mousePositionY = mousePos.y;  
		} 
		
		var popoverlist = new sap.m.List();								//list 

                var aliCountry=new sap.m.ActionListItem({                                                                                        //action list item
                        tap:function(oControlEvent){
                    		util.tools.onChangeDataSource(pathdata,"Country");
                        }
                });
                aliCountry.setText("To Country");
                
                var aliReason=new sap.m.ActionListItem({                                                                                        //action list item
                        tap:function(oControlEvent){
                        		util.tools.onChangeDataSource(pathdata,"Reason");
                        }      
                });
                aliReason.setText("To Reason");
                
                var aliExpenseType=new sap.m.ActionListItem({                                                                                        //action list item
                        tap:function(oControlEvent){
                    		util.tools.onChangeDataSource(pathdata,"Expense Type");
                        }
                });
                aliExpenseType.setText("To Expense Type");
                
                var aliCostCenter=new sap.m.ActionListItem({                                                                                        //action list item
                        press:function(oControlEvent){
                        	util.tools.onChangeDataSource(pathdata,"Cost Center");
                        }
                });
                aliCostCenter.setText("To Cost Center");
                
                var aliTime=new sap.m.ActionListItem({                                                                                        //action list item
                        tap:function(oControlEvent){
                        	util.tools.onChangeDataSource(pathdata,"Time");
                        }        
                });
                aliTime.setText("To Time");
                
                
               
                       
                var popover = new sap.m.Popover({                                                                                                        //popover
                        title: "Drilldown...",
                        placement: sap.m.PlacementType.Right,
                        content: popoverlist
                        });                
                
                document.ondblclick = mouseDBClick;
                
                function mouseDBClick(ev){                                //double click will pop over
                   if(dataSelected != -1){
                             adjustPopover(mousePositionX,mousePositionY);
                             util.tools.adjustPopoverList(popoverlist,aliCountry,aliReason,aliExpenseType,aliCostCenter,aliTime);
                             popover.openBy(pieChart);
                         }
                   dataSelected = -1;
                }
                
                function adjustPopover(mousePositionX,mousePositionY){
                        var px=1299;
                        var py=477;
                        popover.setOffsetX(mousePositionX-px);
                        if(py>popover) popover.setOffsetY(py-mousePositionY);
                        else  popover.setOffsetY(mousePositionY-py);
                }
                
                function refreshPieChart(channelId, eventId, oData) {
                        var PieModel = {  data : oData.content};
                        var PieData = {
                          dimensions : [
                                {axis : 1, name : oData.label, value: oData.label},
                                //{axis : 1, name : 'Year', value: "{year}"},
                          ],
                          measures : [
                                {name : oData.measure, value : oData.measure},
                          ],
                          data : {
                                path : "/data"
                          }
                        };
                        
                        var oDataset,oModel;
        
                        oDataset = new sap.viz.ui5.data.FlattenedDataset(PieData);
                        oModel = new sap.ui.model.json.JSONModel(PieModel);
                        oDataset.setModel(oModel);
                        pieChart.setDataset(oDataset);
                                        

		}
		bus.subscribe("pieChart","refresh",refreshPieChart,this);
//				
//		var pieChart = CreatePieChart();
//		//pie chart of data
		
		var temp ="{country}";
		///////////////////////////////////////////////////////////////////////////////////////////////
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
					{axis : 1, name : 'Country', value: temp},
					//{axis : 1, name : 'Year', value: "{year}"},
				  ],
				  measures : [
					{name : "Profit", value : "{profit}"},
				  ],
				  data : {
					path : "/data"
				  }
				};
				
				var oDataset,oModel;
		
				oDataset = new sap.viz.ui5.data.FlattenedDataset(PieData);
				oModel = new sap.ui.model.json.JSONModel(PieModel);
				oDataset.setModel(oModel);
	
		var PieModel2 = {
				  data : [
					{country:'China',year:'2001',profit:25},
					{country:'China',year:'2002',profit:58},
					{country:'USA',year:'2001',profit:58},
					{country:'USA',year:'2002',profit:159},
					{country:'Canada',year:'2001',profit:149},
					{country:'Canada',year:'2002',profit:38},
				  ]};
				var PieData2 = {
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
				
				var oDataset2,oModel2;
		
				oDataset2 = new sap.viz.ui5.data.FlattenedDataset(PieData2);
				oModel2 = new sap.ui.model.json.JSONModel(PieModel2);
				oDataset2.setModel(oModel2);
				/////////////test data for changing the tab
				
				
		var barChart = sap.ui.view({id:"barchart", viewName:"ui.BarChart", type:sap.ui.core.mvc.ViewType.JS});
		//bar chart of data
		
		
		var button1 = new sap.m.Button('bt_showByCost', {
			type: sap.m.ButtonType.Default,
			icon: "sap-icon://lead",
																//cost button
		});

                var button2 = new sap.m.Button('bt_showByTimes', {
                        type: sap.m.ButtonType.Default,
                        icon: "sap-icon://line-charts",
                                                                                                                                //times button 
                });
                
                var button3 = new sap.m.Button('bt_showbyChart', {                //chart button
                        type: sap.m.ButtonType.Default,
                        icon: "sap-icon://pie-chart",
                        press: function(){                                
                                oVBoxpage.removeAllItems();
                                oVBoxpage.addItem(bar);
                                oVBoxpage.addItem(pieChart);
                                }
                });
                
                var button4 = new sap.m.Button('bt_showByTable', {                //table button
                        type: sap.m.ButtonType.Default,
                        icon: "sap-icon://table-chart",
                        //text: "Table"
                        press: function(){
                                oVBoxpage.removeAllItems();
                                oVBoxpage.addItem(bar);
                                oVBoxpage.addItem(new sap.m.Text({
                             text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
                            }));
                                
                                }
                });
                
                
                var Segmented1= new sap.m.SegmentedButton('Segmented1', {        //segment button 1
                        buttons: [button1, button2], 
                        selectedButton: button1
                });

                var Segmented2= new sap.m.SegmentedButton('Segmented2', {        //segment button 2
                        buttons: [button3, button4], 
                        selectedButton: button3
                });
                
                
                var bar = new sap.m.Bar({                // bar of segment buttons
                        contentLeft:[Segmented1],
                        contentRight:Segmented2,
                        translucent:true
                });
                

                var oVBoxpage = new sap.m.VBox("hboxpage", {                //contain bar and pie chart 
                        items:[bar,pieChart]
                });
                
                function reloadPage()
                {
                        Segmented1.setSelectedButton(button1);
                        Segmented2.setSelectedButton(button3);
                        oVBoxpage.removeAllItems();
                        oVBoxpage.addItem(bar);
                }
                
                var tab = new sap.m.IconTabBar({        //icon tab  under the objectheader
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
                                                model.status.iconTab = "Country";        //
                                                model.conditions.path.length = 0;         //remove all items in path when choosing a new icon tab
                                                model.conditions.path.push(model.status.iconTab); //push the icontab
                                                reloadPage();
                                                pieChart.setDataset(oDataset);
                                                oVBoxpage.addItem(pieChart);
                                        }
                                        else if (selected == 'Element sap.m.IconTabFilter#__filter1')
                                        {
                                                model.status.iconTab  = "Reason";
                                                model.conditions.path.length = 0;         //remove all items in path when choosing a new icon tab
                                                
                                                model.conditions.path.push(model.status.iconTab); //push the icontab
                                                
                                                reloadPage();
                                                //pieChart.destroyDataset();
                                                pieChart.setDataset(oDataset2);
                                                oVBoxpage.addItem(pieChart);
                                                
                                        }
                                        else if (selected == 'Element sap.m.IconTabFilter#__filter2')
                                        {
                                                model.status.iconTab = "PersonID";
                                                model.conditions.path.length = 0;         //remove all items in path when choosing a new icon tab
                                                model.conditions.path.push(model.status.iconTab); //push the icontab
                                                reloadPage();
                                                oVBoxpage.addItem(barChart);
                                        }
                                        else
                                        {
                                                model.status.iconTab  = "Time";
                                                model.conditions.path.length = 0;         //remove all items in path when choosing a new icon tab
                                                model.conditions.path.push(model.status.iconTab); //push the icontab
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

                var fromLabel = new sap.m.Label({text:"From "});
                var toLabel = new sap.m.Label({text:"To  "});
                var fromSelect = new sap.m.Select({
                	width:"100%",
                    change: function(oControlEvent){    
                        toSelect.removeAllItems();
                    	util.tools.generateToSelectItems(toSelect,fromSelect.getSelectedItem().mProperties.text);
                    }
                });
                //when change value, trigger on the generatetoSelectItem()
                
                var toSelect = new sap.m.Select({
                	width:"100%"
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
                	content : [ fromLabel,fromSelect,toLabel,toSelect],
                	//width: "50%",
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
                            util.tools.setCookie(costlimit,365);
                            setFirstStatus();
                            stdDialog.close();
                            util.tools._F_Toast("cost limit is updated");
                    }
                  }),
                  rightButton: new sap.m.Button({
                    text: "Cancel",
                    press: function () {
                             stdDialog.close();
                    }
                  })
                 
                });
                
             
                
                stdDialog2 = new sap.m.Dialog({// create standard dialog 
                          title: "Setting Time Interval",
                          content: Form2,
                          width: "0%",
                          leftButton: new sap.m.Button({
                            text: "Ok",
                            press: function () {
                            	//get the value of fromSelect
                            	var monthfromSelected = fromSelect.getSelectedItem().mProperties.text;
                            	//get the value of toSelect
                            	var monthtoSelected = toSelect.getSelectedItem().mProperties.text;
                               
                            	//publish this event
                                if(monthtoSelected == " NOW ")
                                    monthtoSelected = util.tools.getCurrentMonth();
                            	 bus.publish("month","onChange",{
                    	    		 from: util.tools.UndoMonths(monthfromSelected),
                    	    		 to: util.tools.UndoMonths(monthtoSelected)
                    	    	 },this);
                            	 //close this dialog
                                  console.log(util.tools.UndoMonths(monthfromSelected));
                                console.log(util.tools.UndoMonths(monthtoSelected));
                            	 stdDialog2.close();
                            }
                          }),
                          rightButton: new sap.m.Button({
                            text: "Cancel",
                            press: function () {
                                     stdDialog2.close();
                            }
                          })
                        
                });
                
  	    	  
                var monthActionSheet = new sap.m.ActionSheet({
                	  buttons: [
                	    new sap.m.Button({
                	      icon: "sap-icon://past",
                	      text: "Last Season Status",
                	      press: function(){
                	    	 bus.publish("month","onChange",{
                	    		 from: util.tools.getLastSeason(),
                	    		 to: util.tools.getCurrentSeason()
                	    	 },this);
                            // console.log( util.tools.getLastSeason());
                           //  console.log( util.tools.getCurrentSeason());
                	      }
                	    }),
                	    new sap.m.Button({
                	      icon: "sap-icon://past",
                	      text: "Last Year Status",
                	      press: function(){
                	    	  bus.publish("month","onChange",{
                 	    		 from: util.tools.getLastYear(),
                 	    		 to: util.tools.getCurrentYear()
                 	    	 },this);
                            //   console.log( util.tools.getCurrentYear());
                            //  console.log( util.tools.getLastYear());
                	      }
                	    }),
                	    new sap.m.Button({
                	      icon: "sap-icon://customer-history",
                	      text: "Customize the Time Interval",
                	      press: function(){
                	    	  stdDialog2.open();
                              util.tools.generateAllItems(fromSelect,toSelect);
                	      }
                	    })
                	  ],
                	  placement: sap.m.PlacementType.Top,
                	});


                var oVBox1 = new sap.m.VBox("hbox1", {        // shorten the mergin between the object header and tab
                        items:[
                               objectheader,tab
                        ]
                });
                oVBox1.setHeight("0%");
                
                var page =  new sap.m.Page({
                        title: "Travel Analysis",
                        showNavButton: false,
                        enableScrolling:false,
                        content: [oVBox1]
                });
                
                
                var settingbutton = new sap.m.Button({
                        icon: "sap-icon://settings",
                  press : function() {
                                    stdDialog.open();
                        }        
                });
                
                var settingbutton2 = new sap.m.Button({
                        icon: "sap-icon://history",
                  press : function() {
                	  	monthActionSheet.openBy(this);
                                   
                        }        
                });

                var pullRefresh = new sap.m.PullToRefresh();
                
                pullRefresh = new sap.m.PullToRefresh({
                        //description:"description here",
                        iconDensityAware:false,
                        refresh:function(){
                                pullRefresh.hide();
                                refreshLabel.setText("clicked to refresh");
                                //pullRefresh.setDescription("helloPul");
                        }
                });
                
                var refreshLabel = new sap.m.Label({
                        text:"hello"
                });
                
                pullRefresh.addStyleClass('refresh');
                
                var refreshHBox = new sap.m.HBox({
                        items:[
                        pullRefresh,refreshLabel
                        ]
                });
                
                var footer = new sap.m.Bar({ 
                        contentLeft: [refreshHBox],
                        contentRight: [settingbutton2,settingbutton]
                });

                page.setFooter(footer);
                
                oApp.addPage(page);
                oShell.setAppWidthLimited(true);
                oShell.setApp(oApp);
                
                 return oShell;
        }

});
