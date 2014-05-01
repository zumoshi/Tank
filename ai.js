var ai={
	one:function(tank,f,tanks,tile){
		var dir=true;
		
		setInterval(function(){
			var can_shoot=false,shoot_dir=false;
			for(var i = 0;i<tanks.length;i++){
				if(tanks[i]!=tank.loc	//khodam nabasham 
					&& tanks[i].x==tank.loc.x){
						can_shoot=true;
						shoot_dir=tanks[i].y>tank.loc.y
					}
			}
			if(can_shoot){
				f.move(tank,(shoot_dir)?'s':'w')
				f.shoot(tank)
			}else if(dir){
				if(tank.loc.x+5<tile[0].length)
					{f.move(tank,'d')}
				else
					{dir=false;}
			}else{
				if(tank.loc.x>0)
					{f.move(tank,'a')}
				else
					{dir=true;}
			}
		},100)
	}
}
