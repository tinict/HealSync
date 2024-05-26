import { MessageService, ThreadService } from '../Services';

export default (io: any, socket: any) => {
    const threadService = new ThreadService();
    const messageService = new MessageService();

    socket.on('join-room', async (room: any) => {
        try {
            const threads = await threadService.getThreads();
    
            const rooms = Object.keys(threads[0]);
            if (!rooms.includes(room)) {
                console.log("Room not exists: " + room);
                return;
            }
            console.log("Room successfully: " + room);
            socket.join(room);
            const listMessage = await messageService.getMessages(room);
            socket.emit('history-message', listMessage); 
            io.to(room).emit('history-message', listMessage);
        } catch (err: any) {
            console.log(err.message);
        }
    });

    socket.on('send-message', async (data: any) => {
        try {
            console.log(data);
            const { sender, content, id, thread_id } = data;
            console.log(thread_id);
            await messageService.createMessage(data);
            const listMessage = await messageService.getMessages(thread_id);
            socket.emit('list-message', listMessage); 
            io.to(thread_id).emit('list-message', listMessage);
        } catch (err: any) {
            console.log(err.message);
        }
    });

    async function emitReceivedMessage() {
        const threads = await threadService.getThreads();
        socket.emit('received-message', threads);
    }

    emitReceivedMessage()
};
