jQuery.sap.declare("model.conditions");

model.conditions = {
	client : '002',//default client
	dimensions : [],
	filters:{}
	path:'';
	prepare:function(){
		jQuery.sap.require("model.status");
		switch(model.status.iconTab){
			case 'country': this.dimensions.push("LANDTEXT"); break;
			//敬请期待
		};
		switch(model.staus.measure){
			case 'cost': this.dimensions.push("TRIP_TOTAL");
			case 'times': this.dimensions.push('ONE');
		}
	}
}
