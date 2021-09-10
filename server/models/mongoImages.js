import mongoose from 'mongoose'

const imageSchema = new mongoose.Schema({
    name: String,
    desc: String,
    img:
        {
            data: Buffer,
            contentType: String
        }
});

//Image is a model which has a schema imageSchema
export default mongoose.model('images', imageSchema)
// module.exports = new mongoose.model('images', imageSchema);