<?php
	 // Connect to db via shielded file
	 require('../../dbMTurk.php');

	 if (isset($_POST["data"]))
	 {
			// Unique id for filename, and as salt
			$id = uniqid('', true);
			$data = json_decode($_POST['data']);
			$mturkID = $data[0][1];
			$age = $data[0][2]; 
			$gender = $data[0][3];	

			$hash = hash('sha256', $id . $mturkID . $age . $gender);
			echo $hash;

			//$data = $conn->query('SELECT * FROM MTurk' );
			$stmt = $conn->prepare("INSERT 
			INTO MTurk (mturk_id, age, gender, salt, hash) 
			VALUES (:mturkid, :age, :gender, :salt, :hash)");
			$stmt->bindParam(':mturkid', $mturkID);
			$stmt->bindParam(':age', $age);
			$stmt->bindParam(':gender', $gender);
			$stmt->bindParam(':salt', $id);
			$stmt->bindParam(':hash', $hash);

			$stmt->execute();

			// Write data to file
			$fp = fopen('output/'. $id .'.csv', 'w');
			// Write every array cell as newline
			foreach ($data as $line) {
				 fputcsv($fp, $line, "\t", '"');
			}
			fclose($fp);

			// Remove the temp file
			unlink('output/' . $mturkID . '.tmp');
	 } 
?>
