const client = require('./client');

client.insert({
    title: 'New node',
    content: 'New content'
}, (err, newNode) => {
    if (err) {
        console.error(err);
        return;
    }

    console.log('CREATE_NOTE_SUCCESSFULLY');
    console.log(newNode);
});
