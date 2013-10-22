sap.ui.jsview("ui.index", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf demo.Demo
	*/ 
	getControllerName : function() {
		return "ui.index";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf demo.Demo
	*/ 
	createContent : function(oController) {
		
		var tile1 = new sap.m.StandardTile("tile" , {
            info : "Test1",
            infoUnit : "EUR",
            title : "Who is Where " ,
            infoState : "Success",
            press:function() {
				app.to("idDemo2");
				}
        });
		
		var tile2 =   new sap.m.StandardTile("tile2",{
    	    info : "Test2",
            infoUnit : "EUR",
            title : "How Cost " ,
            infoState : "Error",
            press:function() {
				app.to("idDemo3");
				}
        });
		
		var tc = new sap.m.TileContainer({});
		
		tc.addTile(tile1);
		tc.addTile(tile2);
		
		return new sap.m.Page({
			title: "Travel Analysis",
		    showNavButton: false,
			content: [ tc],
			enableScrolling: false
		});
	}

});