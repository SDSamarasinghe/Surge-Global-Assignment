import { MDBCard, MDBCardBody, MDBCardImage, MDBIcon } from "mdb-react-ui-kit";
import React from "react";
import TimeAgo from "timeago-react";

const Post = ({ post, user, onLike }) => {
  return (
    <div className="">
      <MDBCard
        style={{
          width: "300px",
          height: "400px",
        }}
      >
        <MDBCardImage src={post.imagePath} position="top" />
        <MDBCardBody>
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-2 card-like">
              <MDBIcon
                onClick={() => onLike(post._id)}
                fas={post.likes.includes(user?.uid)}
                far={!post.likes.includes(user?.uid)}
                icon="heart"
              />
              {post.likes.length}
            </div>

            <div className="d-flex align-items-center gap-2">
              {post.userName}
            </div>

            <div className="d-flex align-items-center gap-2">
              <TimeAgo datetime={post.createdAt} />
            </div>
          </div>
        </MDBCardBody>
      </MDBCard>
    </div>
  );
};

export default Post;
