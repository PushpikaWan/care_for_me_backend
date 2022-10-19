import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";

import PostCard from "../post_card/post_card";
import './post_page.scss';

export default function PostPage() {
  return (
      <div className="post-page-main-container">
        <Card className="post-page-container">
          <CardContent>
            <PostCard/>
          </CardContent>
        </Card>
      </div>
  );
}