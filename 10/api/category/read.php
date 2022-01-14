<?php
    // headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    include_once '../../config/Database.php';
    include_once '../../models/Category.php';

    // instantiate DB & connect
    $database = new Database();
    $db = $database->connect();

    // instatiate post
    $category = new Category($db);

    // call read function
    $result = $category->read();

    // get row count
    $num = $result->rowCount();
    if($num > 0) {
        // post array
        $category_arr = array();
        // create array inside with data
        $category_arr['data'] = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            // create data array
            $category_item = array(
                'id' => $id,
                'text' => $text,
            );

            // push to data
            array_push($category_arr['data'], $category_item);
        }

        // turn to JSON
        echo json_encode($category_arr);

    } else {
        // no posts
        echo json_encode(
            array('message' => 'No posts found')
        );
    };
?>