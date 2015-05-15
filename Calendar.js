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
			var a = false;
			if(d instanceof CDate){
				$.each(this, function(i,e){
				var	ed = e.date;
				if(ed.day == d.day && ed.month == d.month && ed.year == d.year){
					a = {day: e, i:i}
				}
			});
			}
			
			return a;
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
			id: '',
			start : {hour: 9, minute:'00'},
			end : {hour: 9, minute:'00'}
		};
		this.settings = $.extend({},_default,args);
	}
	
	MEvent.setHour = function(start, end){
		this.start = start;
		this.end = end;
	}
	
	MEvent.getId = function(){
		if(!this.id){
			//todo: get AJAX function.
		}
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
		
		this.create = function(args){
			if(arguments.length === 1 && typeof args == 'object'){
				var e = new MEvent({args.start, args.end});
			}
			else if(arguments.length === 2 && typeof arguments[0] == 'object' && typeof arguments[1] == 'object'){
				var e = new MEvent({arguments[0], arguments[1]});
			}
			e.getId();
			this.append(e);
			return e;
		}
		
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