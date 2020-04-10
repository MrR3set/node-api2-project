const express = require("express");

const router = express.Router();

const Posts = require("./db.js");

router.post("/",(req,res)=>{
    if(!(req.body.title) || !req.body.contents){
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }else{
        Posts.insert(req.body).then(postID=>{
            Posts.findById(postID.id).then(post=>{
                res.status(201).json(post)
            })
        }).catch(err=>{
            res.status(500).json({ error: "There was an error while saving the post to the database" })
        })
    }
})

router.post("/:id/comments", (req,res)=>{
    if(!(req.body)){
        res.status(400).json({ errorMessage: "Please provide text for the comment." })
    }else{  
        Posts.insertComment({...req.body,post_id:req.params.id}).then(comment=>{
            Posts.findCommentById(comment.id).then(comment=>
                res.status(201).json(comment)
                ).catch(err=>{
                    console.log(err);
                    res.status(500).json({ error: "There was an error while saving the comment to the database" })
                })
        }).catch(err=>{
            console.log(err);
            res.status(500).json({ message: "The post with the specified ID does not exist." })
        })
    }
})

router.get("/",(req,res)=>{
    Posts.find(req.query).then(post=>{
        post.length>=0?
        res.status(201).json({queryString:req.query, post})
        :res.status(500).json({ error: "The posts information could not be retrieved." })
    }).catch(err=>{
        console.log(err);
        res.status(500).json({ error: "The posts information could not be retrieved." })
    })
})

router.get("/:id",(req,res)=>{
    Posts.findById(req.params.id).then(post=>{
        post.length>0?res.status(200).json(post):res.status(404).json({ message: "The post with the specified ID does not exist." })
    }).catch(err=>{
        console.log(err);
        res.status(500).json({ error: "The post information could not be retrieved." })
    })
})

router.get("/:id/comments",(req,res)=>{
    Posts.findById(req.params.id).then(post=>{
        if(post.length>0){
            Posts.findPostComments(req.params.id).then(comments=>{
                comments.length>=0?res.status(201).json(comments)
                :res.status(500).json({errorMessage:"Error while retriving comments"});
            }).catch(err=>{
                console.log(err);
                res.status(500).json({ error: "The comments information could not be retrieved." })
            })
        }else{
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    }).catch(err=>{
        res.status(500).json({errorMessage:"Error while finding specific post"})
    })
})

router.delete("/:id",(req,res)=>{
    Posts.findById(req.params.id).then(post=>{
        if(post.length>0){
            Posts.remove(req.params.id).then(count=>{
                if(count)
                    res.status(201).json(post);
            }).catch(err=>{
                res.status(500).json({ error: "The post could not be removed" })
            })
        }else{
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    }).catch(err=>{
        res.status(500).json({errorMessage:"Error finding specific post"})
    })
})

router.put("/:id",(req,res)=>{
    if(!(req.body.title) || !req.body.contents){
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }else{
        Posts.update(req.params.id,req.body).then(count=>{
            if(count){
                Posts.findById(req.params.id).then(post=>{
                    res.status(200).json(post);
                }).catch(err=>{console.log})}
            else{
                res.status(404).json({message: "The post with the specified ID does not exist."}); 
            }
        }).catch(err=>{
            console.log(err);
            res.status(500).json({ error: "The post information could not be modified." })
        })
    }
})


module.exports = router;

