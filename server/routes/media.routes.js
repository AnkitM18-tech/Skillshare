const express = require("express");
const multer = require("multer");
const {
  uploadMediaToCloudinary,
  deleteMediaFromCloudinary,
} = require("../utils/cloudinary");
const fs = require("fs").promises;

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.route("/upload").post(upload.single("file"), async (req, res) => {
  try {
    const response = await uploadMediaToCloudinary(req.file.path);
    await fs.unlink(req.file.path);
    return res.status(200).json({ success: true, data: response });
  } catch (error) {
    await fs.unlink(req.file.path);
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
    const response = await deleteMediaFromCloudinary(id, "video");
    if (response.result === "ok") {
      return res.status(200).json({
        success: true,
        message: "Asset Deleted Successfully from cloudinary",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Error deleting file from cloudinary",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting file from cloudinary",
    });
  }
});

router
  .route("/bulk-upload")
  .post(upload.array("files", 10), async (req, res) => {
    try {
      const uploadPromises = req.files.map(async (file) => {
        const result = await uploadMediaToCloudinary(file.path);
        await fs.unlink(file.path);
        return result;
      });

      const results = await Promise.all(uploadPromises);

      return res.status(200).json({
        success: true,
        message: "Bulk upload completed successfully",
        data: results,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error uploading files in bulk to cloudinary",
      });
    }
  });

module.exports = router;
