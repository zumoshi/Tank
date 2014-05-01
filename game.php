<!DOCTYPE html>
<html>
	<head>
		<script src="./jq.js"></script>
		<script src="./easel.js"></script>
		<script src="./game.js"></script>
		<script src="./ai.js"></script>
		<style>
			.tank{
				transition: -webkit-transform 0.5s,top 0.1s,left 0.1s;
				transition: -moz-transform 0.5s,top 0.1s,left 0.1s;
			}
			.gloole{
				transition: top 0.05s,left 0.05s;
				width: 5px;height:5px;
				background:red;
			}
		</style>
		<script>
			tank=b.tank('./tank.png',90,2)
		    tanks.push(tank.loc)
		    
		    var enemy=b.tank('./tank_r.png',20,65)
		    tanks.push(enemy.loc)
		    ai.one(enemy,{move:tank_move,shoot:shelik},tanks,tile)
		</script>
	</head>
	<body>
		<div id="wrapper" style="width: 1000px;height: 700px;margin:0 auto;position: relative;">
			<canvas id="game" width="1000" height="700"></canvas>
		</div>
		<div id="info">Joon = 10 , Joon enemy = 10</div>
	</body>
</html>