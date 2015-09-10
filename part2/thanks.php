<!DOCTYPE html>
<head>
	 <title>MTurk Experiment</title>
	 <meta charset="utf-8">
	 <link rel="stylesheet" href="css/style.css">
</head>
<body>
	 <div class="content">
			<h1>Thanks for participating</h1>
			<h2>Please paste the following code in the Amazon Mechanical Turk referral page that led you to this experiment:</h2>
			<h4><?php echo htmlspecialchars($_POST['hash']) ?></h4>
	 </div>
</body>
</html>
