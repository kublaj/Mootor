/**
* The UIHeader class is a navigational element at the top of the page (header)
*
* @class UIHeader
* @extends UI
* @module UI
* @constructor
* @author Emilio Mariscal (emi420 [at] gmail.com)
* @author Martín Szyszlican (martinsz [at] gmail.com)
*/

(function ($, Mootor) {

    "use strict";

    var UIHeader,
    
        UINavBar,
        UIView,
        View,
        UIApp,
        UINavItem,
        App,
        UI,
        headerContainerEl;

    // Dependences

    View = Mootor.View;
    UINavBar = Mootor.UINavBar;
    UIView = Mootor.UIView;
    UIApp = Mootor.UIApp;
    UINavItem = Mootor.UINavItem;
    App = Mootor.App;
    UI = Mootor.UI;
        
    // Private constructors

    UIHeader = Mootor.UIHeader = function(options) {
        this.nav = new UINavBar({
            container: options.el,
            type: options.type
        });
        this.type = options.type;
        this.el = this.nav.el;
        this.$el = $(this.el);
        if (this.$el.find("nav").length < 1) {
            this.el.appendChild(document.createElement("nav"));
        }
        UIHeader._initBackButton(this);
    };

    // Event handlers
    UIApp.on("init", function(self) {
        UINavBar.createBar("header",self, UIHeader);
    });

    
    // Private static methods and properties

    $.extend(UIHeader, {
        
        _initBackButton: function(self) {
            var backEl = document.createElement("a"),
                backIconEl = document.createElement("icon"),
                backNavEl = document.createElement("nav");
                
                // FIXME CHECK (white?)
                backIconEl.setAttribute("class", "m-icon-arrow-left-white");
                
            backEl.appendChild(backIconEl);
            backNavEl.appendChild(backEl);
            backNavEl.setAttribute("class", "m-nav-header-back-container");

            if (self.el.firstChild !== undefined) {
               self.el.insertBefore(backNavEl,self.el.firstChild) 
            } else {
               self.el.appendChild(backNavEl)
               pa.appendChild(who);
            }
            
            self.back = new UINavItem({
                el: backEl
            });
            self.back.$el.addClass("m-header-back");
            self.back.hide();
            
            self.back.$el.on("tap click", function(e) {
                m.app.back();
            });
            self.back.el.onclick = function(e) {
                return false;
            };
            App.on("go", function(app) {
                if (app.history.length > 1) {
                    self.back.show();
                } else {
                    self.back.hide();
                }
            });            
        }
        
    });

    // Public methods

    $.extend(UIHeader.prototype, {
        
        /**
        * Back
        * The back button
        *
        * @object back
        * @return {UINavItem} 
        * @example
        *     m.app.view("index").ui.header.back.hide();
        */
        back: {},
        
        /**
        * Title
        * The text to display in the header
        * If called with no arguments returns the current title
        *
        * @method title
        * @param {string} [title] The text for the title
        * @return {String} 
        * @chainable
        * @example
        *     m.app.view("index").ui.header.title("My title");
        */
        title: function(title) {
            var titleEl = this.el.getElementsByTagName("h1")[0];
            if (title !== undefined) {
                titleEl.innerHTML = title;
            } else {
                return titleEl.innerHTML;
            }
            return this;
        }
        
    });  
          
    // Prototypal inheritance

    $.extend(UIHeader.prototype, UINavBar.prototype);
    $.extend(UIHeader.prototype, UI.prototype);

}(window.$, window.Mootor));
