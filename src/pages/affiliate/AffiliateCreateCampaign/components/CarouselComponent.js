import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { NavLink } from "react-router-dom";
import Post from "../../../../images/Post2.jpg";

class CarouselComponent extends React.Component {
  state = {
    username: this.props.username,
  };

  render() {
    const responsive = {
      superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 8,
      },
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4,
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 4,
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 4,
      },
    };

    return (
      <React.Fragment>
        {this.props.allCategory.length === 0 ? null : (
          <Carousel
            responsive={responsive}
            autoPlay={false}
            arrows={true}
            slidesToSlide={2}
            customTransition="transform 600ms ease-in-out"
            transitionDuration="600"
            partialVisible={true}
            className="main-carousel py-3 mb-2"
            itemClass="carousel-item-padding-40-px"
          >
            <div className="carousel-items">
              <NavLink
                to={"/"}
                // to={`/${props.username}`}
                //             onClick={() => categoryFilter("")}
              >
                <img
                  src={Post}
                  width="56px"
                  height="56px"
                  alt=""
                  className="circles"
                />
                <span>My Posts</span>
              </NavLink>
            </div>

            {this.props.allCategory.map((category, i) => (
              <div className="carousel-items" key={i}>
                {/* <NavLink
                  to=""
                  onClick={() => this.categoryFilter}
                  key={i}
                  // to={`/${props.username}/post/${category.category_id}`}
                > */}
                <button
                  onClick={() => {
                    this.props.categoryFilter(category.category_id);
                  }}
                  className="btn-link"
                >
                  <img
                    src={
                      category.image_url === ""
                        ? "https://via.placeholder.com/56"
                        : category.image_url
                    }
                    width="65px"
                    height="65px"
                    alt=""
                    className="circles"
                  />
                  <span>{category.category_name}</span>
                </button>
              </div>
            ))}
          </Carousel>
        )}
      </React.Fragment>
    );
  }
}
export default CarouselComponent;
