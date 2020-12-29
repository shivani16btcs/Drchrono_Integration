const express = require('express');
const router = express.Router();
const crypto=require('crypto');

router.get('/webhook', async (req,res)=>{
    console.log(req.query.msg+"     @@@   ");
    secret_key=req.query.msg;

    const token = crypto.createHmac('sha256', 'testweb').update(secret_key).digest('hex'); 
    console.log(token);
    return res.json({
        'secret_token': token
    })
});
router.post('/webhook', async (req,res)=>{
    console.log(req.body);
    
    });

    
module.exports = router;


