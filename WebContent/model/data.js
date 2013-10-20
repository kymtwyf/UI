jQuery.sap.declare("model.data");
//用来存数据 ，key 是path

//每个data里面需要存的数据：
/*
	1.content: 内容
	2.dimension 和measure
	3.path:怎样的drill down的路线
	4.time:更新时间
*/
model.data = {
		_TEST_DATA:{
			label:null,
			content:null,
			measure:null,
		},

		// _CURRENT_DATA:null,//当前图表使用的数据
		// _D_COUNTRY_COUNT:null,
		// _D_COUNTRY_COST:null,
		// _D_REASON_COUNT:null,
		// _D_REASON_COST:null,
		// _D_PEOPLE_COUNT:null,
		// _D_PEOPLE_COST:null,
		// _D_YEAR_COUNT:null,
		// _D_YEAR_COST:null
}
