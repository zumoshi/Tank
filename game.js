var tank={};
$(document).ready(function(){
$.get('./map.txt',function(map){
	b.tile=Array()
	var png={}, tanks=[];
	//var _tile = Array();
	//for(var i =1;i<7;i++)_tile[i]=(new createjs.Bitmap('./tile/'+i+'.png'));
	//tank = new createjs.Bitmap('./tank.png');

	/*var redraw=true;
	function loop(){
    	if(redraw)stage.update();
		
		redraw=false
		requestAnimationFrame(loop)
	}*/
	
    var stage = new createjs.Stage("game");
    
    function loadmap(map){
	    b.tile=[]
	    map = "\n"+map;
	    var i=0,x=0,y=-1;
	    while(map[i]){
	    	if(map[i]=="\n"){
	    		y++;
	    		x=0;
	    		b.tile[y]=Array();
	    	}else{
	    		b.tile[y][x]=parseInt(map[i])
	    		x++
	    	}
	    	i++;
    }
    }
    function drawmap(){
    	stage.removeAllChildren()
	    for(y=0;y<b.tile.length;y++){
	    	for(x=0;x<b.tile[0].length;x++){
	    		stage.addChild(pngtile(b.tile[y][x],x,y))
	    	}
	    }
    }
    loadmap(map)
    drawmap()
    
    //tank move:
    var key_interval;
    $( window ).keydown(function( event ) {
    	if([37,38,39,40].indexOf(event.keyCode)==-1)return
    	tank_move(tank,JSON.parse('{"37":"a","38":"w","39":"d","40":"s"}')[event.keyCode])
    })
    $( window ).keypress(function(e){tank_move(tank,String.fromCharCode(e.charCode))})
    
    function tank_move( tank,key ) {
    	//console.log(event)
    	var rot={w:0,a:270,s:180,d:90}
    	if(typeof rot[key] !== "undefined"){
    		tank.rotation=rot[key]
	    	if(ejaze(tank.loc.x,tank.loc.y,key)){
	    		var move_x={a:-1,d:+1},move_y={w:-1,s:+1}
	    		if(typeof move_x[key] !== "undefined")tank.loc.x+=move_x[key]
	    		if(typeof move_y[key] !== "undefined")tank.loc.y+=move_y[key]
	    	}
	    	tank.update()
    	}else if(key==' '){
    		shelik(tank);
    	}
    }
    function shelik(tank){
    	b.gloole(tank.loc.x+2,tank.loc.y+2,JSON.parse('{"0":"w","270":"a","180":"s","90":"d"}')[tank.rotation])
    }
    
    function ejaze(x,y,j){
    	//console.log([x,y,j])
    	var h={
    		a:function(){return !(x>0) || mamnoo([b.tile[y][x-1],b.tile[y+1][x-1],b.tile[y+2][x-1],b.tile[y+3][x-1]])},
    		s:function(){return (y+5 > b.tile.length) || mamnoo([b.tile[y+4][x],b.tile[y+4][x+1],b.tile[y+4][x+2],b.tile[y+4][x+3]])},
    		w:function(){return !(y>0) || mamnoo([b.tile[y-1][x],b.tile[y-1][x+1],b.tile[y-1][x+2],b.tile[y-1][x+3]])},
    		d:function(){return (x+5 > b.tile[0].length) || mamnoo([b.tile[y][x+4],b.tile[y+1][x+4],b.tile[y+2][x+4],b.tile[y+3][x+4]])}
    	}
    	//console.log(h[j]())
    	if(typeof h[j] !== "undefined" && h[j]())return false;
    	//console.log(h[j]().indexOf(2))
    	return true;
    }
    function mamnoo(a){return a.indexOf(2)!=-1}
    
    function hit(tankloc){
    	if(tankloc==tank.loc)tank.joon--
    	if(tankloc==enemy.loc)enemy.joon--
    	
    	$('#info').text('Joon = '+tank.joon+' , Joon enemy = '+enemy.joon)
    	
    	if(tank.joon==0)$('body').html('<h1>You Lost!</h1>')
    	if(enemy.joon==0)$('body').html('<h1>You Won!</h1>')
    	if(enemy.joon==0 || tank.joon==0){
    		$('body').append('<p>Press f5 to play again')
    	}
    }
    
    function pngtile(i,x,y){
		if(typeof png[i]==="undefined"){
			png[i] = new Image()
			png[i].src='./tile/'+i+'.png'
			png[i].onload=function(){stage.update()}
		}
		var tmp = new createjs.Bitmap(png[i])
		tmp.x=x*10
		tmp.y=y*10
		return tmp
	}
	
	//exporting variables:
	b.stage=stage
	b.tanks=tanks
	//expose functions:
	b.hit=hit
	b.drawmap=drawmap
	b.loadmap=loadmap
	b.pngtile=pngtile
	b.aiapi={move:tank_move,shoot:shelik}
	//init:
	mission()
})})

var b={
	tank:function(png,x,y){
		var tmp={}
		tmp.loc={}
		tmp.loc.x=x
    	tmp.loc.y=y
    	tmp.rotation=0
    	tmp.joon=10
    	tmp.obj=$('<img>')
    		.attr('src',png)
    		.addClass('tank')
    		.appendTo('#wrapper')
    	tmp.update=function(){tmp.obj.css({
    		top:tmp.loc.y*10+'px',
    		left:tmp.loc.x*10+'px',
    		'transform':'rotate('+tmp.rotation+'deg)',
    		'-webkit-transform':'rotate('+tmp.rotation+'deg)',
    		'-moz-transform':'rotate('+tmp.rotation+'deg)',
    		position:'absolute'
    	})}
    	tmp.update()
    	return tmp;
	},
	gloole:function(x,y,dir){
		var tmp={}
		tmp.x=x
    	tmp.y=y
    	tmp.obj=$('<div>')
    		.addClass('gloole')
    		.appendTo('#wrapper')
    	tmp.update=function(){tmp.obj.css({
    		top:tmp.y*10+'px',
    		left:tmp.x*10+'px',
    		position:'absolute'
    	})}
    	tmp.fuse=0;
    	tmp.update()
    	tmp.tmr=setInterval(function(){
    		var move_x={a:-1,d:+1},move_y={w:-1,s:+1}
    		if(typeof move_x[dir] !== "undefined")tmp.x+=move_x[dir]
    		if(typeof move_y[dir] !== "undefined")tmp.y+=move_y[dir]
    		tmp.update()
    		
    		//barkhord b tank
    		if(tmp.fuse>4)
    			for(var i=0;i<b.tanks.length;i++){
    				if(Math.abs((b.tanks[i].x+2)-tmp.x)<2
    					&& Math.abs((b.tanks[i].y+2)-tmp.y)<2){
    						b.boom(tmp.x,tmp.y)
    						b.hit(b.tanks[i])
    						tmp.x=-1;
    						tmp.y=-1;
    					}
    			}
    		
    		//khuruj az safe
    		if(tmp.x < 0 || tmp.x > b.tile[0].length
    			|| tmp.y<0 || tmp.y > b.tile.length){
    				//console.log([tmp.x,tmp.y])
    				clearInterval(tmp.tmr)
    				tmp.obj.remove()
    				tmp=null
    				return;
    			}
    		tmp.fuse++;
    	},50)
    	return tmp;
	},
	boom:function(x,y){
		var tmp={}
		tmp.loc={}
		tmp.loc.x=x-2
    	tmp.loc.y=y-2
    	tmp.obj=$('<div>')
    		.css({
    			position:'absolute',
    			top:tmp.loc.y*10+'px',
	    		left:tmp.loc.x*10+'px',
	    		width:'40px',
	    		height:'40px',
	    		background:'url(./res/boom.png)'
    		})
    		.appendTo('#wrapper')
    	tmp.i=0
    	tmp.a=[
    		[0,0],[40,0],[80,0],[120,0],
    		[0,40],[40,40],[80,40],[120,40],
    		[0,80],[40,80],[80,80],[120,80],
    		[0,120],[40,120],[80,120],[120,120]
    	]
    	tmp.tmr=setInterval(function(){
    		tmp.obj.css({
    			'background-position-x': '-'+tmp.a[tmp.i][0]+'px',
				'background-position-y': '-'+tmp.a[tmp.i][1]+'px'
    		})
    		tmp.i++;
    		if(tmp.i==tmp.a.length){
    			clearInterval(tmp.tmr)
    			tmp.obj.remove()
    			tmp=null
    		}
    	},75)
    	return tmp;
	}
}

b.boom.png= new Image()
b.boom.png.src='./res/boom.png'