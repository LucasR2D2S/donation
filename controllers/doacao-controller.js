'use strict';

const repository = require('../repositories/doacao-repository');
const authService = require('../services/auth-service');

exports.get = async(req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (e){
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.post = async(req, res, next) => {
    try{
        // Recupera o token
        const token = req.body.token || req.query.token || req.headers['x-access-token'];

        // Decodifica o token
        const data = await authService.decodeToken(token);

        await repository.create({
            ong: req.body.ong,
            doador: data.id,
            quantia: req.body.quantia
        });

        res.status(201).send({
            message: 'Doação cadastrada com sucesso!'
        });

    } catch (e){
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    } 
};

exports.delete = async(req, res, next) => {
    try{
        await repository.delete(req.body.id)
        res.status(200).send({
            message: 'Doacao removida com sucesso!'
        });
    } catch (e){
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    } 
};