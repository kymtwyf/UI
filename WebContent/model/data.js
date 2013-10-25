jQuery.sap.declare("model.data");
//用来存数据 ，key 是path

//每个data里面需要存的数据：
/*
	1.content: 内容
	2.dimension 
	
	{
	axis:
	name:
	value
	}
	//和measure
	
	{
	name:
	value:
	}
	
	3.path:怎样的drill down的路线
	4.time:更新时间
*/
model.data = {
}
// bus.publish("channel",'event',{
// 	from:12305,
// 	to:
// },this)
// function somethign(channel,event, data){
// 	data.from
// }
// bus.subscribe("channel",'event',somethign);