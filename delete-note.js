const client = require('./client');

client.delete({
    id: '1'
}, (err, _) => {
    if (err) {
        console.error(err);
        return;
    }

    console.log('DELETE_NOTE_SUCCESSFULLY');
});
