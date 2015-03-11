<!DOCTYPE html>
<head>
	 <title>MTurk Experiment</title>
	 <meta charset="utf-8">
	 <link rel="stylesheet" href="css/style.css">
	 <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
	 <script src="//code.jquery.com/ui/1.11.3/jquery-ui.js"></script>
</head>
<body>
	 <div id="mainContent" class="content">
			<form id="form" method="post" action="too_young.php" class="form">
				 <div id="mTurkID">
						<h1>What's your MTurk Worker ID?</h1>
						<h2>You can find it out at: https://www.mturk.com/mturk/dashboard</h2> 
						<input type="text" name="mturkID" id="mturkID" size="20">
				 </div>
				 <div id="ageSection">
						<h1>What's your age?</h1>
						<input type="text" name="age" id="inputAge" size="3">
				 </div>
				 <div id ="test"><input id="firstSumbit" type="submit" value="Next"></div>
				 <div id="genderSection">
						<h1>What's your gender?</h1>
						<select name="gender">
							 <option value="m" selected>Male</option>
							 <option value="f">Female</option>
						</select>
						<input id="secondSubmit" type="submit"value="Next">
				 </div>
			</form>
	 </div>
	 <script>
			$(document).ready(function() {
				 $('#genderSection').hide();
				 $("#inputAge").keyup(function() {
						var age = $( this ).val();
						console.log(age);
						if (age > 9 && age < 99) {
							 $('#test').hide();
							 $('#genderSection').show("fold", 500);
							 $('#form').attr('action',"experiment.php");
							 } else {
							 $('#test').show();
							 $('#genderSection').hide();
							 $('#form').attr('action',"too_young.php");
						}
				 });
			});		
	 </script>
</body>
</html>
