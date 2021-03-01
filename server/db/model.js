const config = require('../../config.js');
const mongoose = require('mongoose');
const Double = require('@mongoosejs/double');

mongoose.Promise = global.Promise;

mongoose.connect(
  `mongodb+srv://${config.get('dbs.un')}:${config.get(
    'dbs.pw'
  )}@reamixed.lqgfh.gcp.mongodb.net/reamix?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);

const Schema = mongoose.Schema;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('connected to db'); // we're connected!
});

const Entry = new Schema({
  contestant: String,
  mixnum: Number,
  audiouri: String,
  contestid: Number,
  contestant: String,
  ipaddr: String,
  email: String,
  zipfile: String,
  message: String,
  timestamp: Date,
  uploadSuccessful: Boolean,
  offset: Double,
  normalize: Double,
});

const EntryModel = mongoose.model('Entries', Entry);

const Vote = new Schema({
  contestid: Number,
  first: Number,
  second: Number,
  third: Number,
  ratings: Object,
  ipaddr: String,
  time: Date,
  notes: Object,
  voter: String,
});

const VoteModel = mongoose.model('Votes', Vote);

const Contest = new Schema({
  month: Number,
  year: Number,
  artist: String,
  artistimg: String,
  songname: String,
  description: String,
  startdate: Date,
  duedate: Date,
  votestart: Date,
  voteend: Date,
  resultdate: Date,
  rawfile: String,
  mixedbundle: String,
  projectbundle: String,
  markers: Array,
  prefix: String,
});

const ContestModel = mongoose.model('Contests', Contest);

const DlLog = new Schema({
  timestamp: { type: Date, default: Date.now },
  ipaddr: String,
});

const DlLogModel = mongoose.model('DlLogs', DlLog);

module.exports = { ContestModel, DlLogModel, EntryModel };
