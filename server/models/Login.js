const mongoose = require('mongoose');

const loginSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    token: String,
    created: {
        type: String,
        default: new Date().toTimeString()
    }
});

module.exports = mongoose.model('Login', loginSchema);
