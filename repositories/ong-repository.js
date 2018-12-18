'use strict';

const mongoose = require('mongoose');
const Ong = mongoose.model('Ong');

exports.get = async() => {
    const res = await Ong.find({
    }, 'nome descricao cnpj tipo');
    return res;
}

exports.getByNome = async(nome) => {
    const res = await Ong
        .findOne({
            nome: nome,
            active: true
        }, 'nome descricao tipo')
    return res;
}

exports.getByCnpj = async(cnpj) => {
    const res = await Ong
        .findOne({
            cnpj: cnpj,
        });
    return res;
}

exports.getByTipo = async(tipo) => {
    const res = await Ong
        .find({
            tipos: tipo,
            active: true
        }, 'nome descricao cnpj tipo')
    return res;
}

exports.create = async(data) => {
    var ong = new Ong(data);
    await ong.save();
}

exports.update = async(id, data) => {
    await Ong
        .findByIdAndUpdate(id, {
            $set: {
                nome: data.nome,
                descricao: data.descricao,
                cnpj: data.cnpj,
                tipo: data.tipo,
                email: data.email,
                senha: data.senha
            }
        })
}

exports.delete = async(id) => {
    await Ong
        .findOneAndRemove(id);
}