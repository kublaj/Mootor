(function($) {

    var view_name = "ui_checkbox",
    
        nav = $("#main").nav(),
        app = $("main").app(),
        view = {},
        navCurrent = nav.get(view_name);

    if( app.settings.debug === true ) {
        console.log("Load " + view_name + ".js");
    }
    
    view = {
       
        init: function() {
            
            // >> Put view init code here <<

            // Initialize navigation items
            navCurrent.initNavigation();

            // Set onLoad callbacks
            navCurrent.onLoad = view.onLoad;
            if(app.views[nav.current].id === view_name) {
                view.onLoad();               
            }
            
        },
        
        onLoad: function() {
            // Set header title
            nav.header.setTitle('UI Checkbox');                        
        },        

            
    }
    
    // Initialize view

    view.init();
    
    $("#ui_checkbox_Fieldset").ui({
        type: "Checkbox"
    });
       
        
}(Mootor));