import express from 'express';
import path from 'path';
import fs from 'fs';
import bodyParser from 'body-parser';
import strategy from 'react-validatorjs-strategy';

const PORT = 7700;
const USERS = [
  { id: 1, name: "Alexey", age: 30 },
  { id: 2, name: "Ignat", age: 15 },
  { id: 3, name: "Sergey", age: 26 },
];
const PUBLIC_PATH = path.join(__dirname, 'public');
const COMMENTS_FILE = path.join(__dirname, 'comments.json');

const app = express();
// app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(PUBLIC_PATH, 'views'));
app.set('view cache', false);
app.set('port', (process.env.PORT || PORT));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const isDevelopment = process.env.NODE_ENV === 'development';

if (isDevelopment) {
  const webpack = require('webpack');
  const webpackConfig = require('./webpack.config.babel').default;
  const compiler = webpack(webpackConfig);
  app.use(require('webpack-dev-middleware')(compiler, {
    hot: true,
    stats: {
      colors: true
    }
  }));
  app.use(require('webpack-hot-middleware')(compiler));
} else {
  app.use(express.static(PUBLIC_PATH));
}

app.get("/users", function(req, res) {
  res.send(USERS);
});

app.all("*", function(req, res) {
  res.sendFile(path.resolve(PUBLIC_PATH, 'index.html'));
});

// app.get('/', function(req, res) {
//   fs.readFile(COMMENTS_FILE, function(err, data) {
//     if (err) {
//       console.error(err);
//       process.exit(1);
//     }

//     res.render('index', {
//       commentBox: components.renderCommentBox({
//         comments: JSON.parse(data)
//       })
//     });
//   });
// });

app.get('/api/comments', function(req, res) {
  fs.readFile(COMMENTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  });
});

app.post('/api/comments', function(req, res, next) {
  strategy.validateServer(req.body, schemas.commentForm).then(() => {
    fs.readFile(COMMENTS_FILE, function(err, data) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      var comments = JSON.parse(data);
      var newComment = {
        //id: Date.now(),
        author: req.body.author,
        text: req.body.text,
      };
      comments.push(newComment);
      fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 4), function(err) {
        if (err) {
          console.error(err);
          process.exit(1);
        }
        res.json(comments);
      });
    });
  })
  .catch(next);
});

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.use(function(err, req, res, next) {
  if (err instanceof strategy.Error) {
    res.status(400).json(err.errors);
  } else {
    next(err, req, res);
  }
});

app.listen(app.get('port'), function() {
  console.log('Listening on host ' + app.get('hostname') + ', port ' + app.get('port') + '...');
});
