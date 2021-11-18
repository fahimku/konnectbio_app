import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import * as postAct from "../../../../actions/posts"
import InfiniteScroll from 'react-infinite-scroller';

function PostGallery({ getPosts, posts }) {
    useEffect(() => {
        getPosts(1)
    }, [])
    return (
        <>
            {posts.data.length>0?(
                <div 
                className="post-box no-gutters">
                <InfiniteScroll
                pageStart={0}
                className="row"
                loadMore={()=>getPosts(posts.next?.page)}
                hasMore={(posts.next?.page)?true:false}
                loader={
                    <div className="col col-12 image-post-box">
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 5 }}>
                            <i
                            className="la la-spinner la-spin"
                            style={{ fontSize: 25 }}
                            />
                        </div>
                    </div>
                }
                useWindow={false}
                        >
                {posts.data.map((item,i) => (
                        <div className="col col-4 image-post-box" key={i}>
                            <div
                                onClick={() => this.selectPost(item.post_id)}
                                className="mobile_box_inr link"
                            >
                                {item.media_type === "VIDEO" ? (
                                    <video
                                        id={`post-video-${item.post_id}`}
                                        autoPlay
                                        controls
                                        controlsList="nodownload"
                                    >
                                        <source
                                            src={item.media_url}
                                            type="video/mp4"
                                        ></source>
                                    </video>
                                ) : (
                                    <img
                                        src={item.media_url}
                                        alt="post-img"
                                        className="post-image"
                                    />
                                )}
                            </div>
                        </div>
                ))}
            </InfiniteScroll>
            </div>
            ):(
                <h4>Not Found</h4>
            )}
        </>
    )
}

function mapStateToProps({ posts }) {
    return { posts }
}

export default connect(mapStateToProps, postAct)(PostGallery)
