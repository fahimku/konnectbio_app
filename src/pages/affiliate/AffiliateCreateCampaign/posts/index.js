import PostItem from "./item";
const posts = ({ data, postClick, username,userId}) => {
   return (
    <div className={`container`}>
      <div className="row post-grid">
        {data.map((item, i) => (
           <PostItem
            item={item}
            userId={userId}
            i={i}
            postClick={postClick}
            username={username}
            key={i}
          ></PostItem>
        ))}
      </div>
  
    </div>
  );
};

export default posts;
