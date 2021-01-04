const express = require("express");
const axios = require('axios');
const Token = require("../models/Token");

const router = express.Router();

router.get("/redirect", (req, res) => {
  redirectURL = req.query.redirect_uri || "https://a5430cc16612.ngrok.io/token";
//console.log("redirectURL>>", redirectURL);
  const redirectTo = `https://drchrono.com/o/authorize/?redirect_uri=${encodeURI(
    redirectURL
  )}&response_type=code&client_id=${encodeURI(
    "AePaxoRUYcWJAgXd0EkBJ5AdOoz5f2qLUnb4dXAq"
  )}`;
  res.redirect(redirectTo);
});


router.get("/token", (req, res) => {
  const code = req.query.code;
  const query = req.query;
  // console.log("query>>", query);

  var postData = { 
    code:query.code,
    grant_type: "authorization_code",
    redirect_uri: "https://a5430cc16612.ngrok.io/token",
    client_id: "AePaxoRUYcWJAgXd0EkBJ5AdOoz5f2qLUnb4dXAq",
    client_secret:
      "HIy5nZ1BTFtNPZpGVDCczknq0YwQGrTLdFUIpobfRY8LNvDNi4Iattw9md7e3MTweZp0Prgli9R9UZqCTMQ2Uh3f2ME6SQywI6GQzU5HXEAR5b6Hz5tsuoNXNDy6V3ah",
   };
  
    const  headers= {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  
    var encodedData = "";
    for (key in postData) {
        encodedData += encodeURIComponent(key)+"="+encodeURIComponent(postData[key])+"&";
    }
    console.log("encodedData>> "+encodedData);
  axios
    .post("https://drchrono.com/o/token/", data=encodedData, {
        headers: headers
      }
        )
    .then(async(res) => {
      console.log("RESPONSE RECEIVED: ", res.data);
     let token= await new Token(
       {
        accessToken: res.data.access_token,
        refreshToken: res.data.refresh_token,
        expireTime : res.data.expires_in,
        scope:res.data.scope,
        token_type:res.data.token_type
      });
      let p=await token.save();
      console.log("token saved successfully");
    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);
    });
});

module.exports = router;
