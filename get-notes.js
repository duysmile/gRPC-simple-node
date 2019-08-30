const client = require('./client');

client.list({}, (err, notes) => {
    if (err) {
        console.error(err);
        return;
    }

    console.log('Get notes successfully!');
    console.log(notes);
});
