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

    // get id
    $post->id = isset($_GET['id']) ? $_GET['id'] : die();

    // get post
    $post->read_single();

    // create array
    $post_arr= array(
        'id' => $post->id,
        'date' => $post->date,
        'value' => $post->value,
        'category_id' => $post->category_id,
        'category_name' => $post->category_name
    );

    // make JSON
    print_r(json_encode($post_arr));
?>