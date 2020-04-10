import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Axios from "axios";

const useStyles = makeStyles(theme => ({
  root: {
    width: "15%",
    margin:"5% 1%"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto"
  },
  avatar: {
    backgroundColor: red[500]
  },
  showComments: {
    display: "flex",
    justifyContent: "space-between",
    cursor: "pointer",
    userSelect: "none"
  }
}));

export default function Post(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [Post,setPost] = useState({
    title:"",
    contents:""
    })
  const [Comments,setComments] = useState([])
  const [Comment,setComment] = useState({text:""})

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleEdit = () => {
    console.log("editing");
    props.handleEdit(props.post.id,Post);
  };
  Axios.get(`http://localhost:5000/api/posts/${props.post.id}/comments`).then(res=>{
      setComments(res.data);
  })

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={<Avatar aria-label="recipe" className={classes.avatar} />}
        title={props.post.contents}
        subheader={props.post.updated_at}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.post.title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing className={classes.showComments}>
        <CardActions>
          <IconButton className={clsx(classes.expand, { [classes.expandOpen]: expanded })} onClick={() => {props.handleDelete(props.post.id)}} aria-expanded={expanded} aria-label="show more" >
            <DeleteIcon />
          </IconButton>
          <IconButton className={clsx(classes.expand, { [classes.expandOpen]: expanded })} onClick={handleEdit} aria-expanded={expanded} aria-label="show more" >
            <EditIcon />
          </IconButton>
        </CardActions>

        <Typography variant="body2" color="textSecondary" component="p" onClick={handleExpandClick}>
          Show Comments
          <IconButton className={clsx(classes.expand, { [classes.expandOpen]: expanded })} aria-expanded={expanded} aria-label="show more" />
        </Typography>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {Comments.map(comment=>{
              return <Typography variatn="body2">{comment.text}</Typography>
          })}
        </CardContent>
      </Collapse>
    </Card>
  );
}
