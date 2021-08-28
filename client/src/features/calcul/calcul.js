 const calculateDifferenceTimestamps = (t1, t2) => {
    let diff = t2 - t1
    const second = 1000
    const min = 60
    const hour = 60
    const day = 24
    const month = 30
    const year = 12
    diff = diff / second
    if(diff <= 60){
        return 'Since ' + Math.round(diff) + ' seconds'
    }
    diff = diff / min
    if(diff <= 60){
        return 'Since ' + Math.round(diff) + ' minutes'
    }
    diff = diff / hour
    if(diff <= 24){
        return 'Since ' + Math.round(diff) + ' hours'
    }
    diff = diff / day;
    if(diff <= 30){
        return 'Since ' + Math.round(diff) + ' days'
    }
    diff = diff / month
    if(diff <= 12){
        return 'Since ' + Math.round(diff) + ' months'
    }
    diff = diff / year
    return 'Since ' + Math.round(diff) + ' years'
}

const generateUniqueId = () => {
    let s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

module.exports = {calculateDifferenceTimestamps, generateUniqueId}