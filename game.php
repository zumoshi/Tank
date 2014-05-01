<!DOCTYPE html>
<html>
	<head>
		<script src="./jq.js"></script>
		<script src="./easel.js"></script>
		<script src="./game.js"></script>
		<style>
			.tank{
				transition: -webkit-transform 0.5s,top 0.1s,left 0.1s;
				transition: -moz-transform 0.5s,top 0.1s,left 0.1s;
			}
		</style>
	</head>
	<body>
		<div id="wrapper" style="width: 1000px;height: 700px;margin:0 auto;position: relative;">
			<canvas id="game" width="1000" height="700"></canvas>
		</div>
	</body>
</html>