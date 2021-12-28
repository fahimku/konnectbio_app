import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import * as hashActions from "../../../actions/hashtags";
import Loader from "../../../components/Loader/Loader";
import { toast } from "react-toastify";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

function HashtagsList({
  title,
  hashtags,
  getHashtags,
  createHashtag,
  deleteHash,
  next,
}) {
  const [hash, setHash] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [hashLoading, sethashLoading] = React.useState(false);

  React.useEffect(() => {
    getHashtags().then(() => {
      setLoading(false);
    });
  }, []);
  React.useEffect(() => {
    if (hashtags.length > 0) {
      next(false);
    }
  }, [hashtags]);
  const handleDelete = (chipToDelete) => () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#010b40",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes! Delete it",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteHash(chipToDelete.hashtag_id).then((res) => {
          toast.success(res.data.message);
          getHashtags();
        });
      }
    });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    var format = /[#\s]/;
    if (!format.test(hash)) {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to add this hashtag?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#010b40",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes!",
      }).then((result) => {
        if (result.isConfirmed) {
          sethashLoading(true);
          createHashtag(hash)
            .then(() => {
              sethashLoading(false);
              toast.success("Hashtag added successfully");
              getHashtags();
            })
            .catch((err) => {
              console.log(err.response, "err");
              sethashLoading(false);
              toast.error(err.response.data.message);
            });
          setHash("");
        }
      });
    }
  };

  function renderFormatError() {
    var format = /[#\s]/;
    if (format.test(hash)) {
      return <p style={{ color: "red" }}>you cannot write # or space</p>;
    }
    return null;
  }

  if (!loading) {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <h4 className="page-title">{title}</h4>
          <div className="brand_container_main">
            <Row>
              <div className="profile_box_main col-md-6 col-sm-6 col-lg-6 col-xl-4">
                <div className="brand-section dash_block_profile">
                  <div className="dash_content_profile">
                    <form onSubmit={handleAdd}>
                      <p
                        style={{
                          color: "gray",
                          borderBottom: "1px solid lightgray",
                          paddingBottom: 10,
                        }}
                      >
                        Note: You can add a maximum of 20 unique hashtags within
                        a 7 day period
                      </p>
                      <Row>
                        <Col md={12}>
                          <div class="mb-3">
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <label>Add Hashtag</label>
                              <p>{`(${hashtags.limit}/20)`}</p>
                            </div>
                            <div className="d-flex flex-row hashtag-box">
                              <span class="input-group-text">#</span>
                              <input
                                style={{
                                  borderTopRightRadius: 0,
                                  borderBottomRightRadius: 0,
                                  width: "85%",
                                }}
                                onChange={(e) => setHash(e.target.value)}
                                type="text"
                                name="name"
                                placeholder="Enter Hashtag"
                                class="form-control comment-field"
                                required=""
                                value={hash}
                              />
                              {hashLoading ? (
                                <Button
                                  style={{
                                    borderTopLeftRadius: 0,
                                    borderBottomLeftRadius: 0,
                                    width: "15%",
                                  }}
                                  variant="primary"
                                  className="btn-block"
                                >
                                  <Loader />
                                </Button>
                              ) : (
                                <Button
                                  style={{
                                    borderTopLeftRadius: 0,
                                    borderBottomLeftRadius: 0,
                                    width: "15%",
                                  }}
                                  variant="primary"
                                  type="submit"
                                  className="btn-block"
                                >
                                  Add
                                </Button>
                              )}
                            </div>
                            {renderFormatError()}
                          </div>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "flex-start",
                              flexWrap: "wrap",
                              listStyle: "none",
                              m: 0,
                            }}
                            component="ul"
                          >
                            {hashtags.message.map((data, i) => {
                              return (
                                <ListItem key={data.hashtag_id}>
                                  <Chip
                                    label={`#${data.hashtag}`}
                                    onDelete={handleDelete(data)}
                                  />
                                </ListItem>
                              );
                            })}
                          </Box>
                        </Col>
                      </Row>

                      {/* <Row>
                                                <Col md={5} xl={3}>
                                                    <Button
                                                        variant="primary"
                                                        type="submit"
                                                        className="btn-block mt-3"
                                                    >
                                                        Save
                                                    </Button>
                                                </Col>
                                            </Row> */}
                    </form>
                  </div>
                </div>
              </div>
            </Row>
          </div>
        </div>
      </React.Fragment>
    );
  } else {
    return <Loader size={30} />;
  }
}

function mapStateToProps({ hashtags }) {
  return { hashtags };
}

export default connect(mapStateToProps, hashActions)(HashtagsList);