const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const session = require('express-session');
const memorystore = require('memorystore')(session);
const con = require("./config/db");




const app = express();

//Set up the session
app.use(session({
  cookie: {maxAge: 60*60*24*1000},
  secret: 'IamSoSleepyAndNeed2CupsOfCoffee',
  resave: false,
  saveUninitialized: true,
  store: new memorystore( { checkPeriod: 24*60*60*1000})
}));





// set the public folder
app.use("/proj", express.static(path.join(__dirname, "proj")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




// ------------ root services ----------
// ------------ without register page ----------
// ------------  home page ----------
// -- API-finished


// ------------  home page ----------
// -- API-finished



// ---------- password generator -----------
// -- API-finished-V2
app.get("/password/:pass", function (req, res) {
  const hashPass = req.body;
  bcrypt.hash(req.params.pass, 10, function (err, hash) {
    if (err) {
      console.error(err);
      res.status(500).send("Hashing error");
    } else {
      res.send(hash);
      console.log(hash+"sent");
    }
  });
});

// ---------- insert register data -----------
// -- API-finished-V2
app.post("/student", function (req, res) {
  // const {name, price, amount} = req.body;
  // const newProduct = {name: name, price: price, amount: amount};
  const newStudent = req.body;

  const sql = "INSERT INTO register_students SET ?";
  con.query(sql, newStudent, function (err, results) {
    if (err) {
      console.error(err);
      return res.status(500).send("Database server error");
    }
    if (results.affectedRows != 1) {
      console.error("Row added is not 1");
      return res.status(500).send("Add failed");
    }
    res.send("Add succesfully");
  });
});

//----login check data
// -- API-finished-V2
app.post("/login_students", function (req, res) {
  const mfu_ID = req.body.mfu_ID;
  const password = req.body.password;
  // console.log(username, password);

  const sql =
    "SELECT mfu_ID , password, email, name, role FROM register_students WHERE mfu_ID=?";

    con.query(sql, [mfu_ID], function (err, results) {
      if (err) {
          console.error(err);
          res.status(500).send('DB error');
      } else if (results.length != 1) {
          res.status(401).send('Username is not found');
      } else {
          // raw: password
          // hash: results[0].password
          bcrypt.compare(password, results[0].password, function (err, same) {
              if (err) {
                  res.status(500).send('Password compare error');
              } else {
                  if (same) {
                      //res.send('Login success');
                      req.session.mfu_ID = mfu_ID;
                      //req.session.userID = results[0].id;
                      req.session.role = results[0].role;
                      console.log(req.session.role);
                      res.send('/welcome');
                      
                  } else {
                      res.status(401).send('Wrong password');
                  }
              }
          })
      }
  });
});

//logout
// -- API-finished-V2
app.get("/logout", function(req,res){
  req.session.destroy(function(err){
      if(err){
          console.error(err.message);
          res.status(500).send('cannot logout');
      }
      else{
          res.redirect('/');
      }
  })
});


//------------------------------------------------------------------------









//get Room info---------------------V2------
//API-finish-V2
app.get("/room_get", function(_req,res){
  //res.send(req.session.username);
  const sql_room = "SELECT * FROM rooms ORDER BY rooms.building ASC;";
  con.query(sql_room,function(err,results){
    if(err){
        console.error(err);
        return res.status(500).send("Database server error");
    }
    res.send(results);
    //console.log(results);
  });

  //console.log(sql_room);
});
//---------------------------room slot available check
/////API-finish-V2
app.get(`/room_get_slot_check/:date`, function(req,res){
  //res.send(req.session.username);
  const date = req.params.date;
  console.log(date);
  const sql_slot = `SELECT room_ID,time,status FROM request_rooms WHERE date = '${date}'`;
  //console.log(sql_slot);
  con.query(sql_slot,function(err,results){
    if(err){
        console.error(err);
        return res.status(500).send("Database server error");
    }
    console.log(results);
    console.log('slot');
    res.send(results);
    //console.log(results);
  });

  //console.log(sql_room);
});


// ------------  Student pages ----------





// ------------ request room page ----------
//API-finished-V2
app.post("/student_request_booking", function (req, res) {
  // const {name, price, amount} = req.body;
  // const newProduct = {name: name, price: price, amount: amount};
  const data = req.body;
  const mfuID = req.session.mfu_ID;
  const sql = `INSERT INTO request_rooms (mfu_ID, time, date, reason, request_ID, room_ID, status) VALUES (${mfuID}, '${data.time}', '${data.date}', '${data.reason}', NULL, '${data.room_ID}', '${data.status}');`;
  con.query(sql, data, function (err, results) {
    if (err) {
      console.error(err);
      return res.status(500).send("Database server error");
    }
    if (results.affectedRows != 1) {
      console.error("Row added is not 1");
      return res.status(205).send("Add failed");
    }
    res.send("Requested Booking successfully done!");
  });
});


// ------------ checkRequest data page ----------
//API-finished-V2
app.get("/student_check_data_request", function (req, res) {
  const mfu_ID = req.session.mfu_ID;
  let sql = `SELECT * FROM request_rooms,rooms WHERE request_rooms.room_ID=rooms.room_ID && request_rooms.mfu_ID = ${mfu_ID} ORDER BY request_rooms.request_ID ASC`;
  con.query(sql,function(err,results){
    if(err){
        console.log(err);
        res.status(500).send("DB error")
    }
    console.log(results);
    res.send(results);

});

  //res.sendFile(path.join(__dirname, "proj/html/student/student_profile.html"));
  
  
});



// ------------ profile data page ----------
//API-finished-V2
app.get("/profile_data", function (req, res) {
  const mfu_ID = req.session.mfu_ID;
  const sql=`SELECT * FROM register_students WHERE mfu_ID = ${mfu_ID}`;
  con.query(sql,function(err,results){
      if(err){
          console.log(err);
          res.status(500).send("DB error")
      }
      console.log(results);
      res.send(results);
  
  });
});

// ------------ student_profile_data_update ----------
//API-finished-V2
app.put("/profile_data_update", function (req, res) {
  const data = req.body;
  console.log(data);
  const mfu_ID = req.session.mfu_ID;
  const sql = `UPDATE register_students SET name='${data.name}',email = '${data.email}' WHERE mfu_ID = ${mfu_ID} `;
  con.query(sql, data, function (err, results) {
      if (err) {
          console.error(err);
          return res.status(500).send("Database server error");
      }
      if (results.affectedRows != 1) {
          console.error('Row update is not 1');
          return res.status(400).send("Update failed");
      }
      res.send("Update succesfully");
  });
});








//---------------data for requests
//API-finished-V2
app.get('/lecturer_request_data',function(_req,res){
  
  const sql=`SELECT name,building,description,room_Number,request_ID,request_rooms.mfu_ID,time, date, reason, status, request_rooms.room_ID FROM rooms,request_rooms,register_students WHERE request_rooms.room_ID=rooms.room_ID && register_students.mfu_ID=request_rooms.mfu_ID ORDER BY request_rooms.request_ID ASC; `;
  con.query(sql,function(err,results){
      if(err){
          console.error(err);
          return res.status(500).send("Database server error");
      }
      console.log(results);
      console.log('request_check');
      res.send(results);
  })
})

// ------------ Request data checking page ----------
// ----------------------- reject request --------------------------
//API-finished-V2
app.put("/lecturer_request_approve", function (req, res) {
  const id = req.body;
  //const updateRoom = req.body;
  //console.log(id.id);
  const sql = `UPDATE request_rooms SET status='approved' WHERE request_ID = ${id.id}`;
  con.query(sql, function (err, results) {
      if (err) {
          console.error(err);
          return res.status(500).send("Database server error");
      }
      if (results.affectedRows != 1) {
          console.error('Row update is not 1');
          return res.status(400).send("Update failed");
      }
      res.send("Approve succesfully");
  });
});


// ----------------------- reject request --------------------------
//API-finished-V2
app.put("/lecturer_request_reject", function (req, res) {
  const id = req.body;
  //const updateRoom = req.body;
  //console.log(id.id);
  const sql = `UPDATE request_rooms SET status='rejected' WHERE request_ID = ${id.id}`;
  con.query(sql, function (err, results) {
      if (err) {
          console.error(err);
          return res.status(500).send("Database server error");
      }
      if (results.affectedRows != 1) {
          console.error('Row update is not 1');
          return res.status(400).send("Update failed");
      }
      res.send("Update succesfully");
  });
});










//------------------------------------------------------------------------------------salai
// ------------ Dashboard page ----------


//lecturer-dashboard data
//api-finished-V2
app.get('/dashboard_data/:date',function(req,res){
  const date=req.params.date;
  console.log(date);
  console.log('data lee');
  const sql=`SELECT rooms.room_Status,request_ID,mfu_ID,time, date, reason, status, request_rooms.room_ID FROM rooms,request_rooms WHERE request_rooms.room_ID=rooms.room_ID && date='${date}';`;
  const count = `SELECT room_Status, COUNT(room_Status) as total FROM rooms GROUP BY room_Status;`;
    con.query(sql,function(err,results){
        if(err){
            console.error(err);
            return res.status(500).send("Database server error");
        }
        console.log(results);
        console.log('lee');
        con.query(count,function(err,results2){
          if(err){
              console.error(err);
              return res.status(500).send("Database server error");
          }
          console.log('restart');
          console.log(results2);
          console.log(results);
          console.log('ok');
          if(results.length != 0){
            //console.log(results2.length);
          //console.log(results2);
          //console.log(results2[0].total);
          console.log('leee res2 en');

          //var total1=0;
          let total1=0;
          let enable1 = 0;
          let disable1=0;
          //console.log(results2.length);
          if(results2.length == 2){
              total1 = results2[0].total + results2[1].total;
              enable1 = results2[1].total;
              disable1 = results2[0].total;
          }
          else{
            total1 = results2[0].total;
            enable1 = total1;
          }
          
          //console.log(total1);

          
            console.log(results);
          //console.log(results.total);
            results[0].total = total1;
            results[0].enable1 = enable1;
            results[0].disable1 = disable1;
            results[0].check = 1;
            console.log(results);
            res.send(results);
          }
          else{
            console.log('heyyy');
            

            results2[0].check = 2;
            res.send(results2);
          }
          
          

          
      })
        
    
    //res.send(results);
    });
});

// lecturer reservation history delete API
//V2
app.delete("/history/:id",function(req,res){
  const id = req.params.id;
  const sql = "DELETE FROM request_rooms WHERE request_ID = ?";
  con.query(sql,[id],function(err,results){
      if (err) {
            console.error(err);
          return res.status(500).send("Database server error");
          }
          if (results.affectedRows != 1) {
              console.error('Row deleted is not 1');
              return res.status(500).send("Delete failed");
          }
          res.send("Delete succesfully");
  })
});

// lecturer reservation history showing API
//V2
app.get("/history_data",function(_req,res){
  const sql="SELECT status,time,date,reason,mfu_ID,rooms.room_Number,request_ID FROM request_rooms,rooms WHERE (status = 'approved' OR status = 'rejected') && rooms.room_ID=request_rooms.room_ID ORDER BY `request_rooms`.`request_ID` DESC"
  con.query(sql,function(err,results){
      if(err){
          console.error(err);
          return res.status(500).send("Database server error");
      }
      res.send(results);
  })
})


//------------------------------------------------------------------------------------salai
// ------------ Profile page ----------
//V2
app.get("/lecturer_profile", function (req, res) {
  if(req.session.role == 3){
    res.sendFile(path.join(__dirname, "proj/html/lecturer/lecturer_profile.html"));
  }
  else{
    res.redirect('/');
  }
  
  
  
});

// ------------ Profile logout ----------
//API-finished-V2
app.get("/lecturer_logout", function(req,res){
  req.session.destroy(function(err){
      if(err){
          console.error(err.message);
          res.status(500).send('cannot logout');
      }
      else{
          res.redirect('/');
      }
  })
});

//========================================================staff========================

//—-----------------Read rooms table—-------------------
app.get('/rooms', function (_req, res) {
  const sql = "SELECT * FROM rooms ORDER BY rooms.building ASC;";
  con.query(sql, function (err, results) {
      if (err) {
          console.error(err);
          return res.status(500).send("Database server error");
      }
      res.json(results);
  });
});




// ------------------------ Add a new room ---------------------------
app.post("/rooms_add", function (req, res) {
  const { room_Number, building, description} = req.body;


  const sql = `INSERT INTO rooms (room_Number,building,description,room_Status) VALUES (?,?,?,'enable')`;
  con.query(sql, [room_Number, building, description], function (err, results) {
      if (err) {
          console.error(err);
          return res.status(500).send("Database server error");
      }
      if (results.affectedRows != 1) {
          console.error('Row added is not 1');
          return res.status(400).send("Add failed")
      }
      res.send("/staff_add")
  })
});
//------------------------ Enable a room ---------------------------
app.post('/erooms/:id',function(req,res){
  const id=req.params.id;
  const sql="UPDATE `rooms` SET `room_Status` = 'enable' WHERE `rooms`.`room_ID` =  ?;"
  con.query(sql,[id],function(err,results){
    if(err){
      if (err) {
        console.error(err);
        return res.status(500).send("Database server error");
    }
    if (results.affectedRows != 1) {
        console.error('Row added is not 1');
        return res.status(500).send("Add failed")
    }
    res.send("Enabled successfully")
    }
  })
})
//------------------------ Disable a room ---------------------------
app.post('/drooms/:id',function(req,res){
  const id=req.params.id;
  const sql="UPDATE `rooms` SET `room_Status` = 'disable' WHERE `rooms`.`room_ID` =  ?;"
  con.query(sql,[id],function(err,results){
    if(err){
      if (err) {
        console.error(err);
        return res.status(500).send("Database server error");
    }
    if (results.affectedRows != 1) {
        console.error('Row added is not 1');
        return res.status(500).send("Add failed")
    }
    res.send("Disabled successfully")
    }
  })
})
// ----------------------- Update a room --------------------------
app.put("/rooms_update/:id", function (req, res) {
  const id=req.params.id;
  const updateRoom = req.body;


  const sql = `UPDATE rooms SET  ? WHERE room_ID = ?`;
  con.query(sql, [updateRoom,id], function (err, results) {
      if (err) {
          console.error(err);
          return res.status(500).send("Database server error");
      }
      if (results.affectedRows !== 1) {
          console.error('Row update is not 1');
          return res.status(400).send("Update failed");
      }
      res.send("Updated successfully");
  });
});

//—-----------------Read request_rooms table—-------------------
app.get('/request_rooms_data', function (_req, res) {
  const sql = "SELECT * FROM request_rooms";
  con.query(sql, function (err, results) {
      if (err) {
          console.error(err);
          return res.status(500).send("Database server error");
      }
      res.json(results);
  });
});


// app.get('/rooms', function (_req, res) {
//     res.sendFile(path.join(__dirname, 'proj/html/staff/staff_add.html'))
// });
//========================================================staff========================

//===============================================root-services==================================================================
// ------------ Request page ----------
//root-service
//API-finished-V2
app.get("/lecturer_request", function (req, res) {
  if(req.session.role == 3){
    res.sendFile(path.join(__dirname, "proj/html/lecturer/lecturer_request.html"));
  }
  else{
    res.redirect('/login');
  }
});

  
  
  

//root-service
//root-service
//API-finished-V2
app.get("/lecturer_dashboard", function (req, res) {
  if(req.session.role == 3){
    res.sendFile(path.join(__dirname, "proj/html/lecturer/lecturer_dashboard.html"));
  }
  else{
    res.redirect('/');
  }
  
  
  
});

// ------------ History page ----------
//API-finished V2
app.get("/lecturer_history", function (req, res) {
  if(req.session.role == 3){
    res.sendFile(path.join(__dirname, "proj/html/lecturer/lecturer_history.html"));
  }
  else{
    res.redirect('/');
  }
  
  
  
});


// ------------ checkRequest page ----------
//root-service
//API-finished-V2
app.get("/student_check_request", function (req, res) {
  if(req.session.role == 1){
    res.sendFile(path.join(__dirname, "proj/html/student/student_checkRequest.html"));
  }
  else{
    res.redirect('/login');
  }
});



// ------------ Profile page ----------
//API-finished
app.get("/student_profile", function (req, res) {
  if(req.session.role == 1){
    res.sendFile(path.join(__dirname, "proj/html/student/student_profile.html"));
  }
  else{
    res.redirect('/login');
  }
  
  
});
//----------------------------- GET -------------------------------------------

//---------------------------- STAFF --------------------------

// --------- Home staff ----------------
//V2
app.get("/staff_home", function (req, res) {
  if(req.session.role == 2){
    res.sendFile(path.join(__dirname, "proj/html/staff/staff_home.html"));
  }
  else{
    res.redirect('/');
  }
  
});
// --------- Add/Edit staff ----------------
//V2
app.get("/staff_add", function (req, res) {
  if(req.session.role == 2){
    res.sendFile(path.join(__dirname, "proj/html/staff/staff_add.html"));
  }
  else{
    res.redirect('/');
  }
  
});
// --------- Dashboard staff ----------------
//V2
app.get("/staff_dashboard", function (req, res) {
  if(req.session.role == 2){
    res.sendFile(path.join(__dirname, "proj/html/staff/staff_dashboard.html"));
  }
  else{
    res.redirect('/');
  }
});
// --------- History staff ----------------
//V2
app.get("/staff_history", function (req, res) {
  if(req.session.role == 2){
    res.sendFile(path.join(__dirname, "proj/html/staff/staff_history.html"));
  }
  else{
    res.redirect('/');
  }
  
});
// --------- Profile staff ----------------
//V2
app.get("/staff_profile", function (req, res) {
  if(req.session.role == 2){
    res.sendFile(path.join(__dirname, "proj/html/staff/staff_profile.html"));
  }
  else{
    res.redirect('/');
  }
  
});


// ------------ login page ----------
// -- API-finished//V2
//root-service
app.get("/login", function (_req, res) {
  
  res.sendFile(path.join(__dirname, "proj/html/student/login.html"));

  
});
// ------------ Register page ----------
// -- API-finished
//root-service
app.get("/register", function (_req, res) {
  res.sendFile(path.join(__dirname, "proj/html/student/register.html"));
});

//root-service
//V2
app.get("/welcome", function (req, res) {
  if(req.session.role == 1){
    console.log(req.session.role + " student");
    res.sendFile(path.join(__dirname, "proj/html/student/student_home.html"));
  }
  else if(req.session.role == 2){
    res.sendFile(path.join(__dirname, "proj/html/staff/staff_home.html"));
  }
  else if(req.session.role == 3){
    console.log(req.session.role);
    res.sendFile(path.join(__dirname, "proj/html/lecturer/index.html"));
  }
  else{
    res.redirect('/login');
  }

});

//---------------------welcome page withoud login
app.get('/', function (_req, res) {
  
  res.sendFile(path.join(__dirname, '/proj/withoutLoginPages/project-web - Copy/view/index.html'))
      

      
});




const PORT = 3000;
app.listen(PORT, function () {
  console.log("Server is runnint at port " + PORT);
});
