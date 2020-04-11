const express = require('express')
const Meme = require('../models/meme.js');
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const auth = require('../middleware/auth')
const hbs = require('hbs')
const { getMemes } = require('../../utils');
const router = new express.Router();

router.get('/', async (req, res) => {
    try {
        const token = req.cookies['auth_token']
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        if (!user || !decoded) {
            return res.render('landpage.hbs')
        }
        res.redirect('/memes')
    } catch (e) {
        return res.render('landpage.hbs')
    }
})

router.get('/memes', auth, async (req, res) => {
    try {
      
        var data = await getMemes();
        if (req.query.q) {
            data = data.filter(curr => curr.name.toLowerCase().includes(req.query.q.toLowerCase()))
            if (data.length === 0) {
                throw {error: 'not found'}
            }
        }
        res.render('home.hbs', { username: req.user.username, data })
    } catch (e) {
        res.render('404page.hbs', { username: req.user.username,FONT_AWESOME: process.env.FONT_AWESOME })
    }
})




router.get('/memes/:id', auth, async (req, res) => {
    try {
        const data = await getMemes();
        const data2 = data.find(curr => curr.id === req.params.id);
        if (!data2) {
           throw {error: 'not found'}
        }
        res.render('memes.hbs', { username: req.user.username, data2 })
    } catch (e) {

        res.render('404page.hbs', { username: req.user.username, FONT_AWESOME: process.env.FONT_AWESOME})
    }
})




router.post('/memes/:id', auth, async (req, res) => {

    try {
        const data = await getMemes();
        const data2 = data.find(curr => curr.id === req.params.id);
        await req.user.populate('memes').execPopulate()
        if (req.user.memes.find(curr => curr.id === req.params.id)) {
            throw { error: 'It is already been added' }
        }
        const meme = new Meme({
            id: data2.id,
            url: data2.url,
            owner: req.user._id
        });

        await meme.save()
        res.status(201).send(meme)

    } catch (e) {
        res.send(e)
    }
})

module.exports = router