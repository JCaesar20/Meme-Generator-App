const express = require('express');
const User = require('../models/user.js');
const auth = require('../middleware/auth');
const router = new express.Router();

router.post('/signup', async (req, res) => {
    
    try {
        const user = new User(req.body);
        await user.save()
        res.status(200).redirect('/')
    } catch (e) {
        const errors = e.keyValue;
        console.log(e)
        const reason = Object.keys(errors)[0]; 
        console.log(reason)
        if(e.code === 11000 && reason === 'username'){
            res.status(400).send({error:'username is already taken'})
        }else if (e.code === 11000 && reason === 'Email'){
            res.status(400).send({error:'email is already taken'})
        }else{
            res.status(400).send(e)
        }
    }
})


router.post('/login', async (req, res) => {
    try {
        const user = await User.findByCerdenalties(req.body.username, req.body.password);
        const token = await user.generateTokens();
        res.cookie('auth_token', token)
        res.redirect('/memes')
    } catch (e) {
        console.log(e)
        res.status(400).send({error: 'Incorrect username or password'})
    }
})


router.post('/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token)
        await req.user.save()
        res.redirect('/')
    } catch (e) {
        res.status(500).send(e)
    }
})

//for Postman
/* router.post('/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send(e)
    }
}) */

 router.get('/user/me', auth, async (req, res) => {
    try {
        await req.user.populate('memes').execPopulate()
        const data = req.user.memes
        res.render('home.hbs',{username:req.user.username,data})
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router