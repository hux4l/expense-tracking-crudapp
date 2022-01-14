<?php
    // headers
    header('Access-Control-Allow-Origin: *');
    header('Contet-Type: application/json');
    header('Access-Control-Allow-Methods: PUT');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');


    include_once '../../config/Database.php';
    include_once '../../models/Post.php';

    // instantiate DB & connect
    $database = new Database();
    $db = $database->connect();

    // instatiate post
    $post = new Post($db);

    // get raw posted
    $data = json_decode(file_get_contents('php://input'));

    // bind data
    $post->id = $data->id;
    $post->date = $data->date;
    $post->value = $data->value;
    $post->category_id = $data->category_id;

    // update post
    if ($post->update()) {
        echo json_encode(
            array('message' => 'Post Updated')
        );
    } else {
        echo json_encode(
            array('message' => 'Post not Updated')
        );
    }
?>