<!DOCTYPE html>
<?php
	 $age = $_POST["age"];
	 $gender = $_POST["gender"];
?>
<head>
	 <title>MTurk Experiment</title>
	 <meta charset="utf-8">
	 <link rel="stylesheet" href="css/style.css">
	 <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
</head>
<body>
	 <div id="mainContent" class="content">
			Age: <?php echo htmlspecialchars($age) ?>
			Gender: <?php echo htmlspecialchars($gender) ?>
	 </div>
	 <script>
	 </script>
</body>
</html>
