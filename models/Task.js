/**
 * Created by watcher on 7/16/18.
 */
const mongoose = require('mongoose')
const moment = require('moment')

const taskSchema = new mongoose.Schema({
    title: 'string',
    createdAt: 'string'
})

const Task = mongoose.model('Task', taskSchema)

module.exports = {
    create: async function(data) {
        if (!data.createdAt) data.createdAt = moment().format('MMMM Do YYYY, h:mm');

        const newTask = new Task(data);
        return newTask.save();
    },
    list: async function() {
        return Task.find({});
    },
    removeTask: async function(taskId) {
        return Task.deleteOne({ _id: taskId })
    }
}
