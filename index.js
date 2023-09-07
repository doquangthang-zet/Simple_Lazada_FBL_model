
const express = require('express')
const bodyParser = require("body-parser")
const mysql = require("mysql")
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const cookieParser = require("cookie-parser")
const mongoose = require("mongoose");
const multer = require("multer")

const app = express();
const port = 4000;
const salt = 10;

const mongodb_URL = "mongodb+srv://lazada:lazada@cluster0.t3zabpy.mongodb.net/?retryWrites=true&w=majority"

app.use(cors());
app.use(express.static('public'))
app.use(express.json());
// app.use(bodyParser.urlencoded({extended:false}))
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(cookieParser()); 

//create a connection to mongodb
mongoose.connect(mongodb_URL);
mongoose.connection.once("open", () => console.log("Mongodb Connected!")).on("error", (err) => console.log("ERROR: " + err))

//Connect to mysql
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "lazada",
});

connection.connect((err) => {
  if(err) throw err;
  console.log("Mysql Connected!")
})

//Image starage config
var imgConfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./frontend/public/images")
  },
  filename: (req, file, callback) => {
    callback(null, `image-${Date.now()}.${file.originalname}`)
  }
})

//img Filter
const isImage = (req, file, callback) => {
  if(file.mimetype.startsWith("image")) {
    callback(null, true)
  } else {
    callback(null, Error("Only image is allowed"))
  }
}

var upload = multer({
  storage: imgConfig,
  fileFilter: isImage
})

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Error: "You are not authenticated!" });
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) {
        return res.json({ Error: "Token is not ok" });
      } else {
        req.name = decoded.name;
        req.role = decoded.role;
        next();
      }
    });
  }
};

//Routing
app.get("/", verifyUser, (req, res) => {
  return res.json({ Status: "Success", name: req.name, role: req.role });
});

app.post("/register", (req, res) => {
  const sql =
    "INSERT INTO user (`name`, `role`, `email`, `password`) VALUES (?)";

  bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
    if (err) return res.json({ Error: "Error for hashing password!" });

    const values = [req.body.name, req.body.role, req.body.email, hash];

    connection.query(sql, [values], (error, result) => {
      if (error) return res.json({ Error: "Failed to insert data to server" });
      return res.json({ Status: "Success" });
    });
  });
});

app.post("/login", (req, res) => {
  const sql = "SELECT * FROM user WHERE email = ?";

  const values = [req.body.email, req.body.password];
  connection.query(sql, [req.body.email], (err, data) => {
    if (err) return res.json({ Error: "Failed to login to system" });
    if (data.length > 0) {
      bcrypt.compare(
        req.body.password.toString(),
        data[0].password,
        (err, response) => {
          if (err) return res.json({ Error: "Password compare error" });
          if (response) {
            const name = data[0].name;
            const role = data[0].role;
            const token = jwt.sign({ name, role }, "jwt-secret-key", {
              expiresIn: "1d",
            });
            res.cookie("token", token);

            return res.json({ Status: "Success" });
          } else {
            return res.json({ Error: "Password not matched" });
          }
        }
      );
    } else {
      return res.json({ Error: "No email existed" });
    }
  });
});

app.get("/logout", (req, res) => {
    res.clearCookie('token')
    return res.json({Status: "Success"})
})

//Album route
const cateRoute = require("./routes/categories"); 
app.use("/api/category/", cateRoute);


app.listen(port, () => {
  console.log(`Listen to the port ${port}`);
});

// warehouse routes

// get warehouse list
app.get("/warehouse", (req, res) => {
  const q = "SELECT * FROM warehouse";
  connection.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

//create warehouse
app.post("/createWarehouse", (req, res) => {
  const q = "INSERT INTO warehouse VALUES (?)";
  const values = [
    req.body.wId,
    req.body.wName,
    req.body.address,
    req.body.volume,
  ];
  connection.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Warehouse created successfully!");
  });
});

//delete warehouse
app.delete("/deleteWarehouse/:id", (req, res) => {
  const warehouseId = req.params.id;
  const q = "DELETE FROM warehouse WHERE wId = ?";
  connection.query(q, warehouseId, (err, data) => {
    if (err) return res.json(err);
    return res.json("Warehouse deleted successfully!");
  });
});

// get single warehouse info
app.get("/getWarehouse/:id", (req, res) => {
  const warehouseId = req.params.id;
  const q = "SELECT * FROM warehouse WHERE wId = ?";
  connection.query(q, warehouseId, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// update warehouse
app.put("/editWarehouse/:id", (req, res) => {
  const warehouseId = req.params.id;
  const q =
    "UPDATE warehouse SET `wName` = ?, `address` = ?, `volume` = ? WHERE wId = ?";
    const values = [
      req.body.wName,
      req.body.address,
      req.body.volume,
    ];
    connection.query(q, [...values, warehouseId], (err, data) => {
      if (err) return res.json(err);
      return res.json("Warehouse updated successfully!");
    });
});


// get product list
app.get("/product", (req, res) => {
  const q = "SELECT * FROM product";
  connection.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

//create product
app.post("/createProduct", upload.single("image"), (req, res) => {
  // console.log(req.file.filename)
  const q = "INSERT INTO product (`title`, `description`,`image`, `price`, `length`, `width`, `height`, `category`, `properties`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.description,
    req.file.filename,
    req.body.price,
    req.body.length,
    req.body.width,
    req.body.height, 
    req.body.category,
    req.body.properties,
  ]; 
  connection.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Product created successfully!");
  });
});

//delete product
app.delete("/deleteProduct/:id", (req, res) => {
  const productId = req.params.id;
  const q = "DELETE FROM product WHERE id = ?";
  connection.query(q, productId, (err, data) => {
    if (err) return res.json(err);
    return res.json("Product deleted successfully!");
  });
});

// get single product info
app.get("/getOneProduct/:id", (req, res) => {
  const productId = req.params.id;
  const q = "SELECT * FROM product WHERE id = ?";
  connection.query(q, productId, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// update warehouse
app.put("/editProduct/:id", (req, res) => {
  const productId = req.params.id;
  const q =
    "UPDATE product SET `title` = ?, `description` = ?, `price` = ?, `length` = ?, `width` = ?, `height` = ? WHERE id = ?";
    const values = [
      req.body.title,
      req.body.description,
      req.body.price,
      req.body.length,
      req.body.width,
      req.body.height,
    ];
    connection.query(q, [...values, productId], (err, data) => {
      if (err) return res.json(err);
      return res.json("Product updated successfully!");
    });
});
