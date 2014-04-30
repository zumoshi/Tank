var tank;
$(document).ready(function(){
$.get('./map.txt',function(map){
	var tile=Array();
	//var _tile = Array();
	//for(var i =1;i<7;i++)_tile[i]=(new createjs.Bitmap('./tile/'+i+'.png'));
	tank = new createjs.Bitmap('./tank.png');

	var redraw=true;
	function loop(){
    	if(redraw)stage.update();
		
		redraw=false
		requestAnimationFrame(loop)
	}
	
    stage = new createjs.Stage("game");
    
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
    
    tank.x=90*10
    tank.y=2*10
    tank.regX = 20;
	tank.regY = 20;
    stage.addChild(tank)
    
    setTimeout(function(){redraw=true},250)
    setTimeout(function(){redraw=true},500)
    setTimeout(function(){redraw=true},750)
    setInterval(function(){redraw=true},1000)
    
    //tank move:
    $( window ).keypress(function( event ) {
    	//console.log(event)
    	var key =String.fromCharCode(event.charCode)
    	var rot={w:0,a:270,s:180,d:90}
    	if(typeof rot[key] === "undefined")return;
    	tank.rotation=rot[key]
    	if(!ejaze(tank.x/10,tank.y/10,key))return;
    	var move_x={a:-10,d:+10},move_y={w:-10,s:+10}
    	if(typeof move_x[key] !== "undefined")tank.x+=move_x[key]
    	if(typeof move_y[key] !== "undefined")tank.y+=move_y[key]
    	redraw=true;
    })
    
    function ejaze(x,y,j){
    	x-=2;y-=2;
    	//console.log([x,y,j])
    	var h={
    		a:function(){return [tile[y][x-1],tile[y+1][x-1],tile[y+2][x-1],tile[y+3][x-1]]},
    		s:function(){return [tile[y+4][x],tile[y+4][x+1],tile[y+4][x+2],tile[y+4][x+3]]},
    		w:function(){return [tile[y-1][x],tile[y-1][x+1],tile[y-1][x+2],tile[y-1][x+3]]},
    		d:function(){return [tile[y][x+4],tile[y+1][x+4],tile[y+2][x+4],tile[y+3][x+4]]}
    	}
    	//console.log(h[j]())
    	if(typeof h[j] !== "undefined" && h[j]().indexOf(2)!=-1)return false;
    	//console.log(h[j]().indexOf(2))
    	return true;
    }
    function mamnoo(t){return t==2;}
    
    loop()
})})

function pngtile(i,x,y){
	var tmp = new createjs.Bitmap('./tile/'+i+'.png')
	tmp.x=x*10
	tmp.y=y*10
	return tmp
}
