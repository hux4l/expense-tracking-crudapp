<?php
class Post {
    // DB
    private $conn;
    private $table = 'wallet';

    // post properties
    public $id;    
    public $date;
    public $value;
    public $category_id;
    public $category_name;

    // constructor with db
    public function __construct($db)
    {
        $this->conn = $db;
    }

    // get entries
    public function read() {
        // create query
        $query = 'SELECT 
            c.text as category_name,
            p.id,
            p.category_id,
            p.date,
            p.value
        FROM  '. $this->table.' p
        LEFT JOIN
            categories c ON p.category_id = c.id
        ORDER BY
            p.date DESC';

        // prepare statement
        $stmt = $this->conn->prepare($query);

        // execute
        $stmt->execute();
        return $stmt;
    }

    // get single post
    public function read_single() {
        $query = 'SELECT 
            c.text as category_name,
            p.id,
            p.category_id,
            p.date,
            p.value
        FROM  '. $this->table.' p
        LEFT JOIN
            categories c ON p.category_id = c.id
        WHERE
            p.id = ?
        LIMIT 0,1';

        $stmt = $this->conn->prepare($query);

        // bind id
        // named param ?
        $stmt->bindParam(1, $this->id);

        $stmt->execute();

        // fetch data
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        // set properties
        $this->date = $row['date'];
        $this->value = $row['value'];
        $this->category_id = $row['category_id'];
        $this->category_name = $row['category_name'];

        return $stmt;
    }

    // create post
    public function create() {
        // create query
        $query = 'INSERT INTO ' .$this->table. '
            SET
                date = :date,
                value = :value,
                category_id = :category_id';

        // prepare statement
        $stmt = $this->conn->prepare($query);

        // bind data
        $stmt->bindParam(':date', $this->date);
        $stmt->bindParam(':value', $this->value);
        $stmt->bindParam(':category_id', $this->category_id);

        // execute query
        if($stmt->execute()) {
            return true;
        }

        // print error if something is wrong
        printf("Error: %s.\n", $stmt->error);

        return false;
    }

    // update post
    public function update() {
        // create query
        $query = 'UPDATE ' .$this->table. '
            SET
                date = :date,
                value = :value,
                category_id = :category_id
            WHERE
                id = :id';

        // prepare statement
        $stmt = $this->conn->prepare($query);

        // bind data
        $stmt->bindParam(':date', $this->date);
        $stmt->bindParam(':value', $this->value);
        $stmt->bindParam(':category_id', $this->category_id);
        $stmt->bindParam(':id', $this->id);

        // execute query
        if($stmt->execute()) {
            return true;
        }

        // print error if something is wrong
        printf("Error: %s.\n", $stmt->error);

        return false;
    }

    // delete post
    public function delete() {
        // create query
        $query = 'DELETE FROM '.$this->table.' WHERE id = :id';

        // prepare statement
        $stmt = $this->conn->prepare($query);

        // bind id
        $stmt->bindParam(':id', $this->id);

        // execute query
        if($stmt->execute()) {
            return true;
        }

        // print error if something is wrong
        printf("Deleting Error: %s.\n", $stmt->error);

        return false;
    }
}
?>