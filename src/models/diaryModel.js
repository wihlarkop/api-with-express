import mongoose from "mongoose";


const DiarySchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    post: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
})

const Diary = mongoose.model("diaries", DiarySchema)

export default Diary;
