const { json } = require("express")
const express = require("express")
const posts = require("./data/post")
const comments = require("./data/comment")

const app = express()

app.use(express.json())

//GET ALL posts
app.get("/api/post", function (req, resp) {
    resp.send(posts)
})

//CREATE new post
app.post("/api/post", function (req, resp) {
    let newPost = {
        id: Math.floor(Math.random() * 100),
        network: req.body.network,
        title: req.body.title,
        user: req.body.user,
        likeCount: req.body.likeCount,
        createdAt: req.body.createdAt
    }

    posts.push(newPost)

    resp.status(201).json(newPost)
})

//GET by id
app.get("/api/post/:id", function (req, resp) {
    let id = req.params.id
    let post = posts.find(c => c.id == id)

    if (!post) {
        resp.status(400).json({ error: 'ID is missing or empty' });
    }
    else {
        resp.send(post)
    }
})

//GET COMMENTS by post id
app.get("/api/post/:id/comment", function (req, resp) {
    let idpost = req.params.id
    let comment = comments.filter(c => c.postId == idpost)
    resp.send(comment)
})

//GET POST ID by comments
app.get("/api/comment/:username", function (req, resp) {
    const username = req.params.username;
    const comment = comments.filter(c => c.username == username)
    resp.send(comment)
})

//EDIT POST
app.put("/api/post/:id", function (req, resp) {

    let id = req.params.id
    let postData = posts.find(c => c.id == id)
    postData.title = req.body.title
    resp.send(postData)

})

//DELETE POST
app.delete("/api/post/:id", function (req, resp) {
    let id = req.params.id
    let postdata = posts.filter(c => c.id != id)
    resp.send(postdata)

})


app.listen(8080)