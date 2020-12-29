const express = require("express");
const axios = require('axios');
const Token = require("../models/Token");

const router = express.Router();

router.get("/redirect", (req, res) => {
  redirectURL = req.query.redirect_uri || "https://c45909755c0e.ngrok.io/token";
  console.log("redirectURL>>", redirectURL);
  const redirectTo = `https://drchrono.com/o/authorize/?redirect_uri=${encodeURI(
    redirectURL
  )}&response_type=code&client_id=${encodeURI(
    "AePaxoRUYcWJAgXd0EkBJ5AdOoz5f2qLUnb4dXAq"
  )}`;
  res.redirect(redirectTo);
});

// router.post("/token", (req, res) => {
//   console.log("req>>", JSON.stringify(req.body));
//   res.status(200).json({ a: "a" });
// });

router.get("/token", (req, res) => {
  const code = req.query.code;
  const query = req.query;
  console.log("query>>", query);

  var postData = { 
    code:query.code,
    grant_type: "authorization_code",
    redirect_uri: "https://c45909755c0e.ngrok.io/token",
    client_id: "AePaxoRUYcWJAgXd0EkBJ5AdOoz5f2qLUnb4dXAq",
    client_secret:
      "HIy5nZ1BTFtNPZpGVDCczknq0YwQGrTLdFUIpobfRY8LNvDNi4Iattw9md7e3MTweZp0Prgli9R9UZqCTMQ2Uh3f2ME6SQywI6GQzU5HXEAR5b6Hz5tsuoNXNDy6V3ah",
   };
  
    const  headers= {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': '',
      'Host':''
    }
  
    var encodedData = "";
    for (key in postData) {
        encodedData += encodeURIComponent(key)+"="+encodeURIComponent(postData[key])+"&";
    }
    console.log("@@@@@@@@@@@@@@@@@@@@");
    console.log(encodedData);
  axios
    .post("https://drchrono.com/o/token/", data=encodedData, {
        headers: headers
      }
        )
    .then((res) => {
      console.log("RESPONSE RECEIVED: ", res.data);
    //   const Token = new Token({
    //     accessToken: req.data.access_token,
    //     refreshToken: req.data.refresh_token,
    //     expireTime : req.data.expires_in,
    //     scope:req.data.scope,
    //     token_type:req.data.token_type
    //   });
    //   Token.save();
    //     res.status(201).json({
    //       message: "Post added successfully",
    //     });
    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);
    });
});

module.exports = router;
