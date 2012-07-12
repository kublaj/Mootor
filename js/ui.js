/**
 * @summary User Interface Mootor plugin
 */
 
/** 
 * @class
 * @name $ 
 */
 
(function ($) {

 "use strict";
 
    var Overlay = function() {

    },
    
    Tooltip = function(options) {
        var self = this;
        self.html = options.html;
        self.el = options.el;

        self.div = document.createElement("div");
        $(self.div).hide();
        $(self.div).setClass("moo_tooltip");
        $(self.div).html(this.html);
        
        document.body.appendChild(self.div)

        $(self.el).onTapEnd(function(event) {
            $(self.div).translateFx({
                x: event.e.clientX,
                y: event.e.clientY,
            }, {});
            $(self.div).show();
        })
        return self;
    },

     /**
     * Switch instance object
     *
     * @class
     * @name Switch
     * @return {Object} Switch object
     * @param {Object} options  Configuration options
     * @property {element} el Container element
     */
    Switch = function(options) {
        var check,
            input;
            
        this.el = options.el;
        this.el.innerHTML += "<b></b>";
        input = this.el.getElementsByTagName('input')[0];
        this.input = input;
        $(input).hide();

        check = $(this.el);
        check.setClass("moo-ui-switch");
        check.onTapEnd(this);

        this.toggle(input.value);       

        this.init();        
        return this;
    },
    
    Text = function(options) {
        //%span.cleanbox &times;
        var self = this;
        this.el = options.el;
        this.init();
        this.el.innerHTML += '<span class="cleanbox">&times</span>';
        this.input = this.el.getElementsByTagName("input")[0];
        this.cleanbox = this.el.getElementsByClassName("cleanbox")[0];
        $(this.cleanbox).onTapEnd(function() {
            self.clean();
        })
    },
    
    Select = function(options) {
        this.el = options.el;              
        this.init();        
        // TODO        
    },
    
    Input = function() {
        
    };
    
    // Prototype for all controls
    Input.prototype = {
        init: function() {
            this.stopEventPropagationAndPreventDefault();    
        },
        
        stopEventPropagationAndPreventDefault: function() {
            var callback = function(gesture) {
                gesture.e.stopPropagation();
                gesture.e.preventDefault();
            }
            $(this.el).onDragMove(callback);
            $(this.el).onDragEnd(callback);
            $(this.el).onTapEnd(callback);
        },
        
    }

    Switch.prototype = {
        /**
        * Toggle control
        *
        * @this {Switch}
        * @example var myCheck =  $("#Switch1").Switch();
        * myCheck.toggle();
        */
        toggle: function (value) {
            var el = $(this.el);

            if (value !== undefined) {
                this.value = parseInt(value);
            } else {
                if (this.value === 0) {
                    this.value = 1;
                } else {
                    this.value = 0;
                }                                
            }
            
            if (this.value === 0) {
                el.removeClass("on");
                el.setClass("off");                
            } else {
                el.removeClass("off");
                el.setClass("on");                
            }
            
            this.input.value = this.value;
        }, 
        handleGesture: function (gesture) {
            this.toggle();
        }
    };
    
    Overlay.prototype = {
        show: function() {
            $(this.el).show();
        },
        hide: function() {
            $(this.el).hide();
        },
    };
    
    Tooltip.prototype = {};
    
    Text.prototype = {
        clean: function() {
            this.input.value = "";
        }
    }

    $.extend(Overlay.prototype, Tooltip.prototype);
    $.extend(Input.prototype, Select.prototype);
    $.extend(Input.prototype, Switch.prototype);
    $.extend(Input.prototype, Text.prototype);
    
    $.extend({
    
         ui: function(options) {
             options.el = this.el;
             switch (options.type) {
                 case "Switch":
                    return new Switch(options);
                    break;
                 case "Tooltip":
                    return new Tooltip(options);
                    break;
                 case "Select":
                    return new Select(options);
                    break;
                 case "Text":
                    return new Text(options);
                    break;
             }
         }
    });
    

}($));

