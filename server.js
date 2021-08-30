import express from 'express';

var app = express();
app.use(express.static('./public'));

app.listen(process.env.PORT || 5000);
console.log("1, 2, 3, Retail!");