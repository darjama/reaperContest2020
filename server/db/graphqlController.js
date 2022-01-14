// @ts-nocheck
// src/controller/graphqlController.js

const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
var contest = require('./contestController');
var entries = require('./entriesController');
const results = require('./resultController');

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    contest(contestid: Int!): Contest
    contests: [Contest],
    currentContest: Contest
    entries(contestid: Int!): [Entry]
    votes(contestid: Int!): [Vote]
  }
  scalar DateTime

  type Marker {
    name: String!,
    time: Int!
  }

  type Contest {
    contestid: Int!,
    month: Int!,
    year: Int!,
    artist: String!,
    artistimg: String!,
    songname: String!,
    description: String!,
    startdate: DateTime!,
    duedate: DateTime!,
    votestart: DateTime!,
    voteend: DateTime!,
    resultdate: DateTime!,
    nextstart: DateTime!,
    rawuri: String!,
    markers: [Marker],
    audiofiles: [String],
    prefix: String!,
  }

  type Entry {
    contestant: String,
    mixnum: Int,
    audiouri: String,
    contestid: Int,
    ipaddr: String,
    email: String,
    zipfile: String,
    message: String,
    timestamp: DateTime,
    uploadSuccessful: Boolean,
    offset: Float,
    trackCount: Float,
    dynamicRange: Float,
    normalize: Float,
  }

  type Rating {
    entryid: String
    rating: Float
  }

  type Note {
    entryid: String
    note: String
  }

  type Vote {
    contestid: Int,
    first: Int,
    second: Int,
    third: Int,
    ratings: [Rating],
    ipaddr: String,
    time: DateTime,
    notes: String,
    voter: String,
  }
`);

const rootResolver = {
  contest: (graphqlInput) => {
    return contest.contestRaw(graphqlInput && graphqlInput.contestid);
  },
  currentContest: contest.currentContestRaw,
  contests: contest.contestsRaw,
  entries: (graphqlInput) => {
    return entries.entriesRaw(graphqlInput && graphqlInput.contestid);
  },
  votes: (graphqlInput) => {
    return results.resultsRaw(graphqlInput && graphqlInput.contestid);
  },
  // createEmployee: graphqlInput => employeesService.save(graphqlInput),
  // deleteEmployee: graphqlInput => employeesService.deleteById(graphqlInput.id),
};

const graphql = graphqlHTTP({
  schema,
  rootValue: rootResolver,
  graphiql: true, // this creates the interactive GraphQL API explorer with documentation.
});

module.exports = graphql;
