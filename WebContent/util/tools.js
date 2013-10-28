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
		onChangeDataSource:function(data,drilldown){
			
			//1 save the old data
            	 var oldpath= this.ArrayToString(model.conditions.path);	 
            	 model.data[oldpath]=oldpath;
			//2 prepare the new data
            	  model.conditions.path.push(data);
                  model.conditions.path.push(drilldown);
             	 var newpath= ArrayToString(model.conditions.path);	 
			//2.1 search if the required data exists in the model.data["newPath"]
            	 if(model.data[newpath]){
            		 model.conditions.path= this.StringToArray(newpath);
            	 }
			//2.2 if not they send another request to get the data
            	 else{
            		 
            	 } 
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

		 adjustPopoverList:  function(popoverlist,aliCountry,aliReason,aliExpenseType,aliCostCenter,aliTime){ 
             //you may need to adjust the content of the popover list according to the current path
             
             var arrayOfActionListItem = new Array();       //An array which contains all action list items
             var arrayOfFlag = new Array(true,true,true,true,true);				 //set the flag of items whose data is in path
        
             popoverlist.removeAllItems();
             arrayOfActionListItem.length=0;
                             
             arrayOfActionListItem.push(aliCountry);
             arrayOfActionListItem.push(aliReason);
             arrayOfActionListItem.push(aliExpenseType);
             arrayOfActionListItem.push(aliCostCenter);
             arrayOfActionListItem.push(aliTime);         

                                     
             for (var i=0; i<model.conditions.path.length; i++) {        //pop the action list item which exists in path

                     switch (model.conditions.path[i])
                     {
                     case "Country":
                     	arrayOfFlag[0]=false;
                       break;
                     case "Reason":
                     	arrayOfFlag[1]=false;
                       break;
                     case "Expense Type":
                     	arrayOfFlag[2]=false;
                       break;
                     case "Cost Center":
                     	arrayOfFlag[3]=false;
                       break;
                     case "Time":
                     	arrayOfFlag[4]=false;
                       break;
                     }         
             }
             
             for(var k =arrayOfFlag.length; k>0; k--){
             	if(arrayOfFlag[k-1] == false)
             		arrayOfActionListItem.splice(k-1,1); 
             }

             for (var j = 0; j <= arrayOfActionListItem.length; j++) {
                     popoverlist.insertItem(arrayOfActionListItem[j], j);
             }
		 	},
		 	ArrayToString: function(array){
		 		var string="";
		 		for(var i = 0;i<array.length;i++){
		 			string = string +array[i]+".";
		 		}
		 		return string;
		 	},
		 	getCurrentMonth: function(){
		 		  var date = new Date();
	  	    	  var year = date.getFullYear().toString();
	  	    	  var month = date.getMonth()+1;
	  	    	  month = month.toString();
	  	    	 var currentMonth;
	  	    	  if(month<10)
	  	    	 currentMonth = year+'0'+month;
	  	    	  else
	  	    		currentMonth = year + month;
	  	    	  return currentMonth;
		 	},
		 	getLastSeason: function(){ 
		 		var date = new Date();
		 		var year = date.getFullYear();
		 		var month = date.getMonth()+1;
		 		var season;
		 		switch(month)
		 		{
		 		case 1:
		 			season="10";
		 			year=year-1;
                    break;
		 		case 2:
		 			season="10";
		 			year=year-1;
                    break;
		 		case 3:
		 			season="10";
		 			year=year-1;
                    break;
		 		case 4:
		 			season="01";
                    break;
		 		case 5:
		 			season="01";
                    break;
		 		case 6:
		 			season="01";
                    break;
		 		case 7:
		 			season="04";
                    break;
		 		case 8:
		 			season="04";
                    break;
		 		case 9:
		 			season="04";
                    break;
		 		case 10:
		 			season="07";
                    break;
		 		case 11:
		 			season="07";
                    break;
		 		case 12:
		 			season="07";
                    break;
		 		}
		 		var lastSeason = year.toString()+season.toString();
		 		return lastSeason;
		 		
		 	},
		 	getCurrentSeason: function(){ 
		 		var date = new Date();
		 		var year = date.getFullYear();
		 		var month = date.getMonth()+1;
		 		var season;
		 		switch(month)
		 		{
		 		case 1:
		 			season="01";
                    break;
		 		case 2:
		 			season="01";
                    break;
		 		case 3:
		 			season="01";
                    break;
		 		case 4:
		 			season="04";
                    break;
		 		case 5:
		 			season="04";
                    break;
		 		case 6:
		 			season="04";
                    break;
		 		case 7:
		 			season="07";
                    break;
		 		case 8:
		 			season="07";
                    break;
		 		case 9:
		 			season="07";
                    break;
		 		case 10:
		 			season="10";
                    break;
		 		case 11:
		 			season="10";
                    break;
		 		case 12:
		 			season="10";
                    break;
		 		}
		 		var currentSeason = year.toString()+season.toString();
		 		return currentSeason;
		 		
		 	},
		 	getCurrentYear: function(){
		 		  var date = new Date();
	  	    	  var year = date.getFullYear().toString();
	  	    	 var currentYear = year + "01";
	  	    	  return currentYear;
		 	},
		 	getLastYear: function(){
		 		  var date = new Date();
	  	    	  var year = date.getFullYear()-1;
	  	    	 var LastYear = year.toString() + "01";
	  	    	  return LastYear;
		 	},
			Months : [],
		 	getMonthInfoFromOdata: function(){
		 		var d = jQuery.Deferred();
		 		jQuery.ajax({
					url:"http://ld9415.wdf.sap.corp:8002/mouse/project/odata/Query.xsodata/Query?$select=MONTH&$filter=MANDT eq '578'&$format=json",
				 	error:function(error){
						util.tools._F_Toast("Fail to load data of months, Please check your network connection");
					},
					success:function(data){	
						//get the  month and store in the Months[]
						for(var i = 0; i<data.d.results.length;i++){
							util.tools.Months.push(data.d.results[i].MONTH);
						}
			 			d.resolve();
						
					}
				});

		 		return d.promise();
		 		
		 		
		 	},
		 	generateAllItems: function(fromSelect,toSelect){
		 		
		 		jQuery.when(this.getMonthInfoFromOdata()).done(function(){

		 		//generate items of all months according to the months getting from ODATA
				for(var i=util.tools.Months.length-2; i>0; i--)
				{

					fromSelect.insertItem(new sap.ui.core.Item( { text: util.tools.decorateMonths(util.tools.Months[i]) }));
				}

				
					toSelect.insertItem(new sap.ui.core.Item( {text: " NOW "}));
		 	  });
			},
			generateToSelectItems: function(Select,value){
				//generaFfte items of all months according the Months and Selected
				jQuery.when(this.getMonthInfoFromOdata()).done(function(){

					Select.insertItem(new sap.ui.core.Item( {text: " NOW "}));

					for(var i = util.tools.Months.length-1; i>0; i--)
					{
						if(util.tools.decorateMonths(util.tools.Months[i])!= value)
						Select.insertItem(new sap.ui.core.Item( {text: util.tools.decorateMonths(util.tools.Months[i])  }));
						else
							break;
					}

				});
			},
			decorateMonths: function(string)
			{
				var first = string.slice(0,4);
				var second = string.slice(4,6);
				return string = first + '/'+ second;
			},
			UndoMonths: function(string){
				var first = string.slice(0,4);
				var second = string.slice(5,7);
				return string = first + second;
			}

}

var bus = sap.ui.getCore().getEventBus();
bus.subscribe("data","onChangeDataSource",util.tools.onChangeDataSource,this);