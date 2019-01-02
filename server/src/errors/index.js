const DBSeedException = new Error('DB could not be seeded at this time.');
const DBReadException = new Error('There was a problem retrieving results from the DB.');
const DBUpdateException = new Error('There was a problem updating the DB.');
const DBWriteException = new Error('There was a problem writing to the DB.');

module.exports = {
    DBSeedException,
    DBReadException,
    DBUpdateException,
    DBWriteException,
};
