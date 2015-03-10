<!doctype html>
<?php
	 if (isset($_POST["data"]))
	 {
			$id = uniqid('', true);
			$data = json_decode($_POST['data']);
			$fp = fopen('output/'. $id .'.csv', 'w');
			// Write every array cell as newline
			foreach ($data as $line) {
				 fputcsv($fp, $line, "\t", '"');
			}
			fclose($fp);
	 } 
?>

