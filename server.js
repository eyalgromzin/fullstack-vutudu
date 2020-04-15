const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const path = require('path');

const items = require('./routes/api/items');
const user = require('./routes/api/user');
const placeNames = require('./routes/api/placeNames');
const tagNames = require('./routes/api/tagNames');

const app = express();

// Bodyparser Middleware
app.use(bodyParser.json());

// for mlab
// const db = require('./config/keys').mongoURI;    

//for atlas
const db = "mongodb://eyalgromzin:vutuduPassword11@cluster0-shard-00-00-v6pxg.mongodb.net:27017,cluster0-shard-00-01-v6pxg.mongodb.net:27017,cluster0-shard-00-02-v6pxg.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority"

// Connect to Mongo
mongoose
  .connect(db, {useNewUrlParser: true}) // Adding new mongo url parser
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Use Routes
app.use('/api/items', items);
app.use('/api/user', user);
app.use('/api/placeNames', placeNames);
app.use('/api/tagNames', tagNames);



var prdEnv = process.env.NODE_ENV === 'production'
if (prdEnv) {
    Router.get('/*', async (ctx, next) => {
        //judge if it request a normal file,if not ,return the index.html
        if (parseMime(ctx.url) === 'unknown') {
            ctx.type = 'text/html'
            ctx.response.body = fs.readFileSync(path.join(__dirname, '../build/index.html'), 'binary')
        } else {
            ctx.type = parseMime(ctx.url)
            ctx.response.body = fs.readFileSync(path.join(__dirname, '../build/', ctx.url))
        }
    })
}


// Serve static assets if in production
// if (process.env.NODE_ENV === 'production') {
//   // Set static folder
//   app.use(express.static('client/build')); //works only on desktop 

//   app.get('*', (req, res) => { //works only on desktop 
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//   });
// }

// app.get('*', (req, res) => {  //gives that i need to enable javascript 
  //   res.sendFile(path.resolve(__dirname, 'client', 'public', 'index.html'));
  // });

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));


// app.get("/*", function (req, res) {  //not working
//   res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
// })

// app.get("/*", function (req, res) {   //not working???
//   res.sendFile(path.resolve(__dirname, '../client/public', 'index.html'));
// })
