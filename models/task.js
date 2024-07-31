const mongoose = require('mongoose');

// Define the task schema
const taskSchema = new mongoose.Schema({
    uid: {
        type: String
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['To Do', 'In Progress', 'Under Review', 'Completed'],
        default: 'To Do'
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'Urgent'],
        default: 'Low'
    },
    deadline: {
        type: Date, 
    },
}, {
    timestamps: true
});

// Create the task model
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
