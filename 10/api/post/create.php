<?php
    // headers can be set to IP or * wildcard for everyone
    header('Access-Control-Allow-Origin: *');
    header('Contet-Type: application/json');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, Origin, X-Requested-With');


    include_once '../../config/Database.php';
    include_once '../../models/Post.php';

    // instantiate DB & connect
    $database = new Database();
    $db = $database->connect();

    // instatiate post
    $post = new Post($db);

    // get data from $_POST
    $data = json_decode(file_get_contents('php://input'));

    // bind data
    $post->date = $data->date;
    $post->value = $data->value;
    $post->category_id = $data->category_id;

    // create post
    if ($post->create()) {
        echo json_encode(
            array('message' => 'Post Created')
        );
    } else {
        echo json_encode(
            array('message' => 'Post not Created')
        );
    }
?>