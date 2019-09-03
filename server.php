<?php

$data = array();
$is_error = false;
$err_description = "";

// default and min val for start date
$default_start_date = "2019-01-01 00:00:00";
$default_start_time = 1546329600;

// default and max val for end date
$default_end_date = "2019-03-01 00:00:00";
$default_end_time = 1551427200;

$hour_time = 3600;	// amount of secs in 1 hour


function output_json(&$data){
	
	global $is_error, $err_description;

	// enable CORS
	header("Access-Control-Allow-Origin: *");

	// let browser know the response should be parsed as json
	header("Content-Type: application/json");

	$arr = array(
		"is_error" => $is_error,
		"err_description" => $err_description,
		"data" => $data
	);

	echo json_encode($data, JSON_UNESCAPED_UNICODE );

	die();
	
}


/////////////////////////////////////////////////////////////////


// get start and end dates externally or set to default values
$start_date = isset($_GET["start_date"]) && DateTime::createFromFormat("Y-m-d H:i:s", $_GET["start_date"]) !== false ? date("Y-m-d H:00:00", strtotime($_GET["start_date"])) : $default_start_date;
$start_time = strtotime($start_date);

$end_date = isset($_GET["end_date"]) && DateTime::createFromFormat("Y-m-d H:i:s", $_GET["end_date"]) !== false ? date("Y-m-d H:00:00", strtotime($_GET["end_date"])) : $default_end_date;
$end_time = strtotime($end_date);


if ($start_time < $default_start_time){
	
	// start date is before the default start date
	
	$start_date = $default_start_date;
	$start_time = $default_start_time;	
	
}

if ($end_time > $default_end_time){
	
	// end date is after the default end date
	
	$end_date = $default_end_date;
	$end_time = $default_end_time;
	
}

if ($start_time > $end_time){
	
	// user mixed up start date and end date
	
	$is_error = true;
	$err_description = "end date is before start date";
	
	output_json($data);
	
}

/*

	aggregation table fields:
	
		(dimensions:)
		- dt				datetime
		- country_code		string (2 chars)
		- affiliate_id		string (32 chars)

		(measures:)
		- leads				uint32
		- conversions		uint32
		- is_profit			bit
		
*/


$country_codes = json_decode(file_get_contents("country_codes.json"), true);
$affiliates = json_decode(file_get_contents("affiliates.json"), true);


$current_time = $start_time;

$pk_arr = array();

while ($current_time <= $end_time){
	
	$country_code = $country_codes[array_rand($country_codes)];
	$affiliate_id = array_rand($affiliates);
	
	$pk = $current_time . "|" . $country_code . "|" . $affiliate_id;
	
	if (isset($pk_arr[$pk]) || mt_rand(0, 100) < 30){
		
		$pk_arr = array();
		
		$current_time += $hour_time;
		
		continue;
		
	}
	
	$pk_arr[$pk] = false;
	
	$data[] = array(
		"dt" => date("Y-m-d H:00:00", $current_time),
		"country_code" => $country_code,
		"affiliate_id" => $affiliate_id,
		"leads" => mt_rand(0, 100),
		"conversions" => mt_rand(0, 20),
		"is_profit" => (mt_rand(0, 100) <= 75 ? true : false)
	);
	
}

output_json($data);