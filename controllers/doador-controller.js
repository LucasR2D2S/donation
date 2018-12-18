'use strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/doador-repository');
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

exports.getByCpf = async(req, res, next) => {
    try{
        var data = await repository.getByCpf(req.params.cpf)
        res.status(200).send(data);
    } catch (e){
        res.status(500).send({
            message: 'Falha ao processar sua requisição',
            data: e
        });
    }
}

exports.post = async(req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.nome, 3, 'O nome deve conter pelo menos 3 caracteres');
    contract.isFixedLen(req.body.cpf, 11, 'O CPF deve conter 11 caracteres');
    contract.isEmail(req.body.email, 'Verifique a integridade do email.');

    // Se os dados forem inválidos
    if (!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }

    try{
        await repository.create({
            nome: req.body.nome,
            senha: md5(req.body.senha + global.SALT_KEY),
            cpf: req.body.cpf,
            email: req.body.email,
            roles: ['user'] 
        });
        res.status(201).send({
            message: 'Doador cadastrado com sucesso!'
        });
    } catch (e){
        res.status(500).send({
            message: 'Falha ao processar sua requisição',
            data: e
        });
    } 
};

exports.put = async(req, res, next) => {
    try{
        await repository.update(req.params.id, req.body)
        res.status(200).send({
            message: 'Doador atualizada com sucesso!'
        });
    } catch (e){
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    }     
};

exports.delete = async(req, res, next) => {
    try{
        await repository.delete(req.params.cpf)
        res.status(200).send({
            message: 'Doador removida com sucesso!'
        });
    } catch (e){
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    } 
};

exports.authenticate = async(req, res, next) => {
    try{
        const doador = await repository.authenticate({
            email: req.body.email,
            senha: md5(req.body.senha + global.SALT_KEY)
        });

        if (!doador) {
            res.status(404).send({
                message: 'Usuário e senha inválidos'
                
            });
            return;
        }
       
        const token = await authService.generateToken({
            id: doador._id,
            email: doador.email,
            nome: doador.nome,
            roles: doador.roles
        });

        res.status(201).send({
            token: token,
            data: {
                email: doador.email,
                nome: doador.nome,
                roles: doador.roles
            }
        });
    } catch (e){
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    } 
};

exports.refreshToken = async(req, res, next) => {
    try{
        // Recupera o token
        const token = req.body.token || req.query.token || req.headers['x-access-token'];

        // Decodifica o token
        const data = await authService.decodeToken(token);

        const doador = await repository.getById(data.id);

        if (!doador) {
            res.status(404).send({
                message: 'Cliente não encontrado'   
            });
            return;
        }
       
        const tokenData = await authService.generateToken({
            id: doador._id,
            email: doador.email,
            nome: doador.nome,
            roles: doador.roles
        });

        res.status(201).send({
            token: token,
            data: {
                email: doador.email,
                nome: doador.nome,
                roles: doador.roles
            }
        });
    } catch (e){
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        });
    } 
};
