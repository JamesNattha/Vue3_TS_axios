const express = require("express");
const router = express.Router();

//กำหนด Router ที่รับเข้ามา
const user = require("./router/userRoutes");

//กำหนดการใช้งาน
router.use("/user", user);

module.exports = router;
