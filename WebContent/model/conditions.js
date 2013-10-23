jQuery.sap.declare("model.conditions");

model.conditions = {
	client : '578',//default client
	dimensions : [],
	filters:{},
	path:[],
	prepare:function(){
		jQuery.sap.require("model.status");
		switch(model.status.iconTab){
			case 'country': this.dimensions.push("LANDTEXT"); 
							this.path = '0';
							break;
			//敬请期待
		};
		switch(model.status.measure){
			case 'cost': this.dimensions.push("TRIP_TOTAL");break;
			case 'times': this.dimensions.push('ONE');
		};

	}
}
model.conditions.prepare();
console.log(model.conditions);