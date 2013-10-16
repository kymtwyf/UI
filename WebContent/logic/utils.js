jQuery.sap.declare("logic.utils");

logic.utils = {
		_F_Toast:function(message){
			jQuery.sap.require("sap.m.MessageToast");
			 sap.m.MessageToast.show(message);
		}
}