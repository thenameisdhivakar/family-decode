import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },

        description: {
            type: String,
        },

        date: {
            type: String,
            required: true,
        },

        time: {
            type: String,
            required: true,
        },

        location: {
            type: String,
        },

        // ADD THIS
        priority: {
            type: String,

            enum: ["high", "medium", "low"],

            default: "medium",
        },

        reminder: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Event ||
    mongoose.model("Event", EventSchema);