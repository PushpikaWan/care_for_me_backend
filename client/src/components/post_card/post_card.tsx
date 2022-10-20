import Card from "@mui/material/Card";
import {
  Avatar,
  CardMedia,
  Divider,
  IconButton
} from "@mui/material";
import CommentIcon from '@mui/icons-material/Comment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {useState} from "react";

import './post_card.scss';
import CardContent from "@mui/material/CardContent";
import {primaryColor, secondaryColor} from "../../utils/constants";
import {Post} from "../../models/Post";
import {Comment} from "../../models/Comment";
import {getAnimalNeedLabel, getTimeText} from "../../utils/helpers";

type PostCardProps = { post: Post }
export default function PostCard({post}: PostCardProps) {
  const [showComment, setShowComment] = useState<boolean>(true);

  const renderComments = (comments: Comment[]) => {
    return (
        comments.map(comment => {
          return (
              <div className="card-content-comment">
                <div className="comment-header-user-image">
                  <Avatar
                      src={comment.userLite.userImageUrl}
                      aria-label="comment-user"/>
                </div>
                <div className="comment-header-user-meta">
                  <div className="comment-header-user-meta-name"> {comment.userLite.userName} <span
                      className="comment-header-user-meta-time"> {getTimeText(comment.postedAt, true)} </span>
                  </div>
                  <div className="comment-text">{comment.text}</div>
                </div>
              </div>
          );
        })
    );
  }

  return (
      <Card className="post-main-container">
        <CardMedia
            component="img"
            image={post.imageUrl}
            alt="Post Image"
        />
        <CardContent>
          <div className="content-header">
            <div className="content-header-user-data">
              <div className="content-header-user-image">
                <Avatar
                    src={post.userLite.userImageUrl}
                    aria-label="recipe"/>
              </div>
              <div className="content-header-user-meta">
                <div className="content-header-user-meta-name"> {post.userLite.userName}</div>
                <div
                    className="content-header-user-meta-time"> {getTimeText(post.createdAt, false)} ago
                </div>
              </div>
            </div>
            <div className="content-header-actions">
              <IconButton aria-label="add to favorites"
                          onClick={() => setShowComment(!showComment)}>
                <CommentIcon sx={{color: primaryColor}}/>
              </IconButton>
              <IconButton aria-label="share">
                <LocationOnIcon sx={{color: secondaryColor}}/>
              </IconButton>
            </div>
          </div>
          <Divider className="card-content-divider"/>
          <div className="card-content-sub-title">
            {getAnimalNeedLabel(post.animalNeed)} - {post.district}
          </div>
          <div className="card-content-description">
            {post.description}
          </div>
          <div className="card-content-additional-info-container">
            {showComment ? renderComments(post.comments) : null}
          </div>
        </CardContent>

      </Card>
  );

}