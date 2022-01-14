<?php
    // headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    include_once '../../config/Database.php';
    include_once '../../models/Post.php';

    // instantiate DB & connect
    $database = new Database();
    $db = $database->connect();

    // instatiate post
    $post = new Post($db);

    // call read function
    $result = $post->read();

    // get row count
    $num = $result->rowCount();
    if($num > 0) {
        // post array
        $posts_arr = array();
        // create array inside with data
        $posts_arr['data'] = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)) {
            extract($row);

            // create data array
            $post_item = array(
                'id' => $id,
                'date' => $date,
                'value' => $value,
                'category_id' => $category_id,
                'category_name' => $category_name
            );

            // push to data
            array_push($posts_arr['data'], $post_item);
        }

        // turn to JSON
        echo json_encode($posts_arr);

    } else {
        // no posts
        echo json_encode(
            array('message' => 'No posts found')
        );
    };
?>