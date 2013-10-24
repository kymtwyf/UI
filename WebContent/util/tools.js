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
            	 var oldpath= "";	 
            	 var newpath= "";
            	 for(var i=0; i<model.conditions.path.length;i++)
            		 oldpath = oldpath + model.conditions.path[i] + "." ;
            	 model.data[oldpath]=oldpath;
			//2 prepare the new data
            	  model.conditions.path.push(data);
                  model.conditions.path.push(drilldown);
             	 for(var i=0; i<model.conditions.path.length;i++)
             		 newpath = newpath + model.conditions.path[i] + "." ;
			//2.1 search if the required data exists in the model.data["newPath"]
               
        
            	 if(model.data[newpath])
            		 
			//2.2 if not they send another request to get the data
            	 else
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
                     console.log(model.conditions.path[i]);
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
            

}

var bus = sap.ui.getCore().getEventBus();
bus.subscribe("data","onChangeDataSource",util.tools.onChangeDataSource,this);