sap.ui.controller("ui.whoiswhere", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf demo.MainPage
*/
	onInit: function() {
		var bus = sap.ui.getCore().getEventBus();
		// bus.subscribe("app", "DataLoaded", function () {
			
		// }, this);
		var year = new Date().getFullYear();
		console.log("year is "+year);
		var totalUrl = "http://ld9415.wdf.sap.corp:8002/mouse/project/odata/Query.xsodata/Query?$select=TRIP_TOTAL&$filter=MANDT eq '578' and YEAR eq '"+2009+"'&$format=json";
		console.log("totalUrl = "+totalUrl);
		jQuery.ajax({//get the total cost
			url:totalUrl,
			error:function(){
				jQuery.sap.require("sap.m.MessageToast");
				 sap.m.MessageToast.show("Some error occurred when querying, please check the network and try again");
			},
			success:function(data){
				console.log("data d length "+data.d.results.length );
				if(data.d.results.length>0){
					var total = data.d.results[0].TRIP_TOTAL;
					console.log("TOTAL "+total);
					model.data.TOTAL = total;
					bus.publish("total","refresh",{
						value:total
					})
				}else{
					bus.publish("total","refresh",{
						value:0
					})
				}

				jQuery.ajax({
					url:"http://ld9415.wdf.sap.corp:8002/mouse/project/odata/Test.xsodata/TRIP_DEST?$select=LANDTEXT,ONE&$filter=MANDT%20eq%20'002'&$format=json",
					error:function(error){
						//jQuery.sap.require("sap.m.MessageToast");
						 //sap.m.MessageToast.show(error+"");
						util.tools._F_Toast(error+"");
					},
					success:function(data){
						bus.publish("refreshButton","stop",{
							text:'loaded'
						});
						util.tools._F_Toast("success loaded data");
						model.data._TEST_DATA.label = "{LANDTEXT}";
						model.data._TEST_DATA.content = data.d.results;
						model.data._TEST_DATA.measure = "{ONE}";
						bus.publish("pieChart","refresh",model.data._TEST_DATA);

					}
				});
			}
		});
		
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf demo.MainPage
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf demo.MainPage
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf demo.MainPage
*/
	onExit: function() {
		//util.tools._F_Toast("exit");
//		console.log("user exited");
//		Cookie.write("tableData",model.data);
	}

});