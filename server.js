import express from 'express';

const app = express();
app.use(express.static('./public'));

const port = 5000;
app.listen(process.env.PORT || port);
console.log("Listening at localhost:" + port);