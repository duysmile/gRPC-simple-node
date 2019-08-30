const grpc = require('grpc');
const uuidV1 = require('uuid/v1');

const notesProto = grpc.load('notes.proto');
const notes = [
    { id: '1', title: 'Note 1', content: 'Content 1' },
    { id: '2', title: 'Note 2', content: 'Content 2' }
];

const server = new grpc.Server();
server.addService(notesProto.NoteService.service, {
    list: (_, callback) => {
        callback(null, notes);
    },
    insert: (call, callback) => {
        const note = call.request;
        note.id = uuidV1();
        notes.push(note);
        callback(null, note);
    },
    delete: (call, callback) => {
        const { id } = call.request;
        const existingNodeIndex = notes.findIndex(note => {
            return note.id === id;
        });
        if (existingNodeIndex !== -1) {
            notes.splice(existingNodeIndex, 1);
            callback(null, {});
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: 'Note not found'
            });
        }
    }
});

server.bind('localhost:50051', grpc.ServerCredentials.createInsecure());
console.log('Server started at port 50051');
server.start();
