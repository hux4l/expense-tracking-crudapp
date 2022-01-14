<?php

    class Category {
        private $conn;
        private $table = 'categories';

        // properties
        public $id;
        public $text;

        // constructor
        public function __construct($db)
        {
            $this->conn = $db;
        }

        // get categories
        public function read() {
            $query = 'SELECT * FROM '.$this->table.' ORDER BY id DESC';

            // prepare statement
        $stmt = $this->conn->prepare($query);

        // execute
        $stmt->execute();
        return $stmt;
        }
    }

?>