const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');

const routes = require('./routes');
const dbClient = require('./store/db');
const seed = require('./db/seed');

const PORT = 3000;

dbClient.connect()
    .then(() => seed())
    .then(seedSuccessMsg => console.log(`Connected to DB and ${seedSuccessMsg}`))
    .catch(err => console.log(err));

app.use(cors());
app.use(bodyParser.json());
app.use(routes);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
