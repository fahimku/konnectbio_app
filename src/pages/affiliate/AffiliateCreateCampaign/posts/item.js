import {Link} from "react-router-dom";
const postItem = ({item, i, postClick, username, userId}) => {
  return (
    <div
      className="col col-4 post-image"
      onMouseDown={(e) => {
        if (e.nativeEvent.button === 1) {
          postClick(
            item.post_id,
            username,
            item.media_url,
            item.media_type,
            item.caption,
            item.timestamp,
            userId
          );
        }
      }}
      onClick={(ev) => {
        postClick(
          item.post_id,
          username,
          item.media_url,
          item.media_type,
          item.caption,
          item.timestamp,
          userId
        );
      }}
      key={i}
    >
      <div className="image-box">
        <Link
          to={{
            pathname: item.redirected_url,
          }}
          target="_blank"
        >
          {item.media_type === "VIDEO" ? (
            <video
              id={`post-video-${item.post_id}`}
              autoPlay
              controls
              controlsList="nodownload"
            >
              <source src={item.media_url} type="video/mp4"></source>
            </video>
          ) : (
            <img src={item.media_url} alt="" className="rounded" />
          )}
        </Link>
      </div>
    </div>
  );
};
export default postItem;