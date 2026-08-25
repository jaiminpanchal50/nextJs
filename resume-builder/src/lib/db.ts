import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        // let URL = process.env.MONGO_URI
        // if (!URL) return
        // await mongoose.connect(URL)
        await mongoose.connect(process.env.MONGO_URI!) // "!" this is called non null assertion operator or generics this tells typescript that this variable is not null or undefined. If you dont want to add generics then you can use if-else condition to check if the variable is null or undefined like 
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log("Error connecting to MongoDB", error)
        process.exit(1)
    }
}