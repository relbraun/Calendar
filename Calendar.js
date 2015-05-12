jQuery(function($){
	
	var Calendar = {
		days : new Days()
	};
	
	var Days = function(){
		this.length = 0;
		this.splice = function(){};
		this.append = function(item){
			if(item instanceof Day){
				Array.prototype.push.apply(this, arguments);
			}
		};
	};
	
	var date_prototype = {
		addEvent : function(ev){
			this.events.append(ev);	
		}
	}
	var Day = function(time){
		this.date = new Date(time);
	}
	
	var MEvent = function(args){
	
	}
});