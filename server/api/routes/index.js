var express = require('express');
var router = express.Router();

var Contract = require('../controllers/contract');

/**
 * @swagger
 * parameters:
 *   addressParam:
 *     name: address
 *     in: query
 *     description: 以太坊账户地址
 *     type: string
 *   privateKeyParam:
 *     name: privateKey
 *     in: query
 *     description: 以太坊账户私钥
 *     type: string
 *   passwordParam:
 *     name: password
 *     in: query
 *     description: keystore秘钥文件密码
 *     type: string
 *   mnemonicParam:
 *     name: mnemonic
 *     in: query
 *     description: 高清钱包的12个单词助记符
 *     type: string
 *   indexParam:
 *     name: index
 *     in: query
 *     description: 高清钱包的账户数组下标
 *     type: integer
 *   providerUrlParam:
 *     name: providerUrl
 *     in: query
 *     description: web3Provider地址
 *     type: string
 */

/**
 * @swagger
 * definition:
 *   Invoice:
 *     properties:
 *       no:
 *         type: string
 *       code:
 *         type: string
 *       amount:
 *         type: integer
 *       payer:
 *         type: string
 *       payee:
 *         type: string
 *       issuedDate:
 *         type: string
 *         format: date
 *       paymentDate:
 *         type: string
 *         format: date
 */

/**
 * @swagger
 * /api/invoices:
 *   x-swagger-router-controller: contract
 *   post:
 *     tags:
 *       - invoices
 *     operationId: addInvoice
 *     description: 添加发票
 *     produces:
 *       - application/json
 *     parameters:
 *       - $ref: '#/parameters/addressParam'
 *       - $ref: '#/parameters/privateKeyParam'
 *       - $ref: '#/parameters/passwordParam'
 *       - $ref: '#/parameters/mnemonicParam'
 *       - $ref: '#/parameters/indexParam'
 *       - $ref: '#/parameters/providerUrlParam'
 *       - name: invoice
 *         description: Invoice object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Invoice'
 *     responses:
 *       200:
 *         description: 添加成功
 *       201:
 *         description: 添加失败
 *       403:
 *         description: 请通过https访问
 */
router.post('/api/invoices', Contract.addInvoice);

module.exports = router;
