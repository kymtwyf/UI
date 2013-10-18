jQuery.sap.declare("logic.queries");

logic.queries = {
		getQuery:function(field,countOrCost,filters){
			var client = filters.client?filters.client:"002";
			countOrCost = countOrCost?countOrCost:"ONE";//ONE for count and TRIP_TOTAL for total cost
			var query = "http://ld9415.wdf.sap.corp:8002/mouse/project/odata/Test.xsodata/TRIP_DEST?"+"$select="+field+","+countOrCost+"&$filter=MANDT eq "+client+"&$format=json";
			console.log("The query is "+query);
			//for(int i = 0 ; i < fields.length ; i ++){} 暂时考虑只有一个field需要取
			return query;
		}
}