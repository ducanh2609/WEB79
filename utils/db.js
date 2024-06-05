import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

const URI = `mongodb+srv://${process.env.BD_USERNAME}:${process.env.BD_PASSWORD}@testdatabase.eg0demb.mongodb.net/`

const connectDB = async () => {
    try {
        await mongoose.connect(URI)
        console.log('Conneted!');
    } catch (error) {
        console.log(error)
    }
}

export default connectDB

