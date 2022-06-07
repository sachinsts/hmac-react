import React, { useState, useEffect } from "react";
import "./App.css";
import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';
import createHmac from "create-hmac";
// import * as crypto from "crypto"
// import { createHmac } from "crypto" 
// var CryptoJS = require("crypto-js");
const crypto = require('crypto');
var utf8 = require('utf8');


function App() {

    const [data, setdata] = useState({
        name: 0,
        msg: ""
    });

    const url = "http://127.0.0.1:5000/data";
    let secret1 = '123bnxnhsda78q&*as@';
    const secret = utf8.encode(secret1);
    var message = url
    // var message = utf8.encode(url)
    const currentDate = new Date();
    const timestamp1 = currentDate.getTime();
    const timestamp = timestamp1.toString(16)
    console.log(timestamp)
    const base = 'v0:'+ timestamp + ':' + message
    console.log(base)

    var CryptoJS = require("crypto-js");
    var hash = CryptoJS.HmacSHA256(base, secret);
    const hmacDigest1 = Base64.stringify(hash)
    const hmacDigest = hash.toString(CryptoJS.enc.Hex)
    console.log(hmacDigest);

    useEffect(() => {
        const url = "http://127.0.0.1:5000/data";


        fetch(url, {headers: {
                    'Access-Control-Allow-Origin':'http://127.0.0.1:3000/',
                    'signature': hmacDigest, 'timestamp': timestamp}
                })
          .then((res) =>
            res.json().then((data) => {
                // Setting a data from api
                setdata({
                    name: data.status,
                    msg: data.msg
                });
            })
        );
    }, []);
  
    return (
        <div className="App">
            <header className="App-header">
                <h1>React and flask</h1>
                {/* Calling a data from setdata for showing */}
                <p>{data.name}</p>
                <p>{data.msg}</p>
                <h5>{hmacDigest}</h5>
 
            </header>
        </div>
    );
}
  
export default App;



        // let secret1 = '123bnxnhsda78q&*as@';
        // const secret = utf8.encode(secret1);
        // // var secret = binaryToBase64(secret_bytes);
        // var message = utf8.encode(url)
        // // var message = binaryToBase64(message_byte);
        // const currentDate = new Date();
        // const timestamp = currentDate.getTime();

        // let base = 'v0:%s:%s' % (timestamp, utf8.decode(message))
        // let test = crypto.createHmac('sha256', "key").update("json").digest("base64");
        // console.log(test)
        // console.log(CryptoJS.HmacSHA1( message, secret));
        // const sign = crypto.createHmac('sha256', secret).update(base).digest('base64');
        // console.log("signature", sign)
        // const header = {"signature" : sign, "timestamp" : timestamp}
        // { headers: {'signature': digest, 'timestamp': timestamp}}
