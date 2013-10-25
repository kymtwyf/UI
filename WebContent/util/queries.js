jQuery.sap.declare("util.queries");

util.queries = {
		getQuery:function(field,countOrCost,filters){
			var client = filters.client?filters.client:"002";
			countOrCost = countOrCost?countOrCost:"ONE";//ONE for count and TRIP_TOTAL for total cost
			var query = "http://ld9415.wdf.sap.corp:8002/mouse/project/odata/Query.xsodata/Query?"+"$select="+field+","+countOrCost+"&$filter=MANDT eq "+client+"&$format=json";
			console.log("The query is "+query);
			//for(int i = 0 ; i < fields.length ; i ++){} 暂时考虑只有一个field需要取
			return query;
		},
		getQueryFromCurrentConditions:function(){
			jQuery.sap.require("model.status");
			var temp = model.status;
			var query = "http://ld9415.wdf.sap.corp:8002/mouse/project/odata/Query.xsodata/Query?";
			// var selects ;
			var tempSelects = new Array();
			for(var i = 0 ; i < temp.dimensions.length; i ++){
				tempSelects.push(temp.dimensions[i].name);
			}
			for(var i = 0 ; i < temp.measures.length; i ++){
				tempSelects.push(temp.measures[i].name);
			}
			tempSelects.push("MONTH");
			var selects = tempSelects.join();

			var filter = new Array();
			filter.push("MANDT eq \'"+temp.client+"\'");
			console.log(temp.filters.year);
			// for(var obj in temp.filters){
			// 		//console.log("P j obj"+obj);
			// 	if(typeof(temp.filters[obj])=='function'){
			// 		//跳过function
			// 	}else{
			// 		filter.push(obj+temp.filters[obj]);
			// 	}
			// }
			var tempPath = model.status.path
			for(var i = 0 ;i < tempPath.length-1; i +=2){
				filter.push(tempPath[i]+" eq \'"+tempPath[i+1]+"\'");
			}
			query += "$select="+selects;
			query += "&$filter=" + filter.join(" and ");
			query += "&$format=json";
			
			console.log("我得到了这样子的Query "+ query);
			return query;

		},
		getDataFromCurrentStatus:function(){
			var d = jQuery.Deferred();
			var url = this.getQueryFromCurrentConditions();
			jQuery.ajax({
				url:url,
				error:function(){
					d.reject();
					jQuery.sap.require("sap.m.MessageToast");
 					sap.m.MessageToast.show("Some error occurred when querying, please check the network and try again");
				},
				success:function(data){
					d.resolve(data);

				}
			})
			return d.promise();
		}
}