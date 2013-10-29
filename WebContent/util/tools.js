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
		saveData:function(){
                  var s_oldPath = model.status.path.concat(model.status.months);
                  s_oldPath = s_oldPath.join(); 
                  console.log("old path "+s_oldPath);
			model.data[s_oldPath] = model.data.CURRENT_DATA;

		},
		onChangeDataSource:function(channelId,eventId,data){

			var newPath = model.status.path.concat(model.status.months).join();
                  console.log("new Path "+newPath);
                  if(model.data[newPath]){
                        console.log("我使用了已经存储的数据");
                        model.data.CURRENT_DATA = model.data[newPath];
                        //util.tools.filterDataByMonth();

                        bus.publish('pieChart','refresh',model.data[newPath]);
                  }
                  else{
			//2 prepare the new data
                        console.log("I have to request for new data");
                        var newDataSet = util.queries.getDataFromCurrentStatus();
                        jQuery.when(newDataSet).done(function(data){
                              console.log('data loaded ');
                              var oData = {};
                              oData.content = data.d.results;
                              oData.dimensions = model.status.dimensions;
                              oData.measures = model.status.measures;
                              oData.time = new Date();
                              model.data.CURRENT_DATA = oData;
                              bus.publish('pieChart','refresh',oData);
                              //util.tools.filterDataByMonth();
                        })
                  }


			
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

		 adjustPopoverList: function(popoverlist,aliArray){ 
       
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
            filterDataByMonth:function(){
                  if(model.status.months.length==2){
                        var newDataContent = new Array();
                        var data = model.data.CURRENT_DATA.content;
                        var monthFrom = model.status.months[0];
                        var monthTo = model.status.months[1];
                        if(typeof(monthFrom)=='string'){
                              monthFrom = parseInt(monthFrom);
                        }
                        if(typeof(monthTo)=='string'){
                              monthTo = parseInt(monthTo);
                        }
                        for(var i = 0 ;i < data.length; i ++){
                              console.log('data i month ');
                              console.log(data[i].MONTH);
                              console.log(monthFrom);
                              console.log(monthTo);
                              var month = parseInt(data[i].MONTH);
                              if(month>=monthFrom&&month<=monthTo){
                                    newDataContent.push(data[i]);
                              }
                        }
                        console.log("the new data is");
                        console.log(newDataContent);
                        sap.ui.getCore().getEventBus().publish('pieChart','refresh',{
                              content:newDataContent,
                              dimensions:model.data.CURRENT_DATA.dimensions,
                              measures:model.data.CURRENT_DATA.measures,
                              time:model.data.CURRENT_DATA.time
                        });   
                  }else{
                        sap.ui.getCore().getEventBus().publish('pieChart','refresh',model.data.CURRENT_DATA);   
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

	  	    	console.log(currentMonth);
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
					url:"http://ld9415.wdf.sap.corp:8002/mouse/project/odata/Query.xsodata/Query?$select=MONTH&$filter=MANDT eq '002'&$format=json",
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
			},
                  updateMonth:function(channelId,eventId,data){
                        console.log(data);
                        console.log(data.from);
                        model.status.months = [];
                        model.status.months.push(data.from);
                        model.status.months.push(data.to);
                        util.tools.filterDataByMonth();
                  }

}

var bus = sap.ui.getCore().getEventBus();
bus.subscribe("app","onChangeDataSource",util.tools.onChangeDataSource,this);
bus.subscribe("month","onChange",util.tools.updateMonth,this);
