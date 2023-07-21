const express = require('express');
const authentification = require('../middlewares/authentification')
const USER = require('../models/modelusers');
const router = new express.Router();

//post

router.post('/user/singin', async (req, res) => {
    try{
        req.body.name
    }catch(e){
        res.status(400).send(e)
    }
})

router.post('/user/login', async (req, res) => {
    try {
        const user = await USER.findUser(req.body.email, req.body.password);
        const authToken = await user.generateAuthToken();
        res.send({user, authToken});
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/user/logout', authentification, async (req, res) => {
    try {
        req.user.authTokens = req.user.authTokens.filter((authToken) => {
            return authToken.authToken !== req.authToken 
        })
        
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send(e)
    }
});

//get

router.get('/user/login', (req, res) => {
    res.render('login.handlebars', { title: "Sync - Log In" })
})

router.get('/user/signin', (req, res) => {
    res.render('signin.handlebars', { title: "Sync - Sign In" })
})

router.get('/users', authentification, async (req, res, next) => {
    try {
        const users = await USER.find({});
        res.send(users);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.get('/users/me', authentification, async (req, res, next) => {
    res.send(req.user)
});

module.exports = router