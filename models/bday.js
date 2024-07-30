"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var bdaySchema = new mongoose_1.Schema({
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
}, { timestamps: true });
exports.default = mongoose_1.default.model("Bday", bdaySchema);
