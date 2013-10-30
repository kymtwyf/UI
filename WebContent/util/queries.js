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
				var nameFix = temp.dimensions[i].value;
				nameFix = nameFix.substring(1,nameFix.length-1);

				tempSelects.push(nameFix);
			}
			for(var i = 0 ; i < temp.measures.length; i ++){
				var nameFix = temp.measures[i].value;
				nameFix = nameFix.substring(1,nameFix.length-1);
				tempSelects.push(nameFix);
			}
			//tempSelects.push("MONTH");
			var selects = tempSelects.join();

			var filter = new Array();
			filter.push("MANDT eq \'"+temp.client+"\'");
			if(temp.months.length==2){
				filter.push('MONTH ge '+temp.months[0]);
				filter.push('MONTH le '+temp.months[1]);
			}
			console.log(temp.filters.year);
			
			var tempPath = model.status.path
			for(var i = 0 ;i < tempPath.length-1; i +=2){
				switch(tempPath[i]){
					case 'LANDTEXT':
					case 'LOCATION':
					case 'CENTER__TEXT':
					case 'CONTROL_AREA_TEXT':
					case 'KUNDE':
						filter.push(tempPath[i]+" eq \'"+tempPath[i+1]+"\' ");
						break;
					case 'MONTH':
					case 'YEAR':
						filter.push(tempPath[i]+" eq "+tempPath[i+1]+" ");
				}
				
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