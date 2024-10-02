const express = require("express");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads")
    },
    filename: function (req, file, cb) {
        const parts = file.originalname.split(".");
        const ext = parts[parts.length - 1];
        cb(null, `${Date.now()}.${ext}`);
    },
});

const uploadMiddleware = multer({ storage });

const { 
    register,
    login,
    logout,
    profile,
    createPost,
    posts,
    singlePost,
    deletePost

} = require("../controllers/users");

const router = express.Router()

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").post(logout)
router.route("/profile").get(profile)
router.route("/post").get(posts)
router.route("/post/:id").get(singlePost)
router.route("/delete").delete(deletePost)
router.post("/createPost",uploadMiddleware.single('file'),createPost)


module.exports = router