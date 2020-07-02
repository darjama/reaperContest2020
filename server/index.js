const express = require('express');
const app = express();
const port = 3003;


app.use('/', express.static(__dirname + '/../dist/'))
app.use('/:id', express.static(__dirname + '/../dist/'))

app.listen(port, ()=>console.log(`Started ReaperContest server on port ${port} at ${new Date()}`))