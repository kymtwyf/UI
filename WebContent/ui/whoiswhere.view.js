sap.ui.jsview("ui.whoiswhere", {

        getControllerName : function() {
                return "ui.whoiswhere";
        },

        createContent : function(oController) {

		jQuery.sap.require("util.tools");
        jQuery.sap.require("model.conditions");
        jQuery.sap.require("model.status");
        jQuery.sap.require("model.data");
        jQuery.sap.require("model.dimensions");
        
		var bus = sap.ui.getCore().getEventBus();
		
		var dataSelected = '';

		var pathdata = -1;  
		
		var mousePositionX=0,
			mousePositionY=0;
		
		var oShell= new sap.m.Shell("myShell");
		
		var oApp = new sap.m.App("myApp");
		
		var costlimit=util.tools.checkCookie(); 		//default你需要parseFloat(costlimit)反它转为数字再比较
		
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
	

		var pieChart = new sap.viz.ui5.Column({
			width : "100%",
			selectData: function(oControlEvent){
				console.log('selectDat');
				console.log(oControlEvent.getParameters());	
				// console.log("oControlEvent");
				// console.log(oControlEvent);
				// dataSelected =  oControlEvent.mParameters.data[0].data[0].ctx.path.dii_a1;
				// //data1=dataSelected;
    //             pathdata=dataSelected;
    //             var currentData = model.data.CURRENT_DATA;

    //             var landtexts = util.tools.filterLabel(model.data.CURRENT_DATA.content,"LANDTEXT");
    //             console.log("landtest  = " +landtexts);
    //             console.log(landtexts[pathdata]);
				// console.log("Selected: "+ oControlEvent.mParameters.data[0].data[0].ctx.path.dii_a1	);
			},
			showTooltip:function(oControlEvent){
				console.log("showTooltip");
			    var p = oControlEvent.getParameters();
				console.log(p);
				dataSelected = p.data.footer[0].value.val;
				//console.log(dataselected);
				// console.log(p.data);
				// console.log(p.footer);
				// console.log(p.plotArea);
				// console.log(p.plotArea);


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
			if(popover.isOpen()){
				popover.close();
			}
		} 
		
		///********************************pop over 的items*******************************8/
		//这个顺序不能随便换 是根据model.dimensions来的
		var popoverlist = new sap.m.List();								//list 
		var aliArray = new Array();
        var aliCountry=new sap.m.ActionListItem({                                                                                        //action list item
                tap:function(oControlEvent){
                        model.status.path.push(dataSelected);
                        dataSelected = '';
                        model.status.path.push("LANDTEXT");
                        model.status.dimensions = [];
                        var index  = model.status.dimensions.length
                        model.status.dimensions.push({
                        	axis:index+1,
							name:'LANDTEXT',
							value:'{LANDTEXT}'
                        })
		bus.publish('app','onChangeDataSource');

                }
        });
        aliCountry.setText("By Country");
        aliArray.push(aliCountry);
        var aliLocation=new sap.m.ActionListItem({                                                                                        //action list item
                tap:function(oControlEvent){
                        model.status.path.push(dataSelected);
                        dataSelected = '';
                        model.status.path.push("ZORT1");
                        model.status.dimensions = [];
                        var index  = model.status.dimensions.length
                        model.status.dimensions.push({
                        	axis:index+1,
							name:'ZORT1',
							value:'{ZORT1}'
                        })
		bus.publish('app','onChangeDataSource');

                }
        });
        aliLocation.setText("By Location");
        aliArray.push(aliLocation);

		var aliCostCenter=new sap.m.ActionListItem({                                                                                        //action list item
                press:function(oControlEvent){
                        model.status.path.push(dataSelected);
                        dataSelected = '';
                        model.status.path.push("CENTER__TEXT");
                        model.status.dimensions = [];
                        var index  = model.status.dimensions.length
                        model.status.dimensions.push({
                        	axis:index+1,
							name:'CENTER__TEXT',
							value:'{CENTER__TEXT}'
                        })
		bus.publish('app','onChangeDataSource');

                }
        });
        aliCostCenter.setText("By Cost Center");
        aliArray.push(aliCostCenter);

        var aliControlArea=new sap.m.ActionListItem({                                                                                        //action list item
                press:function(oControlEvent){
                        model.status.path.push(dataSelected);
                        dataSelected = '';                  
                        model.status.path.push("CONTROL_AREA_TEXT");
                        model.status.dimensions = [];
                        var index  = model.status.dimensions.length
                        model.status.dimensions.push({
                        	axis:index+1,
							name:'CONTROL_AREA_TEXT',
							value:'{CONTROL_AREA_TEXT}'
                        })
		bus.publish('app','onChangeDataSource');

                }
        });
        aliControlArea.setText("By Controlling Area");
        aliArray.push(aliControlArea);

        var aliReason=new sap.m.ActionListItem({                                                                                        //action list item
                tap:function(oControlEvent){
                        model.status.path.push(dataSelected);
                        dataSelected = '';
                        model.status.path.push("KUNDE");
                        model.status.dimensions = [];
                    	var index  = model.status.dimensions.length
                        model.status.dimensions.push({
                        	axis:index+1,
							name:'KUNDE',
							value:'{KUNDE}'
                        })
		bus.publish('app','onChangeDataSource');

                       // pieChart.setDataset(oDataset2); 
                }      
        });
        aliReason.setText("By Reason");
        aliArray.push(aliReason);
                
        var aliYear=new sap.m.ActionListItem({                                                                                        //action list item
                tap:function(oControlEvent){
                        model.status.path.push(dataSelected);
                        dataSelected = '';
                        model.status.path.push("YEAR");
                        model.status.dimensions = [];
                    	var index  = model.status.dimensions.length
                        model.status.dimensions.push({
                        	axis:index+1,
							name:'YEAR',
							value:'{YEAR}'
                        })
		bus.publish('app','onChangeDataSource');

                }        
        });
        aliYear.setText("By Year");
        aliArray.push(aliYear);

		var aliMonth=new sap.m.ActionListItem({                                                                                        //action list item
                tap:function(oControlEvent){
                        model.status.path.push(dataSelected);
                        dataSelected = '';
                        model.status.path.push("MONTH");
                        model.status.dimensions = [];
                        var index  = model.status.dimensions.length
                        model.status.dimensions.push({
                        	axis:index+1,
							name:'MONTH',
							value:'{MONTH}'
                        })
		bus.publish('app','onChangeDataSource');

                }        
        });
        aliMonth.setText("By Month");
        aliArray.push(aliMonth);

        ///********************************pop over 的items*******************************8/
        
       
               
        var popover = new sap.m.Popover({                                                                                                        //popover
                title: "Drilldown...",
                placement: sap.m.PlacementType.Right,
                content: popoverlist
                });                
        
        document.ondblclick = mouseDBClick;
        
        function mouseDBClick(ev){                                //double click will pop over
           console.log('event '+dataSelected);
           if(dataSelected != ''){
                     adjustPopover(mousePositionX,mousePositionY);
                     util.tools.adjustPopoverList(popoverlist,aliArray);
                     popover.openBy(pieChart);
                 }
        }
        
        function adjustPopover(mousePositionX,mousePositionY){
                var px=1299;
                var py=477;
                popover.setOffsetX(mousePositionX-px);
                if(py>popover) popover.setOffsetY(py-mousePositionY);
                else  popover.setOffsetY(mousePositionY-py);
        }
        //这个refresh需要增加：多个dimensions的显示功能
        function refreshPieChart(channelId, eventId, oData) {
        		console.log(oData.content);
        		console.log(oData.dimensions);
        		console.log(oData.measures);

                var PieModel = {  data : oData.content};
                var PieData = {
                  dimensions : oData.dimensions,
                  measures : oData.measures,
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
                
                function reloadPage()//这个需要改变
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
                                        // new sap.m.IconTabFilter({
                                        //         icon: "sap-icon://map",
                                        //         text: "Location"
                                        // }),                                    
                                        new sap.m.IconTabFilter({
                                                icon: "sap-icon://official-service",
                                                text: "Controll Area"
                                        }),
                                        // new sap.m.IconTabFilter({
                                        //         icon: "sap-icon://task",
                                        //         text: "Reason"
                                        // }),
                                        new sap.m.IconTabFilter({
                                                icon: "sap-icon://history",
                                                text: "Year"
                                        })
                                ],
                                content: [oVBoxpage],
                                select: function (oEvent) {
                                        var selected = oEvent.getParameter("item") ;
                                        if(selected == 'Element sap.m.IconTabFilter#__filter0'&&model.status.iconTab!='LANDTEXT')
                                        { 
                                        	bus.publish('app','onChangeIconTab',{
                                        		s_newIconTab:'LANDTEXT',
                                        		s_newMeasure:'TRIP_TOTAL',
                                        		s_showType:'barChart'
                                        	})
                                                //model.status.iconTab = "LANDTEXT";        //
                                                // model.status.path.length = [];         //remove all items in path when choosing a new icon tab
                                                // model.status.path.push(model.status.iconTab); //push the icontab
                                                // reloadPage();
                                                // pieChart.setDataset(oDataset);
                                                // oVBoxpage.addItem(pieChart);

                                        }                                        
                                        else if (selected == 'Element sap.m.IconTabFilter#__filter1'&&model.status.iconTab!='CONTROL_AREA_TEXT')
                                        {
                                        	bus.publish('app','onChangeIconTab',{
                                        		s_newIconTab:'CONTROL_AREA_TEXT',
                                        		s_newMeasure:'TRIP_TOTAL',
                                        		s_showType:'barChart'
                                        	})
                                               // model.status.iconTab = "CONTROL_AREA_TEXT";
                                                // model.status.path.length = [];         //remove all items in path when choosing a new icon tab
                                                // model.status.path.push(model.status.iconTab); //push the icontab
                                                // reloadPage();
                                                // oVBoxpage.addItem(barChart);
                                        }
                                        
                                        else if (selected == 'Element sap.m.IconTabFilter#__filter2'&&model.status.iconTab!='YEAR')
                                        {
                                        	bus.publish('app','onChangeIconTab',{
                                        		s_newIconTab:'YEAR',
                                        		s_newMeasure:'TRIP_TOTAL',
                                        		s_showType:'barChart'
                                        	})
                                               // model.status.iconTab  = "YEAR";
                                                // model.status.path.length = [];         //remove all items in path when choosing a new icon tab
                                                // model.status.path.push(model.status.iconTab); //push the icontab
                                                // reloadPage();
                                                // oVBoxpage.addItem(pieChart);
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
