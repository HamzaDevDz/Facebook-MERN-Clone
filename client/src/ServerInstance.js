import Pusher from "pusher-js";

export const ServerInstanceAddress = 'http://localhost:9000'

export const getImage = (filename) => {
    return ServerInstanceAddress + '/media/retrieve/?filename=' + filename
}

export const pusher = new Pusher('67843c3bf2c33b4e1d28', {
    cluster: 'eu'
});
