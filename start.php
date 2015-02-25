<!DOCTYPE html>
<head>
	 <title>MTurk Experiment</title>
	 <meta charset="utf-8">
	 <link rel="stylesheet" href="css/style.css">
	 <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
</head>
<body>
	 <div id="mainContent" class="content">
			<form id="form" method="post" action="experiment.php" class="form">
				 <h1>What's your age?</h1>
				 <input type="text" name="age" id="inputAge" size="3">
				 <h1>What's your gender?</h1>
				 <select name="gender">
						<option value="m" selected>Male</option>
						<option value="f">Female</option>
				 </select>
				 <input type="submit"value="Next">
			</form>
	 </div>
	 <script>
			$(document).ready(function() {
						// Check the age requirement
						$('#form').submit(function(){
									var age = $('#inputAge').val();
									if (age < 9 || age > 99) 
												$('#form').attr('action',"too_young.php");
									
						});
			});				 
	 </script>
</body>
</html>
