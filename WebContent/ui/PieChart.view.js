sap.ui.jsview("ui.PieChart", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf ui.PieChart
	*/ 
	getControllerName : function() {
		return "ui.PieChart";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf ui.PieChart
	*/ 
	createContent : function(oController) {
		var PieModel = {
				  data : [
					{country:'China',year:'2001',profit:25},
					{country:'China',year:'2002',profit:58},
					{country:'USA',year:'2001',profit:58},
					{country:'USA',year:'2002',profit:159},
					{country:'Canada',year:'2001',profit:149},
					{country:'Canada',year:'2002',profit:38},
				  ]};
				var PieData = {
				  dimensions : [
					{axis : 1, name : 'Country', value: "{country}"},
					{axis : 1, name : 'Year', value: "{year}"},
				  ],
				  measures : [
					{name : "Profit", value : "{profit}"},
				  ],
				  data : {
					path : "/data"
				  }
				};
				
				var oChart,oDataset,oModel;
				
				oDataset = new sap.viz.ui5.data.FlattenedDataset(PieData);
				oModel = new sap.ui.model.json.JSONModel(PieModel);
				oDataset.setModel(oModel);
			
				oChart = new sap.viz.ui5.Pie({
							width : "100%",
					        height : "100%",
							dataset: oDataset
						});
		
 		return oChart;
	}

});