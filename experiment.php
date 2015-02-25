<!DOCTYPE html>
<head>
	 <title>MTurk Experiment</title>
	 <meta charset="utf-8">
	 <link rel="stylesheet" href="css/style.css">
	 <link rel="stylesheet" href="css/memory.css">
	 <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
	 <script src="js/experiment.js"> 
</script> 
</head>
<body>

	 <div style="display: none;" id="user_age">		<?php echo htmlspecialchars($_POST["age"]); ?></div>
	 <div style="display: none;" id="user_gender"><?php echo htmlspecialchars($_POST["gender"]); ?></div>
	 <div id="memory_board"></div> 
</body> 
</html>
