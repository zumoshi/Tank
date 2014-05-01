var tank={};
$(document).ready(function(){
$.get('./map.txt',function(map){
	var tile=Array(), png={};
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
    
    map = "\n"+map;
    var i=0,x=0,y=-1;
    while(map[i]){
    	if(map[i]=="\n"){
    		y++;
    		x=0;
    		tile[y]=Array();
    	}else{
    		tile[y][x]=parseInt(map[i])
    		x++
    	}
    	i++;
    }
    for(y=0;y<tile.length;y++){
    	for(x=0;x<tile[0].length;x++){
    		stage.addChild(pngtile(tile[y][x],x,y))
    	}
    }
    
    tank=b.tank('./tank.png',90,2)
    
    //tank move:
    var key_interval;
    $( window ).keydown(function( event ) {
    	if([37,38,39,40].indexOf(event.keyCode)==-1)return
    	tank_move({charCode:JSON.parse('{"37":"a","38":"w","39":"d","40":"s"}')[event.keyCode].charCodeAt(0)})
    })
    $( window ).keypress(tank_move)
    
    function tank_move( event ) {
    	//console.log(event)
    	var key =String.fromCharCode(event.charCode)
    	var rot={w:0,a:270,s:180,d:90}
    	if(typeof rot[key] === "undefined")return;
    	tank.rotation=rot[key]
    	if(ejaze(tank.x/10,tank.y/10,key)){
    		var move_x={a:-10,d:+10},move_y={w:-10,s:+10}
    		if(typeof move_x[key] !== "undefined")tank.x+=move_x[key]
    		if(typeof move_y[key] !== "undefined")tank.y+=move_y[key]
    	}
    	tank.update()
    }
    
    function ejaze(x,y,j){
    	//console.log([x,y,j])
    	var h={
    		a:function(){return !(x>0) || mamnoo([tile[y][x-1],tile[y+1][x-1],tile[y+2][x-1],tile[y+3][x-1]])},
    		s:function(){return (y+5 > tile.length) || mamnoo([tile[y+4][x],tile[y+4][x+1],tile[y+4][x+2],tile[y+4][x+3]])},
    		w:function(){return !(y>0) || mamnoo([tile[y-1][x],tile[y-1][x+1],tile[y-1][x+2],tile[y-1][x+3]])},
    		d:function(){return (x+5 > b.tile[0].length) || mamnoo([tile[y][x+4],tile[y+1][x+4],tile[y+2][x+4],tile[y+3][x+4]])}
    	}
    	//console.log(h[j]())
    	if(typeof h[j] !== "undefined" && h[j]())return false;
    	//console.log(h[j]().indexOf(2))
    	return true;
    }
    function mamnoo(a){return a.indexOf(2)!=-1}
    
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
	b.tile=tile
})})

var b={
	tank:function(png,x,y){
		var tmp={}
		tmp.x=x*10
    	tmp.y=y*10
    	tmp.rotation=0
    	tmp.obj=$('<img>')
    		.attr('src',png)
    		.addClass('tank')
    		.appendTo('#wrapper')
    	tmp.update=function(){tmp.obj.css({
    		top:tmp.y+'px',
    		left:tmp.x+'px',
    		'transform':'rotate('+tmp.rotation+'deg)',
    		'-webkit-transform':'rotate('+tmp.rotation+'deg)',
    		'-moz-transform':'rotate('+tmp.rotation+'deg)',
    		position:'absolute'
    	})}
    	tmp.update()
    	return tmp;
	}
}
