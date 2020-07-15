const express = require("express");
const app = express();
const cors = require('cors');

// Telling my server that all requests coming in are formatted as JSON:
app.use(express.json());
app.use(express.static('public'));
app.use(cors());

app.locals.favorites = [
  {movieId: 475430, isFavorited: true, userId: 62}
]
app.locals.comments = [
  // user id
  // movie id
  // author
  // comment
  // comment id
]

app.set("port", process.env.PORT || 3001);

app.get("/", (request, response) => {
  response.send("Welcome to the Rancid Tomatillos API");
});
// favoriting
// get route 
// post route
app.get('/api/v1/favorites/:userId', (request, response) => {
  const userId = parseInt(request.params.userId);
  const favorites = app.locals.favorites.filter(favorite => favorite.userId === userId);
  if(!favorites) {
    response.status(404).send('Sorry there are no favorites for this user');
  }
  response.status(200).json(favorites);
})

app.post('/api/v1/favorites/', (request, response) => {
  const { movieId, isFavorited, userId } = request.body;
  
  for(let requiredParameter of [movieId, isFavorited, userId]) {
    if(!request.body[requiredParameter]) {
      response.status(422).send({
        error: `Expected format: {
          movieId: <number>,
          isFavorited: <boolean>,
          userId: <number>, 
        }
        Missing a required parameter of ${requiredParameter}!`
      });
    }
  }
  app.locals.favorites.push({ movieId, isFavorited, userId })
  response.status(201).json({userId, movieId, author, comment, commentId });

})
// commenting
// post route
// get route

app.get("/api/v1/comments/:movieId", (request, response) => {
  // get movie id
  const requestedMovieId = parseInt(request.params.movieId)
  // use that to find the comments for that
  const commentsForMovie = app.locals.comments.filter(comment => comment.movieId === requestedMovieId )
  // write response if nothing is found 
  if(!commentsForMovie) {
    response.status(404).send(`sorry no comments found for movie with id of ${request.params.movieId}`)
  }
  response.status(200).json(commentsForMovie)
});

app.post("/api/v1/comments", (request, response) => {
  // {  
    // user id
  // movie id
  // author
  // comment
  // comment id}
  const commentId = date.now()
  const { userId, movieId, author, comment } = request.body
  
  for(let requiredParameter of [userId, movieId, author, comment]) {
    if(!request.body[requiredParameter]) {
      response.status(422).send({
        error: `Expected format: {
          userId: <number>, 
          movieId: <number>,
          author: <string>,
          comment: <string>
        }
        Missing a required parameter of ${requiredParameter}!`
      })
    }
  }
  app.locals.comments.push({userId, movieId, author, comment, commentId })
  response.status(201).json({userId, movieId, author, comment, commentId });
});
  