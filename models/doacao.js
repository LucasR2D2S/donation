'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    ong: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ong',
        required: true
    },
    doador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doador',
        required: true,
    },
    quantia: {
        type: Number,
        required: true
    },
    createData: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model('Doacao', schema);