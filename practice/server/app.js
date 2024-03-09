const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Msd@007,",
  database: "practice",
});
db.connect(function (error) {
  if (error) {
    console.log(error);
  } else {
    console.log("DB connected");
  }
});

app.post("/create_user", (req, res) => {
  const { username, email_id, phone_no, pass_word } = req.body;
  //   const sqlData =
  //     "insert into test_one (username,email_id,phone_no,pass_word)values(?,?,?,?)";
  const sqlData =
    "INSERT INTO test_one (username, email_id, phone_no, pass_word) VALUES (?, ?, ?, ?)";
  db.query(
    sqlData,
    [username, email_id, phone_no, pass_word],
    (err, result) => {
      if (err) {
        console.error("Error executing query: " + err.stack);
        res.status(404).json({ error: "Failed to insert user" });
        return;
      } else {
        console.log(result);
        res.status(200).json({
          status: "Success",
          Message: "Data inserted",
        });
      }
    }
  );
});

app.post("/login_user", (req, res) => {
  const { email_id, pass_word } = req.body;
  const sql = "select * from test_one where email_id=?";
  db.query(sql, [email_id], (err, result) => {
    if (err) {
      console.error("Error executing query: " + err.stack);
      res.status(404).json({ error: "Failed to insert user" });
      return;
    } else if (result.length === 0) {
      res
        .status(401)
        .json({ Failed: false, error: "Invalid email or password" });
    } else {
      res.status(200).json({
        status: "Success",
        Message: "login successfully",
        result,
      });
    }
  });
});
app.get("/get_user", (req, res) => {
  const sqlData = "select * from test_one";

  db.query(sqlData, (err, result) => {
    if (err) {
      console.log("query error", err);
      res.status(500).json({ error: "internal query error" });
    } else {
      res.status(200).json({ status: "sucess", result });
      console.log(result);
    }
  });
});
app.delete("/delete_user/:id", (req, res) => {
    const user_id = req.params.id;
    const sqlData = "select * from test_one where id=?";
  
    db.query(sqlData, [user_id],(err, result) => {
      if (err) {
        console.log("query error", err);
        res.status(500).json({ error: "internal query error" });
      } else {
        res.status(200).json({ status: "sucess", result });
        console.log(result);
      }
    });
  });

  

app.put("/update_user/:id", (req, res) => {
  const user_id = req.params.id;
  const { username, email_id, phone_no, pass_word } = req.body;

  const sqlData =
    "UPDATE test_one SET username=?, email_id=?, phone_no=?, pass_word=? WHERE id=?";
  const values = [username, email_id, phone_no, pass_word,user_id];
  db.query(sqlData, values, (err, result) => {
    if (err) {
      console.log("error updating user", err);
      return err;
    }else{
        console.log({"user_updated":result});
        res.status(200).json({status:"success",updated:result})
    }
  });
});

app.listen(3002, () => {
  console.log("Server is running on port 3002");
});
