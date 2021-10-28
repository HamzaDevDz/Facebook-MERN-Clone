import Pusher from "pusher-js";

export const ServerInstanceAddress = 'https://facebook-clone-mern-hamza.herokuapp.com'

export const getImage = (filename) => {
    return ServerInstanceAddress + '/media/retrieve/?filename=' + filename
}

export const pusher = new Pusher('67843c3bf2c33b4e1d28', {
    cluster: 'eu'
});
