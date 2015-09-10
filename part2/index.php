<!DOCTYPE html> <head>
	 <title>MTurk Experiment</title>
	 <meta charset="utf-8">
	 <link rel="stylesheet" href="css/style.css">
	 <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
	 <script src="//code.jquery.com/ui/1.11.3/jquery-ui.js"></script>
</head>
<body>
	 <div id="mainContent" class="content">
			<h1> Welcome to our experiment</h1>
			<p>
			During this experiment you will be presented with a number of Spot-the-Difference puzzle games.
			The puzzle games will be presented to you in three blocks.
			Each block lasts about 15 minutes.
			An alert will be presented after completion of a block, 
			at which you can take a small break.
			We would like to urge you to complete the puzzles 
			<b>in as few steps as possible</b>.
			</p>
			<p>
			Prior to the actual experiment, you will be presented two introductory puzzles.
			The total experiment will take about 1 hour.

			<h3>Spot the Difference</h3>

			<h3>Payment</h3>
			Completing the experiment will result in a payment of $2.50 + bonuses.
			A bonus of $0.10 is <b>earned</b> for each puzzle solved in fewer than 30 steps.
			For each game solved in more than 38 steps, $0.10 is <b>subtracted</b>
			from your bonus. You can earn a maximum bonus of $4.00, 
			resulting in a <b>maximum payment of $6.50</b>.
			<br>
			<br>
			<h4>IMPORTANT: Only completed experiments will receive payment.</h4>
			<br>
			<h4>IMPORTANT: You can only participate in this experiment ONCE. Worker id's will be checked with previous HIT's.<h4>

			<h3>After completion</h3>
			As stated in the HIT, after completion of this experiment a unique code is generated,
			which has to be filled in on the HIT-page.
			After submitting your code,
			your experimental data will be evaluated,
			and we will process your payment.
			This is usually done within 5 working days.
			<br>
<?php 
//$fi = new FilesystemIterator('../results', FilesystemIterator::SKIP_DOTS);
// Directory
 $directory = "../output";
//
// // Returns array of files
 $files = scandir($directory);
//
// // Count number of files and store them to variable..
 $num_files = count($files)-2;

echo "There were " . $num_files . " files in the dir";
?> 
			<br>
			<br>
			<form id="form" method="post" action="intro.php" class="form">
				 <input type="hidden" id="diffOrder" name="diffOrder" value="<?php echo $_GET['order'] ?>">
				 <button type="submit" form="form" value="Submit">Take me to the experiment</button>
			</div>
			<br>
			<br>
			<br>
	 </form>
</body></html>
