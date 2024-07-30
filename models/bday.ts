import mongoose, { Document, Schema } from "mongoose";
export interface Birthday extends Document {
    name: string;
    bdayDate: Number;
    bdayMonth: Number;
    bdayYear: Number;
    diff: Number;
}
const bdaySchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        bdayDate: {
            type: Number,
            required: true,
        },
        bdayMonth: {
            type: Number,
            required: true,
        },
        bdayYear: {
            type: Number,
            required: true,
        },
        diff: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model<Birthday>("Bday", bdaySchema);
