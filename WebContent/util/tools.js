jQuery.sap.declare("util.tools");

util.tools = {
		_F_Toast:function(message){
			jQuery.sap.require("sap.m.MessageToast");
			 sap.m.MessageToast.show(message);
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
		}
}