'use strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/ong-repository');
const authService = require('../services/auth-service');
const md5 = require('md5');

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

exports.getByNome = async(req, res, next) => {
    try {
        var data = await repository.getByNome(req.params.nome);
        res.status(200).send(data);
    } catch (e){
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.getByCnpj = async(req, res, next) => {
    try{
        var data = await repository.getByCnpj(req.params.cnpj)
        res.status(200).send(data);
    } catch (e){
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.getByTipo = async(req, res, next) => {
    try{
        const data = await repository.getByTipo(req.params.tipo)
        res.status(200).send(data);
    }catch (e){
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }
}

exports.post = async(req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.nome, 3, 'O nome deve conter pelo menos 3 caracteres');
    contract.hasMinLen(req.body.descricao, 10, 'A descrição deve conter pelo menos 10 caracteres');
    contract.isEmail(req.body.email, 'Verifique a integridade do email');
    contract.isFixedLen(req.body.cnpj, 14,'Digite um CNPJ válido');

    // Se os dados forem inválidos
    if (!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }

    try{
        await repository.create({
            nome: req.body.nome,
            descricao: req.body.descricao,
            cnpj: req.body.cnpj,
            tipo: req.body.tipo,
            email: req.body.email,
            senha: md5(req.body.senha + global.SALT_KEY)
        });
        res.status(201).send({
            message: 'Ong cadastrada com sucesso!'
        });
    } catch (e){
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    } 
};

exports.put = async(req, res, next) => {
    try{
        await repository.update(req.params.id, req.body)
        res.status(200).send({
            message: 'Ong atualizada com sucesso!'
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
            message: 'Ong removida com sucesso!'
        });
    } catch (e){
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    } 
};
