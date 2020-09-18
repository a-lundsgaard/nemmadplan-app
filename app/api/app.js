


(
  function (){

    const express = require('express');
    const { graphqlHTTP } = require('express-graphql');
    const mongoose = require('mongoose');

    const graphQlSchema = require('./graphql/schema/index');
    const graphQlResolvers = require('./graphql/resolvers/index');
    const isAuth = require('./middleware/is-auth');
    const app = express();


    app.use(isAuth); // express will automatically use this as a valid middleware and run it on every incoming request

    app.use(
      '/graphql',
      graphqlHTTP({
        schema: graphQlSchema,
        rootValue: graphQlResolvers,
        graphiql: true
      })
    );

     mongoose.connect(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@askeapi.8i9lf.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        //useMongoClient: true
      }).then((data) => {
      console.log('MongoDB connected...')
    }).catch(err => console.log(err))


    let server = app.listen(8080, function () {
      console.log('Express server listening on port ' + server.address().port);
    });


    module.exports = app;
  }()
)



