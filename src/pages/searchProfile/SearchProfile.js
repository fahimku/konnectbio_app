import React, { useState } from 'react'
import * as profileActions from "../../actions/searchProfile"
import { connect } from 'react-redux'
import { Row, Button, Col } from "react-bootstrap"
import Select from "react-select";
import { Card, CardContent, Paper } from "@mui/material"
import moment from "moment";
import { DatePicker } from "antd";
import Loader from '../../components/Loader/Loader'
import { Typography } from '@mui/material'
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import Box from "./Box"

const { RangePicker } = DatePicker;
const dateFormat = "YYYY-MM-DD";

function SearchProfile({ searchProfileAc, profile, filterProfileMedia }) {

    const [loading, setLoading] = useState(false)
    const [userName, setUserName] = useState("")
    const [error, setError] = useState(false)

    const [searchLoading, setSearchLoading] = useState(false);
    const [clearLoading, setClearLoading] = useState(false);
    const [sortBy, setSortBy] = useState({
        value: "timestamp", label: "DATE"
    });
    const [orderBy, setOrderBy] = useState({ value: "desc", label: "DESC" });
    const fromDate = moment().subtract(4, 'year').format("YYYY-MM-DD");
    const toDate = moment(new Date()).format("YYYY-MM-DD");
    const [startDate, setStartDate] = useState(fromDate);
    const [endDate, setEndDate] = useState(toDate);

    const searchProfile = () => {
        setLoading(true)
        searchProfileAc(userName)
            .then(() => {
                setError(false)
                setLoading(false)
            })
            .catch(() => {
                setError(true)
                setLoading(false)
            })
    }

    const style = {
        control: (base) => ({
            ...base,
            height: "44px",
            boxShadow: "none",
            "&:hover": {
                // border: "1px solid black",
            },
        }),
    };

    const sortByOptions = [
        { value: "like_count", label: "LIKE" },
        { value: "comments_count", label: "COMMENT" },
        { value: "timestamp", label: "DATE" },
    ];
    const sortOrderOptions = [
        { value: "asc", label: "ASC" },
        { value: "desc", label: "DESC" },
    ];

    const dateRangePickerChanger = (value, dataString) => {
        const startDate = dataString[0];
        const endDate = dataString[1];
        setStartDate(startDate);
        setEndDate(endDate);
    };

    const filterProfileFunc = (e) => {
        filterProfileMedia(false)
    };


    function onSubmitData(e) {
        e.preventDefault()
        filterProfileMedia(
            {
                from_date: startDate.toString(),
                to_date: endDate.toString(),
                sort: sortBy.value,
                order_by: orderBy.value
            }
        )
    }

    function renderData() {
        if (!error) {
            if (profile.username) {
                return (
                    <>
                        <Card sx={{ marginTop: 2 }}>
                            <CardContent>
                                <Row>
                                    <Col xl={2} lg={3} sm={12} className='d-flex flex-column justify-content-center align-items-center'>
                                        <Card elevation={3} sx={{ maxWidth: 200 }}>
                                            <img
                                                style={{ width: 200 }}
                                                src={profile.profile_picture_url} />
                                        </Card>
                                    </Col>
                                    <Col xl={10} lg={9} sm={12} className='d-flex flex-column justify-content-center'>
                                        <Typography gutterBottom variant="h6" sx={{ color: 'gray', marginTop: 1 }}><a target="_blank" href={`https://www.instagram.com/${profile.username}/`} style={{ color: 'gray' }}>{profile.username}</a></Typography>
                                        {/* <Paper variant='outlined'> */}
                                        <div style={{ display: 'flex' }}>
                                            <Typography variant='body' sx={{ backgroundColor: '#e8e8e8', padding: 1, borderRadius: 1, marginRight: 2 }}>{profile.followers_count} Followers</Typography>
                                            <Typography variant='body' sx={{ backgroundColor: '#e8e8e8', padding: 1, borderRadius: 1, marginRight: 2 }}>{profile.follows_count} Following</Typography>
                                            <Typography variant='body' sx={{ backgroundColor: '#e8e8e8', padding: 1, borderRadius: 1, marginRight: 2 }}>{profile.media_count} Posts</Typography>
                                        </div>
                                        <div className='mt-2'>
                                            <Typography variant='body' component="div" color="gray">Biography: </Typography>
                                            <Typography variant="body" color="gray">{profile.biography}</Typography>
                                        </div>
                                        <div className='mt-2'>
                                            <Typography variant='body' component="div" color="gray">Website: </Typography>
                                            <Typography variant="body" sx={{ color: 'gray', marginTop: 1, textAlign: 'center' }}><a target="_blank" href={profile.website}>{profile.website?.slice(0, 40)}...</a></Typography>
                                        </div>
                                        {/* </Paper> */}
                                    </Col>
                                </Row>
                            </CardContent>
                        </Card>
                        <Row className="post-analytics-tab mb-4 mt-3">
                            <Col xs={12} xl={12} md={12}>
                                <form onSubmit={onSubmitData}>
                                    <Row>
                                        {/* <Col xs={12} xl={2} md={6}>
                                            <p>Select Start Date / End Date</p>
                                            <RangePicker
                                                key={4}
                                                value={
                                                    startDate && endDate
                                                        ? [moment(startDate), moment(endDate)]
                                                        : []
                                                }
                                                allowClear={false}
                                                ranges={{
                                                    Today: [moment(), moment()],
                                                    Tomorrow: [
                                                        moment().add(1, "days"),
                                                        moment().add(1, "days"),
                                                    ],
                                                    Yesterday: [
                                                        moment().subtract(1, "days"),
                                                        moment().subtract(1, "days"),
                                                    ],
                                                    "This Month": [
                                                        moment().startOf("month"),
                                                        moment().endOf("month"),
                                                    ],
                                                    "Last Month": [
                                                        moment().subtract(1, "month").startOf("month"),
                                                        moment().subtract(1, "month").endOf("month"),
                                                    ],
                                                }}
                                                format={dateFormat}
                                                onChange={dateRangePickerChanger}
                                            />
                                        </Col> */}
                                        <Col xs={12} xl={2} md={6}>
                                            <p>Sort By</p>
                                            <Select
                                                value={sortBy}
                                                name="sort"
                                                className="selectCustomization"
                                                options={sortByOptions}
                                                onChange={(e) => {
                                                    setSortBy(e);
                                                }}
                                                placeholder="Sort By"
                                                styles={style}
                                            />
                                        </Col>
                                        <Col xs={12} xl={2} md={6}>
                                            <p>Order By</p>
                                            <Select
                                                value={orderBy}
                                                name="order"
                                                className="selectCustomization"
                                                options={sortOrderOptions}
                                                onChange={(e) => {
                                                    setOrderBy(e);
                                                }}
                                                placeholder="Order By"
                                                styles={style}
                                            />
                                        </Col>

                                        <Col className="d-flex align-items-end" xs={12} xl={2} md={6}>
                                            {searchLoading ? (
                                                <Button
                                                    style={{ height: 44 }}
                                                    type="button"
                                                    variant="primary"
                                                    className="fltr-hpr"
                                                >
                                                    <Loader />
                                                </Button>
                                            ) : (
                                                <Button
                                                    style={{ height: 44 }}
                                                    type="submit"
                                                    variant="primary"
                                                    className="fltr-hpr"
                                                >
                                                    Search
                                                </Button>
                                            )}
                                            {clearLoading ? (
                                                <Button style={{ height: 44 }} variant="gray" className="fltr-hpr btn-primary">
                                                    <Loader />
                                                </Button>
                                            ) : (
                                                <Button
                                                    style={{ height: 44 }}
                                                    onClick={filterProfileFunc}
                                                    variant="gray"
                                                    className="fltr-hpr btn-primary"
                                                >
                                                    Reset
                                                </Button>
                                            )}
                                        </Col>
                                    </Row>
                                </form>
                            </Col>
                        </Row>
                        <hr />
                        <div className='mt-3'>
                            <ResponsiveMasonry
                                columnsCountBreakPoints={{ 350: 1, 700: 2, 1100: 3, 1500: 4 }}
                            >
                                <Masonry gutter="15px">
                                    {
                                        profile.media?.data.map((item) => {
                                            return (
                                                <Box data={item} />
                                            )
                                        })
                                    }
                                </Masonry>
                            </ResponsiveMasonry>
                        </div>
                    </>
                )
            }
            return null
        }
        else {
            return (
                <div style={{ height: 300, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <h1 style={{ textAlign: 'center' }}>No result Found</h1>
                </div>
            )
        }
    }

    return (
        <div className="container-fluid">
            <div className="d-flex flex-row hashtag-box mt-3">
                <span class="input-group-text"><i class="fa fa-user" aria-hidden="true"></i></span>
                <input
                    style={{
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                        width: "85%",
                    }}
                    onChange={(e) => setUserName(e.target.value)}
                    type="text"
                    name="name"
                    placeholder="Enter instagram name"
                    class="form-control comment-field"
                    required=""
                    value={userName}
                />
                {loading ? (
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
                        onClick={searchProfile}
                    >
                        Search
                    </Button>
                )}
            </div>
            {!loading ? renderData() : (
                <div className='mt-5'>
                    <Loader size={30} />
                </div>
            )}
        </div>
    )
}

function mapStateToProps({ profile }) {
    return { profile }
}
export default connect(mapStateToProps, profileActions)(SearchProfile)