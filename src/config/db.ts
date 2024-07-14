import mongoose from "mongoose";
import config from "./config";

/**
 * Connect To Database
 */
const connectDB = async () => {
    console.log(config.db?.url, "db");
    let DB: string = "";
    if (config.db.url?.includes("localhost")) {
        const PASSWORD = config.db.password || "";
        DB = config.db.url && config.db.url.replace("<PASSWORD>", PASSWORD);
    } else {
        DB = config.db.url || "";
    }

    const options = {
        // useNewUrlParser: true,
        autoIndex: true,
        // useNewUrlParser: true,
        serverSelectionTimeoutMS: 5000,
    };
    try {
        const connection = await mongoose.connect(DB, options);
        console.log(`MongoDB connected to ${connection.connection.host} DB ✅`);
    } catch (e: any) {
        console.log(`Error connecting to mongoose due to ${e.message} ❌`);
    }
};

export default connectDB;
