const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/reamix', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})

const Schema = mongoose.Schema;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

const Entry = new Schema ({
  contestant: String,
  audioURI: String,
  contestId: Number,
})

const EntryModel = mongoose.model('Entries', Entry);

const Vote = new Schema({
  contestid: Number,
  first: Number,
  second: Number,
  third: Number,
  ipaddress: String,
  time: Date,
  notes: Object,
})

const VoteModel = mongoose.model('Votes', Vote);

const Submission = new Schema({
  name: String,
  email: String,
  ipaddress: String,
  time: Date,
  zipURI: String,
  contestId: Number,
})

const SubmissionModel = mongoose.model('Submissions', Submission)

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
})

const ContestModel = mongoose.model('Contests', Contest)

