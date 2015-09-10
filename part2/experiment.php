<!DOCTYPE html>
<head>
	 <title>MTurk Experiment</title>
	 <meta charset="utf-8">
	 <link rel="stylesheet" href="css/style.css">
	 <link rel="stylesheet" href="css/memory.css">
	 <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
	 <script src="js/experiment.js"></script> 
</head>
<body>

	 <div style="display: none;" id="user_age">		<?php echo htmlspecialchars($_POST["age"]); ?></div>
	 <div style="display: none;" id="user_gender"><?php echo htmlspecialchars($_POST["gender"]); ?></div>
	 <div style="display: none;" id="mturkID"><?php echo htmlspecialchars($_POST["mturkID"]); ?></div>
	 <div style="display: none;" id="diffOrder"><?php echo htmlspecialchars($_POST["diffOrder"]); ?></div>
<?php
// create a temp file for this user
 $my_file = 'output/' . htmlspecialchars($_POST["mturkID"]) . '.tmp';
 if (!file_exists($my_file)) {
 $handle = fopen($my_file, 'w') or die('Cannot open file:  '.$my_file); //implicitly creates file
 }
 else {
	 echo "File already exists";
 }

?>
	 <div id="mainContent" class="content" style="margin: 0 auto;">
	 <h4 id="blockProgress"></h4>
</div>
	 <div id="memory_board"></div> 

	 <form id="form" action="thanks.php" method="post">
			<input type="hidden" id="hashForm" name="hash" value="">
	 </form>
</body> 
</html>
