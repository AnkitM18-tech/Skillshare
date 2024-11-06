const express = require("express");
const multer = require("multer");
const {
  uploadMediaToCloudinary,
  deleteMediaFromCloudinary,
} = require("../utils/cloudinary");

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.route("/upload").post(upload.single("file"), async (req, res) => {
  try {
    const response = await uploadMediaToCloudinary(req.file.path);
    return res.status(200).json({ success: true, data: response });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error uploading file to cloudinary" });
  }
});

router.route("/delete/:id").delete(async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Asset Public ID is required" });
    }
    await deleteMediaFromCloudinary(id);
    return res.status(200).json({
      success: true,
      message: "Asset Deleted Successfully from cloudinary",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting file from cloudinary",
    });
  }
});

module.exports = router;
