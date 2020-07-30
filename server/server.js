const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config/config').get(process.env.NODE_ENV);
const {auth} = require('./middleware/auth')
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE)
const {User} = require('./models/user')
const {Movie} = require('./models/movie')

app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static('client/build'))

//get//
app.get('/api/auth',auth,(req,res)=>{
    res.json({
        isAuth:true,
        id:req.user._id,
        email:req.user.email,
        name:req.user.name,
        lastname:req.user.lastname
    })
})

app.get('/api/logout',auth,(req,res)=>{
    req.user.deleteToken(req.token,(err,user)=>{
        if(err) return res.status(400).send(err)
        res.sendStatus(200)
    })
})


app.get('/api/getMovie',(req,res)=>{
    let id = req.query.id;
    Movie.findById(id,(err,doc)=>{
        if(err) return res.status(400).send(err);
        res.send(doc)
    })
})


app.get('/api/movies',(req,res)=>{
    let skip = parseInt(req.query.skip)
    let limit = parseInt(req.query.limit);
    let order = req.query.order;
    Movie.find().skip(skip).sort({_id:order}).limit(limit).exec((err,doc)=>{
        if(err) return res.status(400).send(err);
        res.send(doc)
    })
})

app.get('/api/getReviewer',(req,res)=>{
    let id = req.query.id
    User.findById(id,(err,doc)=>{
        if(err) return res.status(400).send(err);
        res.json({
            name:doc.name,
            lastname:doc.lastname
        })
    })
})  

app.get('/api/getUsers',(req,res)=>{
    User.find({},(err,users)=>{
        if(err) return res.status(400).send(err)
        res.status(200).send(users)
    })
})


app.get('/api/user_posts',(req,res)=>{
    Movie.find({ownerId:req.query.user}).exec((err,doc)=>{
        if(err) return res.status(400).send(err)
        res.send(doc)
    })
})
//post//
app.post('/api/movie',(req,res)=>{
    const movie = new Movie(req.body)
    movie.save((err,doc)=>{
        if(err) return res.status(400).send(err)
        res.status(200).json({
            post:true,
            movieId: doc._id
        })
    })
})

app.post('/api/register',(req,res)=>{
    const user = new User(req.body)
    user.save((err,doc)=>{
        if(err) return res.json({success:false})
        res.status(200).json({
            success:true,
            user:doc
        })
    })
})

app.post('/api/login',(req,res)=>{
    User.findOne({'email':req.body.email},(err,user)=>{
        if(!user) return res.json({isAuth:false,message:'wrong credentials'})
        user.checkPassword(req.body.password,(err,isMatch)=>{
            if(!isMatch) return res.json({
                isAuth:false,
                message:'wrong password'
            })
            user.generateToken((err,user)=>{
                if(err) return res.status(400).send(err)
                res.cookie('auth',user.token).send({
                    isAuth:true,
                    id:user._id,
                    email:user.email
                })
            })
        })
    })
})

//update//
app.post('/api/movieUpdate',(req,res)=>{
    Movie.findByIdAndUpdate(req.body._id,req.body,{new:true},(err,doc)=>{
        if(err) return res.status(400).send(err)
        res.json({
            success:true,
            doc
        })
    })
})

//delete//

app.delete('/api/deleteMovie',(req,res)=>{
    let id = req.query.id
    Movie.findByIdAndRemove(id,(err,doc)=>{
        if(err) return res.status(400).send(err)
        res.json(true)
    })
})

if(process.env.NODE_ENV === 'production'){
    const path =require('path')
    app.get('/*',(req,res)=>{
        res.sendfile(path.resolve(__dirname,'../client','build','index.html'))
    })
}

const port = process.env.PORT || 3001

app.listen(port,()=>{
    console.log(`server running`)
})