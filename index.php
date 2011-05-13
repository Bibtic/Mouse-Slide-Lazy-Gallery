<!DOCTYPE HTML>
<?php
/*<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">*/
?>

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ca" lang="ca">
<head>
	
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
	
	
	<link rel="stylesheet" href="css/style.css" type="text/css"/>
	
	<script type="text/javascript" src="js/jquery-1.5.1.min.js"></script>
	<script type="text/javascript" src="js/slidegallery.js"></script>
	
	<title>Slide Gallery test</title>
	<script type="text/javascript" charset="utf-8">
		$(document).ready(function() {
			$("#galeria_carousel").slidegallery({
				preloadd:90,
				maxSpeed:10,
				imagebuffer:0,
				showlabel:false
			});
			
			$("#galeria_carousel2").slidegallery();
		});
	</script>

</head>

<body>
	<h1>Slidegallery test</h1>

	<div id="galeria_carousel" class="galeria">
		<ul>
			<?php for ($i=1;$i<10;$i++) { 
				$h="609";
				$w="450";
				if ($i==3){
					$h="446";
					$w="330";
				}
				?>
			<li>
				
				<a rel="<?php echo $w.",".$h;?>" href="images/<?php echo $i;?>.jpg" title="Foto de mi carro n <?php echo $i;?>"><?php echo $i;?></a>
				
			</li>
			<?php } ?>
		</ul>
	</div>
	
	<h1>Slidegallery test 2</h1>
	<div id="galeria_carousel2" class="galeria">
		<ul>
			<?php for ($i=9;$i>0;$i--) { 
				$h="609";
				$w="450";
				if ($i==6){
					$h="446";
					$w="330";
				}
				?>
			<li>
				
				<a rel="<?php echo $w.",".$h;?>" href="images/<?php echo $i;?>.jpg" ><?php echo $i;?></a>
				
			</li>
			<?php } ?>
		</ul>
	</div>
</body>
</html>