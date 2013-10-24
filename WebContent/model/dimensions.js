jQuery.sap.declare("model.dimensions");
//在显示drillDown的时候需要依据这个和path(在model.data)来改变选项。
model.dimensions = {
	costCenter:'CENTER_TEXT',
	controlArea:'CONTROL_AREA_TEXT',
	reason:'KUNDE',
	//地理位置的dimension
	country:'LANDTEXT',
	location:'ZORT1',//city类似
	//time dimension
	year:'YEAR',
	month:'MONTH'	
}