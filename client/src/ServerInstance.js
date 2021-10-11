export const ServerInstanceAddress = 'http://localhost:9000'

export const getImage = (filename) => {
    return ServerInstanceAddress + '/media/retrieve/?filename=' + filename
}
