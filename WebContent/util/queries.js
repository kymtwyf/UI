jQuery.sap.declare("util.queries");

util.queries = {
		getQuery:function(field,countOrCost,filters){
			var client = filters.client?filters.client:"002";
			countOrCost = countOrCost?countOrCost:"ONE";//ONE for count and TRIP_TOTAL for total cost
			var query = "http://ld9415.wdf.sap.corp:8002/mouse/project/odata/Test.xsodata/TRIP_DEST?"+"$select="+field+","+countOrCost+"&$filter=MANDT eq "+client+"&$format=json";
			console.log("The query is "+query);
			//for(int i = 0 ; i < fields.length ; i ++){} 暂时考虑只有一个field需要取
			return query;
		},
		getQueryFromCurrentConditions:function(){
			jQuery.sap.require("model.conditions");
			var temp = model.conditions;
			var query = "http://ld9415.wdf.sap.corp:8002/mouse/project/odata/Test.xsodata/TRIP_DEST?";
			var selects = temp.dimensions.join();
			var filter = new Array();
			filter.push("client eq "+temp.client);
			console.log(temp.filters.year);
			for(var obj in temp.filters){
					//console.log("P j obj"+obj);
				if(typeof(temp.filters[obj])=='function'){
					//跳过function
				}else{
					filter.push(obj+temp.filters[obj]);
				}
			}
			query += "$select="+selects;
			query += "&$filter=" + filter.join(" and ");
			query += "&$format=json";
			
			console.log("我得到了这样子的Query "+ query);
			return query;

		}
}