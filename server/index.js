const config = require('../config.js');
const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');
const models = require('./db/model');
const Contest = models.ContestModel;
const DlLog = models.DlLogModel;
const Entry = models.EntryModel;
const Vote = models.VoteModel;
const bodyParser = require('body-parser');
const graphqlController = require('./db/graphqlController');
const port = config.get('port');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/graphql', graphqlController);
app.set('json spaces', 2);

var contestRoutes = require('./db/contestRoutes');
contestRoutes(app);

var dlLogRoutes = require('./db/dlLogRoutes');
dlLogRoutes(app);

var emailRoutes = require('./email/emailRoutes');
emailRoutes(app);

var entriesRoutes = require('./db/entriesRoutes');
entriesRoutes(app);

var uploadRoutes = require('./upload/uploadRoutes');
uploadRoutes(app);

var votingRoutes = require('./db/votingRoutes');
votingRoutes(app);

var resultRoutes = require('./db/resultRoutes');
resultRoutes(app);

app.use('/', express.static(__dirname + '/../dist/'));
app.use('/:id', express.static(__dirname + '/../dist/'));

app.listen(port, () =>
  console.log(`Started ReaperContest server on port ${port} at ${new Date()}`)
);
