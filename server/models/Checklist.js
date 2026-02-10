import mongoose from "mongoose";

const checklistSchema = new mongoose.Schema({
    destination: { type: String, required: true, index: true },
    hotelName: { type: String },
    month: { type: Number, required: true }, // 0-11 to help with seasonality
    data: { type: Object, required: true },  // The entire JSON response
}, { timestamps: true });

// Compound index to find unique checklist per destination+month
checklistSchema.index({ destination: 1, month: 1 }, { unique: false });

const Checklist = mongoose.models.Checklist || mongoose.model("Checklist", checklistSchema);

export default Checklist;
