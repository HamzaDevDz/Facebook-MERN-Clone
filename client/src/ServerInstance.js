export const ServerInstanceAddress = 'http://localhost:9000'

export const getImage = (filename) => {
    return ServerInstanceAddress + '/image/retrieve/?filename=' + filename
}
