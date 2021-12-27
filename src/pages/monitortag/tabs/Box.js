import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Switch from '@mui/material/Switch';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import numeral from 'numeral'
import { useHistory } from "react-router-dom"
import { toast } from 'react-toastify';
import GroupIcon from '@mui/icons-material/Group';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import Carousel from 'react-material-ui-carousel'

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function Box({ data }) {
    const history = useHistory()
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    function renderMedia(item) {
        if (item.media_type == "IMAGE") {
            return <CardMedia
                component="img"
                height="300"
                sx={{ objectFit: 'cover', borderRadius: 2 }}
                image={item.media_type == "CAROUSEL_ALBUM" ? item.children?.data[0].media_url : item.media_url}
                alt="Paella dish"
            />
        }
        if (item.media_type == "VIDEO") {
            return <CardMedia
                component="video"
                sx={{ objectFit: 'cover', borderRadius: 2 }}
                autoPlay
                controls
                loop
                height="300"
                image={item.media_url}
                alt="Paella dish"
            />
        }
        return null
    }

    function renderCarousel(item) {
        return (
            <Carousel
                className='cr-album'
                navButtonsAlwaysVisible={true}
                navButtonsProps={{
                    style: {
                        backgroundColor: 'rgba(87, 87, 87, 0.4)'
                    }
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
                                    height="300"
                                    sx={{ objectFit: 'cover', borderRadius: 2 }}
                                    image={it2.media_url}
                                    alt="Paella dish"
                                />
                            </a>
                        )
                    }
                    if (it2.media_type == "VIDEO") {
                        return (
                            <a target="_blank" href={data.permalink}>
                                <CardMedia
                                    component="video"
                                    sx={{ objectFit: 'cover', borderRadius: 2 }}
                                    autoPlay
                                    controls
                                    loop
                                    height="300"
                                    image={it2.media_url}
                                    alt="Paella dish"
                                />
                            </a>
                        )
                    }
                })
                }
            </Carousel >
        )
    }

    return (
        <>
            <Card elevation={1}>
                <CardHeader
                    avatar={
                        <Avatar alt={data.username} src={data.username} />
                    }
                    action={
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
                            <GroupIcon sx={{ color: "gray", fontSize: 25 }} />
                            <Typography variant='h6' style={{ color: 'gray', marginTop: 3, marginLeft: 5 }}>{numeral(data.userInfo?.business_discovery?.followers_count).format('0,0')}</Typography>
                        </div>
                    }
                    title={<Typography variant='body' color="#010b40"><a style={{ color: '#010b40', fontSize: 14, fontWeight: 'bold' }} target="_blank" href={`https://www.instagram.com/${data.username}`}>{data.username}</a></Typography>}
                    subheader={`${new Date(data.timestamp).toLocaleDateString()}`}
                />
                <Divider />
                <div style={{ padding: '15px' }}>
                    {data.media_type == "CAROUSEL_ALBUM" ? renderCarousel(data) : <a target="_blank" href={data.permalink}>{renderMedia(data)}</a>}
                </div>
                {/* <Typography variant="h4" textAlign="center">
                    {new Date().toLocaleTimeString()}
                </Typography> */}
                <CardActions disableSpacing>
                    {!expanded ? (
                        <div style={{ display: 'flex', justifyContent: 'flex-start', marginLeft: 10, alignItems: 'center', flexGrow: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                                <ThumbUpIcon sx={{ color: "#b3b3b3", fontSize: 16 }} />
                                <Typography variant='h6' style={{ color: '#b3b3b3', marginTop: 3, marginLeft: 5 }}>{numeral(data.like_count ? data.like_count : 0).format('0,0')}</Typography>
                            </div>
                            <div style={{ width: 2, height: 20, backgroundColor: 'lightgrey' }} />
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: 10 }}>
                                <CommentIcon sx={{ color: "#b3b3b3", fontSize: 16 }} />
                                <Typography variant='h6' style={{ color: '#b3b3b3', marginTop: 3, marginLeft: 5 }}>{numeral(data.comments_count ? data.comments_count : 0).format('0,0')}</Typography>
                            </div>
                        </div>
                    ) : null}
                    <div style={{ display: 'flex', flexGrow: 1, justifyContent: 'flex-end' }}>
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </ExpandMore>
                    </div>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography>{data.caption}</Typography>
                    </CardContent>
                    <CardActions>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                                <ThumbUpIcon sx={{ color: "#b3b3b3", fontSize: 16 }} />
                                <Typography variant='h6' style={{ color: '#b3b3b3', marginTop: 3, marginLeft: 5 }}>{numeral(data.like_count ? data.like_count : 0).format('0,0')}</Typography>
                            </div>
                            <div style={{ width: 2, height: 20, backgroundColor: 'lightgrey' }} />
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: 10 }}>
                                <CommentIcon sx={{ color: "#b3b3b3", fontSize: 16 }} />
                                <Typography variant='h6' style={{ color: '#b3b3b3', marginTop: 3, marginLeft: 5 }}>{numeral(data.comments_count ? data.comments_count : 0).format('0,0')}</Typography>
                            </div>
                        </div>
                    </CardActions>
                </Collapse>
            </Card>
        </>
    );
}