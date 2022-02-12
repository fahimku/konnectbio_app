import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Divider from "@mui/material/Divider";
import numeral from "numeral";
import { useHistory } from "react-router-dom";
import GroupIcon from "@mui/icons-material/Group";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import Carousel from "react-material-ui-carousel";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Box({ data }) {
  const history = useHistory();
  const [expanded, setExpanded] = React.useState(false);

  const [videoIcon, setVideoIcon] = React.useState(false);

  function Pauseplay(e, id) {
    e.preventDefault();

    var testvideo = document.getElementById(id);

    if (testvideo.paused) {
      testvideo.play();
      setVideoIcon(true);
    } else {
      testvideo.pause();
      setVideoIcon(false);
    }
  }
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  function renderMedia(item) {
    if (item.media_type == "IMAGE") {
      return (
        <CardMedia
          component="img"
          height="450"
          sx={{ objectFit: "cover", borderRadius: 2 }}
          image={
            item.media_type == "CAROUSEL_ALBUM"
              ? item.children?.data[0].media_url
              : item.media_url
          }
          alt="Paella dish"
        />
      );
    }
    if (item.media_type == "VIDEO") {
      return (
        <>
          <button
            onClick={(e) => Pauseplay(e, item._id)}
            className="btn-link btn-play"
          >
            {!videoIcon ? (
              <i class="fa fa-play" aria-hidden="true"></i>
            ) : (
              <i class="fa fa-pause" aria-hidden="true"></i>
            )}
          </button>
          <CardMedia
            component="video"
            sx={{ objectFit: "cover", borderRadius: 1 }}
            autoPlay={false}
            controls
            //loop
            height="450"
            image={item.media_url}
            id={item._id}
            alt="Paella dish"
          />
        </>
      );
    }
    return null;
  }

  function renderCarousel(item) {
    return (
      <Carousel
        className="cr-album"
        navButtonsAlwaysVisible={true}
        navButtonsProps={{
          style: {
            backgroundColor: "rgba(87, 87, 87, 0.4)",
          },
        }}
        indicators={false}
        swipe={true}
      >
        {item.children.data.map((it2, i) => {
          if (it2.media_type == "IMAGE") {
            return (
              <a target="_blank" href={data.permalink}>
                <CardMedia
                  component="img"
                  height="450"
                  sx={{ objectFit: "cover", borderRadius: 2 }}
                  image={it2.media_url}
                  alt="Paella dish"
                />
              </a>
            );
          }
          if (it2.media_type == "VIDEO") {
            return (
              <a target="_blank" href={data.permalink}>
                <CardMedia
                  component="video"
                  sx={{ objectFit: "cover", borderRadius: 2 }}
                  autoPlay={false}
                  controls
                  //  loop
                  height="450"
                  image={it2.media_url}
                  alt="Paella dish"
                />
              </a>
            );
          }
        })}
      </Carousel>
    );
  }

  return (
    <>
      <Card elevation={1}>
        <CardHeader
          avatar={
            <Avatar
              alt={data.username}
              src={data.userInfo?.business_discovery?.profile_picture_url}
            />
          }
          action={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 5,
              }}
            >
              <GroupIcon sx={{ color: "gray", fontSize: 25 }} />
              <Typography
                variant="h6"
                style={{ color: "gray", marginTop: 3, marginLeft: 5 }}
              >
                {numeral(
                  data.userInfo?.business_discovery?.followers_count
                ).format("0,0")}
              </Typography>
            </div>
          }
          title={
            <Typography variant="body" color="#010b40">
              <a
                style={{ color: "#010b40", fontSize: 14, fontWeight: "bold" }}
                target="_blank"
                href={`https://www.instagram.com/${data.username}`}
              >
                {data.username}
              </a>
            </Typography>
          }
          subheader={`#${data.hashtag}`}
        />
        <Divider />
        <div className="media-box-post" style={{ padding: "15px" }}>
          {data.media_type == "CAROUSEL_ALBUM" ? (
            renderCarousel(data)
          ) : (
            <a target="_blank" href={data.permalink}>
              {renderMedia(data)}
            </a>
          )}
        </div>
        {/* <Typography variant="h4" textAlign="center">
                    {new Date().toLocaleTimeString()}
                </Typography> */}
        <CardActions disableSpacing>
          {!expanded ? (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                // marginLeft: 10,
                alignItems: "center",
                flexGrow: 1,
              }}
            >
              {/* <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 10,
                }}
              >
                <ThumbUpIcon sx={{ color: "#b3b3b3", fontSize: 16 }} />
                <Typography
                  variant="h6"
                  style={{ color: "#b3b3b3", marginTop: 3, marginLeft: 5 }}
                >
                  {numeral(data.like_count ? data.like_count : 0).format("0,0")}
                </Typography>
              </div>
              <div
                style={{ width: 2, height: 20, backgroundColor: "lightgrey" }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                <CommentIcon sx={{ color: "#b3b3b3", fontSize: 16 }} />
                <Typography
                  variant="h6"
                  style={{ color: "#b3b3b3", marginTop: 3, marginLeft: 5 }}
                >
                  {numeral(
                    data.comments_count ? data.comments_count : 0
                  ).format("0,0")}
                </Typography>
              </div> */}
              <Typography
                variant="body"
                sx={{ fontSize: "12px", marginLeft: "15px" }}
                color="gray"
                textAlign="center"
              >
                {new Date(data.timestamp).toDateString()}
              </Typography>
            </div>
          ) : null}
          {/* <div
            style={{ display: "flex", flexGrow: 1, justifyContent: "flex-end" }}
          >
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </div> */}
        </CardActions>
        {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography>{data.caption}</Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: "space-between" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 10,
                }}
              >
                <ThumbUpIcon sx={{ color: "#b3b3b3", fontSize: 16 }} />
                <Typography
                  variant="h6"
                  style={{ color: "#b3b3b3", marginTop: 3, marginLeft: 5 }}
                >
                  {numeral(data.like_count ? data.like_count : 0).format("0,0")}
                </Typography>
              </div>
              <div
                style={{ width: 2, height: 20, backgroundColor: "lightgrey" }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                <CommentIcon sx={{ color: "#b3b3b3", fontSize: 16 }} />
                <Typography
                  variant="h6"
                  style={{ color: "#b3b3b3", marginTop: 3, marginLeft: 5 }}
                >
                  {numeral(
                    data.comments_count ? data.comments_count : 0
                  ).format("0,0")}
                </Typography>
              </div>
            </div>
            <Typography
              variant="body"
              sx={{ fontSize: "14px", marginRight: "15px" }}
              color="gray"
              textAlign="right"
            >
              {new Date(data.timestamp).toDateString()}
            </Typography>
          </CardActions>
        </Collapse> */}
      </Card>
    </>
  );
}
