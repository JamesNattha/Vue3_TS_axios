const db = require("../models");
// const { Op } = require("sequelize");

require("dotenv").config();

const createUser = async (req, res) => {
  const t = await db.sequelize.transaction();
  try {
    // ตรวจสอบว่ามีผู้ใช้ที่มีชื่อซ้ำหรือไม่
    const existingUser = await db.User.findOne({
      where: {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
      },
    });

    if (existingUser) {
      // ถ้าพบผู้ใช้ที่มีชื่อซ้ำ ให้ส่งข้อผิดพลาดกลับไป
      throw new Error("User with the same name already exists.");
      // res.json({ success: false });
    }

    const userData = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      sex: req.body.sex,
      phone: req.body.phone,
      is_deleted: 0,
    };

    const createdUser = await db.User.create(userData, {
      transaction: t,
    });

    await t.commit();
    res.json({ success: true, data: createdUser });
  } catch (error) {
    await t.rollback();
    console.error("Error creating user:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const updateUser = async (req, res) => {
  const t = await db.sequelize.transaction();
  console.log("req.body", req.body);
  try {
    const userId = req.params.id; // สมมติว่า id ของผู้ใช้อยู่ใน URL params
    const userData = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      sex: req.body.sex,
      phone: req.body.phone,
      updated_date: new Date(),
    };

    const updatedUser = await db.User.update(userData, {
      where: { user_id: userId },
      transaction: t,
    });

    if (updatedUser[0] === 0) {
      // กรณีที่ไม่มีการอัปเดต (user ไม่ถูกพบหรือข้อมูลเหมือนเดิม)
      throw new Error("User not found or no changes made.");
    }

    await t.commit();
    res.json({
      success: true,
      data: userData,
      message: "User updated successfully.",
    });
  } catch (error) {
    await t.rollback();
    console.error("Error updating user:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const t = await db.sequelize.transaction();
  try {
    const userId = req.params.id; // รับ id จาก URL params

    // ลบผู้ใช้ด้วย user_id
    const deletedUser = await db.User.destroy({
      where: { user_id: userId },
      transaction: t,
    });

    if (deletedUser === 0) {
      // กรณีที่ไม่มีผู้ใช้ถูกลบ
      throw new Error("User not found.");
    }

    await t.commit();
    res.json({
      success: true,
      message: "User deleted successfully.",
    });
  } catch (error) {
    await t.rollback();
    console.error("Error deleting user:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await db.User.findAll({
      // include:[{
      //   model:db.?,
      //   required:true,
      // }]
    });
    res.json({ success: true, data: user });
  } catch (error) {
    console.error("Error in get user:", error); // Detailed logging
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUser,
};
