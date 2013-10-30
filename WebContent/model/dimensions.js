jQuery.sap.declare("model.dimensions");
//在显示drillDown的时候需要依据这个和path(在model.data)来改变选项。
model.dimensions = [
	//地理位置的dimension
	'LANDTEXT',
	'LOCATION',//city类似

	'CENTER__TEXT',
	'CONTROL_AREA_TEXT',
	'KUNDE',
	
	//time dimension
	'YEAR',
	'MONTH'	
]