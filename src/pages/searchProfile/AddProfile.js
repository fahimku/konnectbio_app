import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import * as profileActions from "../../actions/searchProfile";
import Loader from "../../components/Loader/Loader";
import { toast } from "react-toastify";

const ListItem = styled("li")(({ theme }) => ({
    margin: theme.spacing(0.5),
}));

function HashtagsList({
    title,
    profiles,
    getProfiles,
    createProfile,
    deleteProfile,
    searchProfileAc,
    next,
}) {
    const [hash, setHash] = React.useState("");
    const [loading, setLoading] = React.useState(true);
    const [hashLoading, sethashLoading] = React.useState(false);
    const [error, setError] = React.useState(false);

    React.useEffect(() => {
        getProfiles().then(() => {
            setLoading(false);
        });
    }, []);

    React.useEffect(() => {
        if (profiles.length > 0) {
            next(false);
        }
    }, [profiles]);

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
                deleteProfile(chipToDelete._id).then((res) => {
                    toast.success('Profile Deleted Successfully');
                   
                });
            }
        });
    };

    const handleAdd = (e) => {
        e.preventDefault();
        var format = /[#\s]/;
        if (hash.length > 0) {
            setError(false)
            if (!format.test(hash)) {
                Swal.fire({
                    title: "Are you sure?",
                    text: "You want to add this profile?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#010b40",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes!",
                }).then((result) => {
                    if (result.isConfirmed) {
                        searchProfileAc(hash, true).then((res) => {
                            sethashLoading(true);
                            createProfile(hash)
                                .then(() => {
                                    sethashLoading(false);
                                    toast.success("Profile added successfully");
                                    getProfiles();
                                })
                                .catch((err) => {
                                    console.log(err.response, "err");
                                    sethashLoading(false);
                                    toast.error(err.response.data.message);
                                });
                            setHash("");
                        }).catch((err) => {
                            toast.error("This Profile is not exists !");
                        })
                    }
                });
            }
        } else {
            setError(true);
        }
    };

    function renderFormatError() {
        var format = /[#\s]/;
        if (format.test(hash)) {
            return  <span class="help-block text-danger">you cannot write # or space</span>;
        }

        else if (hash.length === 0 && error) {
            return <span class="help-block text-danger">Please Enter Hashtag.</span>;
          }
        return null;
    }

    if (!loading) {
        return (
            <React.Fragment>
                <div className="container-fluid">
                    <h4 className="page-title">Add Profile</h4>
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
                                                Note: You can add a maximum of 3 unique profiles within
                                                a 7 day period
                                            </p>
                                            <Row>
                                                <Col md={12}>
                                                    <div className="mb-3">
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                justifyContent: "space-between",
                                                            }}
                                                        >
                                                            <label>Add Profile</label>
                                                            <p>{`(${profiles.Data.length}/${profiles.profile_limit})`}</p>
                                                        </div>
                                                        <div className="d-flex flex-row hashtag-box">
                                                            <span className="input-group-text">@</span>
                                                            <input
                                                                style={{
                                                                    borderTopRightRadius: 0,
                                                                    borderBottomRightRadius: 0,
                                                                    width: "85%",
                                                                }}
                                                                onChange={(e) => setHash(e.target.value)}
                                                                type="text"
                                                                name="name"
                                                                placeholder="Enter Profile"
                                                                className="form-control comment-field"
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
                                                        {profiles.Data.map((data, i) => {
                                                            return (
                                                                <ListItem key={i}>
                                                                    <Chip
                                                                        label={`@${data.profile_name}`}
                                                                        onDelete={handleDelete(data)}
                                                                    />
                                                                </ListItem>
                                                            );
                                                        })}
                                                    </Box>
                                                </Col>
                                            </Row>
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
function mapStateToProps({ profiles }) {
    return { profiles };
}
export default connect(mapStateToProps, profileActions)(HashtagsList);