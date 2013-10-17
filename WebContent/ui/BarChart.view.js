sap.ui.jsview("ui.BarChart", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf ui.BarChart
	*/ 
	getControllerName : function() {
		return "ui.BarChart";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf ui.BarChart
	*/ 
	createContent : function(oController) {
		var oChart,oDataset,oModel;

		var BarModel = {
				  data : [
					{product:"Car", country:"China", year:"2001", profit:25, revenue:50},
					{product:"Truck", country:"China", year:"2001", profit:136, revenue:236},
					{product:"Motorcycle", country:"China", year:"2001", profit:23, revenue:43},
					{product:"Bicycle", country:"China", year:"2001", profit:116, revenue:126},
					{product:"Car", country:"USA", year:"2001", profit:58, revenue:158},
					{product:"Truck", country:"USA", year:"2001", profit:128, revenue:228},
					{product:"Motorcycle", country:"USA", year:"2001", profit:43, revenue:143},
					{product:"Bicycle", country:"USA", year:"2001", profit:73, revenue:183},
				  ]};
				var BarData = {
				  dimensions : [
					{axis : 1, name : 'Product', value: "{product}"},
					{axis : 2, name : 'Country', value: "{country}"},
					{axis : 2, name : 'Year', value: "{year}"}
				  ],
				  measures : [
					{name : "Profit", value : "{profit}"},
					{name : "Revenue", value : "{revenue}"},
				  ],
				  data : {
					path : "/data"
				  }
				};
				oDataset = new sap.viz.ui5.data.FlattenedDataset(BarData);
		        oModel = new sap.ui.model.json.JSONModel(BarModel);
		        oDataset.setModel(oModel);
		        oChart = new sap.viz.ui5.Bar({
		          width : "100%",
		          height : "100%",
		          dataset: oDataset
		        });
		        return oChart;
	}

});