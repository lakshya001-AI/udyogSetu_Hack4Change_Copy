const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const connectMongoose = require("./MongoDB/connect");
const bcrypt = require("bcrypt");
const userModel = require("./MongoDB/userModel");
const multer = require("multer");
const path = require("path");
const userMentorModel = require("./MongoDB/mentorRequestModel");

connectMongoose();
dotenv.config();

// Middleware
app.use(express.json());
app.use(cors());

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now();
    // const fileExt = file.originalname.split(".").pop();
    const data = file.originalname.split(".");
    const fileExt = data.pop();
    const fname = data.pop();

    // cb(null,file.fieldname+"-"+uniqueSuffix+"."+fileExt);
    cb(null, fname + "-" + uniqueSuffix + "." + fileExt);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 5,
  },
});

app.get("/", (req, res) => {
  res.send("Hello we are on Backend");
});

// Create Account Route
app.post("/createAccount", async (req, res) => {
  try {
    const { name, aadhaarNumber, password } = req.body;
    const user = await userModel.findOne({ aadhaarNumber: aadhaarNumber });
    if (!user) {
      const hashPassword = await bcrypt.hash(password, 10);
      const createdUser = await userModel.create({
        name: name,
        aadhaarNumber: aadhaarNumber,
        password: hashPassword,
      });
      res.status(200).send({ message: "user created", createdUser });
    } else {
      res.status(400).send({ message: "User Already Exists" });
    }
  } catch (error) {
    res.status(500).send({ message: "Error:", error });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  try {
    const { aadhaarNumber, password } = req.body;
    const user = await userModel.findOne({ aadhaarNumber: aadhaarNumber });
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        res.status(200).send({
          message: "user loggedIn Successfully",
          user: {
            name: user.name,
            aadhaarNumber: user.aadhaarNumber,
          },
        });
      } else {
        res.status(401).send({ message: "Password is Incorrect" });
      }
    } else {
      res
        .status(400)
        .send({ message: "User not Found! Please create your account" });
    }
  } catch (error) {
    res.status(500).send({ message: "Error:", error });
  }
});

// Register Product Route along with Product Photo upload
app.post("/registerProduct", upload.single("file"), async (req, res) => {
  try {
    const {
      userAadhaarNumber,
      mobileNumber,
      ProductName,
      ProductPrice,
      Address,
      City,
      State,
      userName,
    } = req.body;
    const file = req.file;
    const fileName = req.file.filename;

    if (!file) {
      return res.status(400).send({ message: "No file uploaded" });
    }

    // Assuming you want to save the file path in the user model
    const user = await userModel.findOne({ aadhaarNumber: userAadhaarNumber });
    if (user) {
      user.products.push({
        mobileNumber: mobileNumber,
        ProductName: ProductName,
        ProductPrice: ProductPrice,
        Address: Address,
        City: City,
        State: State,
        userName: userName,
        photo: fileName,
      });

      await user.save();
      res
        .status(200)
        .send({ message: "Product registered successfully", user });
    } else {
      res.status(400).send({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Error:", error });
  }
});

// Get the sellers products details route

app.post("/getProductDetails", async (req, res) => {
  try {
    const { userAadhaarNumber } = req.body;
    const user = await userModel.findOne({ aadhaarNumber: userAadhaarNumber });
    const productDetails = user.products;
    res.status(200).send({ productDetails }); // Return an object with productDetails key
  } catch (error) {
    res.status(500).send({ message: "Error", error });
  }
});

// Mentorship Request Route

app.post("/setMentorRequest", async (req, res) => {
  try {
    const { userName, userPhone, userMessage, userEmail } = req.body;
    const userMessageDetails = await userMentorModel.create({
      userName: userName,
      userPhone: userPhone,
      userMessage: userMessage,
      userEmail: userEmail,
    });
    res.status(200).send({message:"user request Accepted"})
  } catch (error) {
    res.status(500).send({message:"Error",error});
  }
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
