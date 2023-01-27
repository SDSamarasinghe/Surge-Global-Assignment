const express = require("express");
const router = express.Router();
const {
  addPost,
  getPosts,
  getsinglePost,
  updatePost,
  removePost,
  likeOrDislikePost,
} = require("../controllers/PostController");

//@route GET api/posts/all
//@desc Get all posts
router.get("/all", getPosts);

//@route POST api/posts
//@desc Add an ads
router.post("/", addPost);

//@route PUT api/Posts/:id
//@desc Update an Posts
router.put("/:id", updatePost);

//@route POST api/Posts/like/:id
//@desc Like a Posts
router.post("/like/:id", likeOrDislikePost);

//@route DELETE api/Posts/:id
//@desc delete an Posts
router.delete("/:id", removePost);

//@route getSpecific api/Posts/:id
//@desc getSpecific an Posts
router.get("/:id", getsinglePost);

module.exports = router;
