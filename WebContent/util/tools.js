jQuery.sap.declare("util.tools");

util.tools = {
		_F_Toast:function(message,timeDuring){//用来显示一条toast消息
			jQuery.sap.require("sap.m.MessageToast");
			 sap.m.MessageToast.show(message,{
			 	duration:timeDuring?timeDuring:3000
			 });
		},
		_F_PrepareData:function(whichOne){
			
			switch(whichOne){
			case 1:
				if(!logic.data._D_COUNTRY_COUNT.content){
					var url = util.queries.getQuery()
				}
				break;//_D_COUNTRY_COUNT
			case 2:break;//_D_COUNTRY_COST
			case 3:break;//_D_REASON_COUNT
			case 4:break;//_D_REASON_COST
			case 5:break;//_D_PEOPLE_COUNT
			case 6:break;//_D_PEOPLE_COST
			case 7:break;//_D_YEAR_COUNT
			case 8:break;//_D_YEAR_COST
			}
		},
		saveData:function(s_oldPath){
			model.data[s_oldPath] = model.data.CURRENT_DATA;
		},
		onChangeDataSource:function(channelId,eventId,data){
			

			//1 save the old data


            	 // var oldpath= "";	 
            	 // var newpath= "";
            	 // for(var i=0; i<model.status.path.length;i++)
            		//  oldpath = oldpath + model.status.path[i] + "." ;
            	 // model.data[oldpath]=oldpath;
			//2 prepare the new data
                  var newDataSet = util.queries.getDataFromCurrentStatus();
                  jQuery.when(newDataSet).done(function(data){
                        var oData = {};
                        oData.content = data.d.results;
                        oData.dimensions = model.status.dimensions;
                        oData.measures = model.status.measures;
                        bus.publish('pieChart','refresh',oData);
                  })


            	  // model.status.path.push(data);
               //    model.status.path.push(drilldown);
             	 // for(var i=0; i<model.status.path.length;i++)
             		//  newpath = newpath + model.status.path[i] + "." ;
			//2.1 search if the required data exists in the model.data["newPath"]
               
        
            	 // if(model.data[newpath]);
            		 
			//2.2 if not they send another request to get the data
            	 // else;
			//3 show the new data
			
		},
		//这些是用来存放cost limit在cookie里面的
		getCookie:function(c_name){
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
		},
		checkCookie:function(){
			var c_name=this.getCookie('costlimit');
			var costlimit= 50000;
			if (c_name!=null && c_name!="")
			{
				costlimit=c_name;
			}
			return costlimit;
		},
		setCookie:function(value,expiredays){
			var exdate=new Date();
			exdate.setDate(exdate.getDate()+expiredays);
			document.cookie="costlimit"+ "=" +escape(value)+
			((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
		},
		///在cookie 存放cost limit到此结束

		 adjustPopoverList:  function(popoverlist,aliArray){ 
             //you may need to adjust the content of the popover list according to the current path
             
             // var arrayOfActionListItem = new Array();       //An array which contains all action list items
             // var arrayOfFlag = new Array(true,true,true,true,true);				 //set the flag of items whose data is in path
        
             popoverlist.removeAllItems();
             console.log("aliArray");
             console.log(aliArray);
             for(var i = 0 ; i <aliArray.length; i ++){
             	var flag = true;
             	for(var j = 0 ; j <model.status.path.length; j +=2){
             	
             		if(model.status.path[j]==model.dimensions[i]) {
             			console.log('flag set to false');
             				console.log("dimension name:"+model.dimensions[i]);
             		console.log("path name:"+model.status.path[j]);

             			flag = false;
             			break;
             		}
             		if(model.status.path[j]=='ZORT1'&& model.dimensions[i]=='LANDTEXT'){
             			//已经drill down by location了，不需要再添加drill down by country
             			flag = false;
             			break;
             		}
             		if(model.status.path[j]=='CENTER__TEXT'&&model.dimensions[i]=='CONTROL_AREA_TEXT'){
             			//already drill down by cost center  the drill down by controlling area is not useful
             			flag = false;
             			break;
             		}
             		if(model.status.path[j]=='MONTH'&&model.dimensions[i]=='YEAR'){
             			//already drill down by month  the drill down by year is not useful
             			flag = false;
             			break;
             		
             		}             	
             	}
             	console.log(flag);
             	if(flag){
             		console.log('item to be added ');
             		console.log(aliArray[i]);

             		popoverlist.addItem(aliArray[i]);
             	}
         	}
             // arrayOfActionListItem.length=0;
                             
             // arrayOfActionListItem.push(aliCountry);
             // arrayOfActionListItem.push(aliReason);
             // arrayOfActionListItem.push(aliExpenseType);
             // arrayOfActionListItem.push(aliCostCenter);
             // arrayOfActionListItem.push(aliTime);         

                                     
             // for (var i=0; i<model.status.path.length; i++) {        //pop the action list item which exists in path
             //         console.log(model.status.path[i]);
             //         switch (model.status.path[i])
             //         {
             //         case "Country":
             //         	arrayOfFlag[0]=false;
             //           break;
             //         case "Reason":
             //         	arrayOfFlag[1]=false;
             //           break;
             //         case "Expense Type":
             //         	arrayOfFlag[2]=false;
             //           break;
             //         case "Cost Center":
             //         	arrayOfFlag[3]=false;
             //           break;
             //         case "Time":
             //         	arrayOfFlag[4]=false;
             //           break;
             //         }         
             // }
             
             // for(var k =arrayOfFlag.length; k>0; k--){
             // 	if(arrayOfFlag[k-1] == false)
             // 		arrayOfActionListItem.splice(k-1,1); 
             // }

             // for (var j = 0; j <= arrayOfActionListItem.length; j++) {
             //         popoverlist.insertItem(arrayOfActionListItem[j], j);
             // }
		 	},
            filterLabel:function(oDataContent,labelName){
            	var result = new Array();
            	for(var i = 0 ; i < oDataContent.length; i++){
            		var currentlabel = oDataContent[i][labelName];
            		if(result.indexOf(currentlabel)==-1){
            			result.push(currentlabel);
            		}
            	}
            	return result;
            },
            filterDataByMonth:function(data,monthFrom,monthTo){
            	var newData = new Array();
            	if(typeof(monthFrom)=='string'){
            		monthFrom = parseInt(monthFrom);
            	}
            	if(typeof(monthTo)=='string'){
            		monthTo = parseInt(monthTo);
            	}
            	for(var i = 0 ;i < data.length; i ++){
            		var month = parseInt(data[i].MONTH);
            		if(month>=monthFrom&&month<=monthTo){
            			newData.push(data[i]);
            		}
            	}
            	return newData;
            }

}

var bus = sap.ui.getCore().getEventBus();
bus.subscribe("app","onChangeDataSource",util.tools.onChangeDataSource,this);
