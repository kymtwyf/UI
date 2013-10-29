jQuery.sap.declare("model.status");
//当前页面上的各种btn的状态。其值随btn改变而变化

var bus = sap.ui.getCore().getEventBus();
model.status = {
	iconTab : 'LANDTEXT',//初始值country 
	measure : 'cost',//1 cost 2 times
	showType : 'barChart',//1 barChart 2 table //可能需要PieChart

	client : '578',//default client
	dimensions : [],
	/*
	{
	axis:
	name:
	value
	}*/
	measures :[],	
	/*
	{
	name:
	value:
	}
	*/
	filters:{
		// "country":" eq Germany"
	},
	months:[],	
	path:[],
	changeIconTab:function(channelId, eventId, data){
		
		model.status.iconTab = data.s_newIconTab;
		model.status.measure = data.s_newMeasure;
		model.status.showType = data.s_showType;
		//set this.dimensions
		model.status.path = [];
		model.status.dimensions = [];
		model.status.measures = [];
		switch(model.status.iconTab){
			case 'LANDTEXT':
								model.status.dimensions.push({
								axis:1,
								name:"Country",
								value:"{LANDTEXT}",
							}); 
							model.status.path.push("LANDTEXT");
							break;
			case 'ZORT1':
								model.status.dimensions.push({
								axis:1,
								name:"ZORT1",
								value:"{ZORT1}",
							}); 
							model.status.path.push("ZORT1");
							break;
			case 'CONTROL_AREA_TEXT':
								model.status.dimensions.push({
								axis:1,
								name:"CONTROL_AREA_TEXT",
								value:"{CONTROL_AREA_TEXT}",
							}); 
							model.status.path.push("CONTROL_AREA_TEXT");
							break;
			case 'KUNDE':
								model.status.dimensions.push({
								axis:1,
								name:"Reason",
								value:"{KUNDE}",
							}); 
							model.status.path.push("KUNDE");
							break;

			case 'YEAR':
								model.status.dimensions.push({
								axis:1,
								name:"YEAR",
								value:"{YEAR}",
							}); 
							model.status.path.push("YEAR");
							break;
			//case 'region'
		}
		// set this.measures
		model.status.measures = [];
		switch(model.status.measure){
			case 'cost':
				model.status.measures.push({
				name:"total cost",
				value:"{TRIP_TOTAL}",
			});
				break;
			case 'times':model.status.measures.push({
				name:"ONE",
				value:"{ONE}"
			});
				break;
			default:model.status.measures.push({
				name:"total cost",
				value:"{TRIP_TOTAL}",
				});
				break;
		}
		bus.publish('app','onChangeDataSource');
		// model.status.dimensions = [];

	},
	prepare:function(){
		jQuery.sap.require("model.status");
		switch(model.status.iconTab){
			case 'LANDTEXT': var index = model.status.measures.length;
								model.status.dimensions.push({
								axis:index+1,
								name:"Country",
								value:"{LANDTEXT}",
							}); 
							model.status.path.push("LANDTEXT");
							break;
			//不需要期待了，如果只是开始阶段的话，我就默认为LANDTEXT
		};
		switch(model.status.measure){
			case 'cost': 
						model.status.measures.push({
							name:"total cost",
							value:"{TRIP_TOTAL}",
						});
						break;
			case 'times': //TODO: this may not be used  YOU SHOULD DELETE IT
						
						model.status.measures.push({
							axis:index2+1,
							name:"ONE",
							value:"{ONE}"
						});	
		};

	},
	pushPath:function(itemArray){
		if(itemArray.length==1){
			model.status.path.concat(itemArray)
		}else if(itemArray.length==2){
			model.status.path.concat(itemArray);
			// var newDataSet = jQuery.Deffered();
		}
		bus.publish('app','onChangeDataSource');

	},
	popPath:function(){//一次pop 两个
		if(model.status.path.length>2){
			model.status.path.pop();
			model.status.path.pop();
		}
		bus.publish('app','onChangeDataSource');

	},
	clearPath:function(){
		model.status.path = [];
	}
}
model.status.prepare();
bus.subscribe("app","onChangeIconTab",model.status.changeIconTab,this);

