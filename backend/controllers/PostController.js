const Posts = require("../models/PostModel");

const addPost = (req, res) => {
  const { imagePath, userName } = req.body;

  const newPost = new Posts({
    imagePath,
    likes: [],
    userName: userName,
  });

  newPost
    .save()
    .then((createdPosts) => {
      res.json(createdPosts);
    })
    .catch((err) => {
      console.log(err);
    });
};

const likeOrDislikePost = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  const post = await Posts.findById(id);

  const index = post.likes.findIndex((id) => id === String(userId));

  if (index === -1) {
    post.likes.push(userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(userId));
  }

  post.save();
  res.json(post);
};

const getPosts = async (req, res) => {
  try {
    const posts = await Posts.find();
    res.json(posts);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getsinglePost = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Posts.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json(error);
  }
};

const updatePost = async (req, res) => {
  const postvID = req.params.id;
  try {
    const id = await Posts.findById(postvID);

    if (!id) {
      return res.status(404).json("There is no Post");
    }

    const { likesCount, imagePath } = req.body;
    const adsr = await Posts.findByIdAndUpdate(advID, {
      likesCount,
      imagePath,
    });

    res.status(201).json({
      updated: true,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const removePost = async (req, res) => {
  const adID = req.params.id;

  try {
    const ad = await Posts.findById(adID);
    if (!ad) {
      return res.status(404).json("There is no Post to remove");
    }

    const removedAds = await Posts.findByIdAndDelete(adID);
    res.status(200).json(removedAds);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
module.exports = {
  addPost,
  getPosts,
  getsinglePost,
  updatePost,
  removePost,
  likeOrDislikePost,
};
