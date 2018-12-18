'use strict';

const mongoose = require('mongoose');
const Doacao = mongoose.model('Doacao');

exports.get = async() => {
    const res = await Doacao.find();
    return res;
}

exports.create = async(data) => {
    var doacao = new Doacao(data);
    await doacao.save();
}

exports.delete = async(id) => {
    await Doacao
        .findOneAndRemove(id);
}