
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const mongoose = require('mongoose');
const { buildSchema } = require('graphql');

const resolvers = require('./resolvers/resolver');

const MONGODB_URI = "mongodb+srv://jairoarmando:FvpyKzzDs4anFwMZ@cluster0.n99bjxu.mongodb.net/?retryWrites=true&w=majority";
const PORT = 4000;

const typeDefs = `
    type Dish {
        _id: ID!
        idDish: String!
        name: String!
        calories: Int!
        isVegetarian: Boolean!
        value: Int!
        comments: String
    }

    input NewDishInput {
        idDish: String!
        name: String!
        calories: Int!
        isVegetarian: Boolean
        value: Int!
        comments: String
    }
    
    input UpdateDishInput {
        name: String
        calories: Int
        isVegetarian: Boolean
        value: Int
        comments: String
    }

    type Query {
        getAllDishes: [Dish!]! 
        getDishById(id: ID!): Dish
        getDishesBetweenCalories(min: Int!, max: Int!): [Dish!]!
    }

    type Mutation {
        createDish(input: NewDishInput!): Dish! 
        updateDish(id: ID!, input: UpdateDishInput!): Dish
        deleteDish(id: ID!): Dish
    }
`;

mongoose.connect(MONGODB_URI)
    .then(() => console.log('Conexión a MongoDB Atlas exitosa.'))
    .catch(err => {
        console.error('Error de conexión a MongoDB:', err);
        process.exit(1); 
    });

const app = express();

app.use(cors());

const schema = buildSchema(typeDefs);

app.use(
    '/graphql',
    graphqlHTTP({ 
        schema: schema,      
        rootValue: resolvers, 
        graphiql: true,      
    })
);

app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
});