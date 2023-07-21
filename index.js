const {ApolloServer} = require('apollo-server');

const mongoose = require('mongoose');
const {MONGODB} = require('./config.js');
const resolvers = require('./GraphQL/Resolvers');
const typeDefs = require('./GraphQL/typeDefs');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => ({req})
});

mongoose.connect(MONGODB,{useNewUrlParser: true})
.then(() =>{
    console.log('MongoDB Connected');
    server.listen({port: 5000});
}).then(res => {
    console.log(`Server running`);
});




    

