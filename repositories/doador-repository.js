'use strict';

const mongoose = require('mongoose');
const Doador = mongoose.model('Doador');

exports.create = async(data) => {
    var doador = new Doador(data);
    await doador.save();
}

exports.get = async() => {
    const res = await Doador.find();
    return res;
}

exports.getByCpf = async(cpf) => {
    const res = await Doador
        .findOne({
            cpf: cpf
        });
    return res;
}

exports.getById = async(id) => {
    const res = await Doador
        .findById(id);
    return res;
}

exports.update = async(id, data) => {
    await Doador
        .findByIdAndUpdate(id, {
            $set: {
                nome: data.nome,
                senha: data.senha,
                cpf: data.cpf,
                email: data.email
            }
        })
}

exports.delete = async(cpf) => {
    await Doador
        .findOneAndDelete(cpf);
}



exports.authenticate = async(data) => {
    const res = await Doador.findOne({
        email: data.email,
        senha: data.senha
    });
    return res;
}