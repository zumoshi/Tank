<!DOCTYPE html>
<html>
	<head>
		<script src="./jq.js"></script>
		<script src="./easel.js"></script>
		<script src="./filesave.js"></script>
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
		var mode=1,ghalam=1,ctrl_z=[]
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
				
				ctrl_z.push(JSON.parse(JSON.stringify(b.tile)))
				if(ghalam==1){b.tile[y][x]=mode}
					else{
						for(var i = -~~(ghalam/2);i<~~(ghalam/2);i++){
							for(var j = -~~(ghalam/2);j<~~(ghalam/2);j++){
								b.tile[y+i][x+j]=mode
							}
						}
					}
				
				b.drawmap()
				b.stage.update()
			}
		}
		function givemap(){
			var map='',tile=b.tile
			for(var j=0;j<tile.length;j++){
				for(var i=0;i<tile[0].length;i++){
					map+=tile[j][i]
				}
				map+="\n"
			}
			return map
			$('#cpmap').val(map)
			$('#cpmap').show()
		}
		function givemap_f(){
			var blob = new Blob([givemap()], {type: "text/plain;charset=utf-8"});
			saveAs(blob, "shahkar.map");
		}
		</script>
	</head>
	<body>
		<div id="wrapper" style="width: 1000px;margin:0 auto;position: relative;">
			<canvas id="game" width="1000" height="700"></canvas>
			<div id="info">
				<input type="button" style="width:10px;height:17px;background:url(./tile/1.png)" onclick="mode=1" />
				<input type="button" style="width:10px;height:17px;background:url(./tile/2.png)" onclick="mode=2" />
				<input type="button" style="width:10px;height:17px;background:url(./tile/3.png)" onclick="mode=3" />
				<input type="button" style="width:10px;height:17px;background:url(./tile/4.png)" onclick="mode=4" />
				<input type="button" style="width:10px;height:17px;background:url(./tile/5.png)" onclick="mode=5" />
				<input type="button" style="width:10px;height:17px;background:url(./tile/6.png)" onclick="mode=6" />
				<input type="button" style="width:10px;height:17px;background:url(./tile/7.png)" onclick="mode=7" />
				<input type="button" style="width:10px;height:17px;background:url(./tile/8.png)" onclick="mode=8" />
				<input type="button" style="width:10px;height:17px;background:url(./tile/9.png)" onclick="mode=9" />
				<input type="button" value="Done!" onclick="givemap()" />
				<input type="button" value="Download!" onclick="givemap_f()" />
				Size:<input type="range" min="1" max="51" value="1" step="2" onchange="ghalam=this.value" />
				<input type="button" value="Ctrl_z" onclick="if(ctrl_z.length)b.tile=ctrl_z.pop();b.drawmap();b.stage.update();" />
			</div>
		</div>
		<textarea id="cpmap" style="display:none;"></textarea>
	</body>
</html>