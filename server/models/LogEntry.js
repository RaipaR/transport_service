// LogEntry.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logEntrySchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    action: { type: String, required: true },
    details: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('LogEntry', logEntrySchema);



