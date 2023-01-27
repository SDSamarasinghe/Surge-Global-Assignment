import React, { useEffect, useState } from "react";
import client from "../utils/axios";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../firebase";
import Post from "../components/post";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState();

  useEffect(() => {
    client
      .get("/api/posts/all")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(undefined);
      }
    });
  }, []);

  // like to post and send the user id from firebase auth
  const handleLike = async (id) => {
    client
      .post(`/api/posts/like/${id}`, {
        userId: user.uid,
      })
      .then((res) => {
        setPosts(posts.map((post) => (post._id === id ? res.data : post)));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="d-flex items-center flex-column align-items-center gap-3">
      {posts &&
        posts.map((post) => (
          <Post post={post} user={user} onLike={handleLike} />
        ))}
    </div>
  );
}
