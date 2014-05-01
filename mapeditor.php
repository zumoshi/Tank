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
			#game{cursor:pointer;}
		</style>
		<script>
		var mode=1
		function mission(){
			var down=false
			$('#game')
				.mousedown(function(){down=true})
				.mouseup(function(e){down=false;paint(~~(e.offsetX / 10), ~~ ( e.offsetY / 10))})
				.mousemove(function(e){
					if(!down)return
					//console.log([e.offsetX,e.offsetY])
					paint(~~(e.offsetX/10),~~(e.offsetY/10))
				})
			function paint(x,y){
				console.log([x,y,b.tile[y][x],mode])
				if(b.tile[y][x]==mode)return
				b.tile[y][x]=mode
				b.drawmap()
				b.stage.update()
			}
		})
		function givemap(){
			var map='',tile=b.tile
			for(var j=0;j<tile.length;j++){
				for(var i=0;i<tile[0].length;i++){
					map+=tile[j][i]
				}
				map+="\n"
			}
			$('#cpmap').val(map)
			$('#cpmap').show()
		}
		</script>
	</head>
	<body>
		<div id="wrapper" style="width: 1000px;margin:0 auto;position: relative;">
			<canvas id="game" width="1000" height="700"></canvas>
			<div id="info">
				<input type="button" value="1" onclick="mode=1" />
				<input type="button" value="2" onclick="mode=2" />
				<input type="button" value="3" onclick="mode=3" />
				<input type="button" value="4" onclick="mode=4" />
				<input type="button" value="5" onclick="mode=5" />
				<input type="button" value="6" onclick="mode=6" />
				<input type="button" value="7" onclick="mode=7" />
				<input type="button" value="8" onclick="mode=8" />
				<input type="button" value="9" onclick="mode=9" />
				<input type="button" value="Done!" onclick="givemap()" />
			</div>
		</div>
		<textarea id="cpmap" style="display:none;"></textarea>
	</body>
</html>