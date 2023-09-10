
const express = require('express')
const bodyParser = require("body-parser")
const mysql = require("mysql")
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const cookieParser = require("cookie-parser")
const mongoose = require("mongoose");
const multer = require("multer")
const fs = require("fs");

const app = express();
const port = 4000;
const salt = 10;

const mongodb_URL = "mongodb+srv://lazada:lazada@cluster0.t3zabpy.mongodb.net/?retryWrites=true&w=majority"

app.use(express.static('public'))
app.use(express.json());
// app.use(cors());
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

app.listen(port, () => {
  console.log(`Listen to the port ${port}`);
});

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Error: "You are not authenticated!" });
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) {
        return res.json({ Error: "Token is not ok" });
      } else {
        req.id = decoded.id
        req.name = decoded.name;
        req.role = decoded.role;
        next();
      }
    });
  }
};

//Routing
app.get("/", verifyUser, (req, res) => {
  return res.json({ Status: "Success", id: req.id, name: req.name, role: req.role });
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
            const id = data[0].id;
            const name = data[0].name;
            const role = data[0].role;
            const token = jwt.sign({ id, name, role }, "jwt-secret-key", {
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

//Cate route
const cateRoute = require("./routes/categories"); 
app.use("/api/category/", cateRoute);


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
  const q = "CALL createWarehouse(?, ?, ?)";
  const values = [req.body.wName, req.body.address, req.body.volume];
  connection.query(q, values, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

//delete warehouse
app.delete("/deleteWarehouse/:id", (req, res) => {
  const warehouseId = req.params.id;
  const q = "CALL deleteWarehouse(?)";
  connection.query(q, warehouseId, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
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
  const values = [req.body.wName, req.body.address, req.body.volume];
  connection.query(q, [...values, warehouseId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Warehouse updated successfully!");
  });
});

// view warehouse product list
app.get("/viewWarehouseProduct/:id", (req, res) => {
  const warehouseId = req.params.id;
  const q =
    "SELECT id, wName, product_id, quantity FROM warehouse JOIN product_inventory ON  wId = warehouse_id WHERE wId = ?";
    connection.query(q, warehouseId, (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
});

// get info of product in warehouse
app.get("/getWarehouseProduct/:id", (req, res) => {
  const warehouseId = req.params.id;
  const q =
    "SELECT id, product_id, warehouse_id, wName FROM warehouse JOIN product_inventory ON  wId = warehouse_id  WHERE id = ?";
   connection.query(q, warehouseId, (err, data) => {
     if (err) return res.json(err);
     return res.json(data);
   }); 
})

// move product to new warehouse
app.put("/moveProduct:id", (req, res) => {
  const values = [req.params.id, req.body.id, req.body.warehouse_id, req.body.product_id]
  const q = "CALL moveProduct(?, ?)"
  connection.query(q, values, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  }); 
})

// get all product of a seller


// get product list
app.get("/product/:sellerId", (req, res) => {
  const sellerId = req.params.sellerId
  const q = "SELECT * FROM product where sellerId = ?";
  connection.query(q, sellerId, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

//create product
app.post("/createProduct", upload.single("image"), (req, res) => {
  // console.log(req.file.filename)
  const q = "INSERT INTO product (`title`, `description`, `image`, `price`, `length`, `width`, `height`, `category`, `properties`, `sellerId`, `createdAt`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.description,
    req.file.filename,
    req.body.price,
    req.body.length, 
    req.body.width,
    req.body.height, 
    req.body.category,
    JSON.stringify(req.body.properties),
    req.body.sellerId,
    new Date(),
  ];
  connection.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Product created successfully!");
  });
});

//delete product
app.delete("/deleteProduct/:id", (req, res) => {
  const productId = req.params.id;

  //Get the image name of deleted item
  const getImageQ = "SELECT * FROM product WHERE id = ?";
  var image = ''
  connection.query(getImageQ, productId, (err, data) => {
    if (err) return res.json(err);
    image = data[0].image
  });

  //Delete the items
  const q = "DELETE FROM product WHERE id = ?";
  connection.query(q, productId, (err, data) => {
    if (err) return res.json(err);
    //Delete the image of item
    fs.unlink(`./frontend/public/images/${image}`, function (err) {
      if (err) throw err;
      // if no error, file has been deleted successfully
      console.log('File deleted!');
    });
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
app.put("/editProduct/:id", upload.single("image"), (req, res) => {
  const productId = req.params.id;

  //Get the image name of deleted item
  const getImageQ = "SELECT * FROM product WHERE id = ?";
  var image = ''
  connection.query(getImageQ, productId, (err, data) => {
    if (err) return res.json(err);
    image = data[0].image
  });

  const q =
    "UPDATE product SET `title` = ?, `description` = ?, `image` = ?, `price` = ?, `length` = ?, `width` = ?, `height` = ?, `category` = ?, `properties` = ? WHERE id = ?";
    const values = [
      req.body.title,
      req.body.description,
      req.file.filename,
      req.body.price,
      req.body.length,
      req.body.width,
      req.body.height, 
      req.body.category,
      JSON.stringify(req.body.properties),
    ];
    connection.query(q, [...values, productId], (err, data) => {
      if (err) return res.json(err);
      fs.unlink(`./frontend/public/images/${image}`, function (err) {
        if (err) throw err;
        // if no error, file has been deleted successfully
        console.log('File deleted!');
      });
      return res.json("Product updated successfully!");
    });
});
