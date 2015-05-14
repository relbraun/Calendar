jQuery(function($){
	
	var CDate = function(){};
		CDate.fromDate = function(date){
			var d = new CDate;
			if(!(date instanceof Date)){
				date = new Date(date);
			}
			d.day = date.getDate();
			d.month = date.getMonth();
			d.year = date.getFullYear();
			return d;
		}
	
	
	var Days = function(){
		this.length = 0;
		this.splice = function(){
			return Array.prototype.splice(this, arguments);
		};
		this.append = function(item){
			if(item instanceof Day){
				Array.prototype.push.apply(this, arguments);
			}
		};
		this.get = function(time){
			d = CDate.fromDate(time);
			if(d instanceof CDate){
				$.each(this, function(i,e){
				var	ed = e.date;
				if(ed.day == d.day && ed.month == d.month && ed.year == d.year){
					return {day: e, i:i}
				}
			});
			}
			
			return false;
		}
		
		this.remove = function(id){
			var day = this.get(id);
			if(day){
				return this.splice(day.i, 1)[0];
			}
		}
	};
	
	var date_prototype = {
		getEvent : function(id){
			$.each(this.events, function(i,e){
				if(this.id == id){
					return {event: e, i:i};
				}
			});
			return false;
		},
		addEvent : function(ev){
			this.events.append(ev);
			this.onEventAdded(ev);
		},
		
		onEventAdded : function(event){},
		
		removeEvent : function(id){
			var e = this.getEvent(id);
			if(e){
				delete this[e.i];
			}
		}
	};
	var Day = function(time){
		this.date = CDate.fromDate(new Date(time));
		this.events = new Events();
	}
	
	Day.prototype = date_prototype;
	
	var MEvent = function(args){
		
		var _default = {
			id: ''
		};
		this.settings = $.extend({},_default,args);
	}
	
	var Events = function(){
		this.length = 0;
		this.splice = function(){
			return Array.prototype.splice(this, arguments);
		};
		
		this.append = function(item){
			if(item instanceof MEvent){
				Array.prototype.push.apply(this, arguments);
			}
		};
		
		this.get = function(id){
			$.each(this, function(i,e){
				if(e == id){
					return {event: e, i:i}
				}
			});
			return false;
		}
		
		this.remove = function(id){
			var event = this.get(id);
			if(event){
				return this.splice(event.i, 1)[0];
			}
		}
	}
	
	var Calendar = {
		days : new Days(),
		createDay : function(time){
			return new Day(time);
		}
	};
	
	
	window.calendar = Calendar;
});