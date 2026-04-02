import { prisma } from '../database/client.js'

import argon2 from 'argon2';


const ARGON2_CONFIG = {
 type: argon2.argon2id,  // variante recomendada do algoritmo
 memoryCost: 65536,      // 64 KB de memória máxima utilizada
 timeCost: 3,            // número de iterações
 parallelism: 4          // número de threads simultâneas
}

const controller = {}   // Objeto vazio


// Todas as funções de controller têm, pelo menos,
// dois parâmetros:
// req ~> representa a requisição (request)
// res ~> representa a resposta (response)
controller.create = async function(req, res) {
 try {
   // Caso exista o campo "password" em req.body, é
   // necessário gerar o hash da senha antes de
   // armazená-la no BD, usando o algoritmo argon2
   if(req.body.password) {
     req.body.password = await argon2.hash(req.body.password, ARGON2_CONFIG)
   }

   // Para a inserção no BD, os dados são enviados
   // dentro de um objeto chamado "body" que vem
   // dentro da requisição ("req")
   await prisma.users.create({ data: req.body })


   // Se tudo der certo, enviamos o código HTTP
   // apropriado, no caso
   // HTTP 201: created
   res.status(201).end()
 }
 catch(error) {
   // Se algo de errado ocorrer, cairemos aqui
   console.error(error)  // Exibe o erro no terminal


   // Enviamos como resposta o código HTTP relativo
   // a erro interno do servidor
   // HTTP 500: Internal Server Error
   res.status(500).end()
 }
}

controller.retrieveAll = async function(req, res) {
 try {
   // Recupera todos os registros de clientes, ordenados pelo
   // campo "name", ascendente
   const result = await prisma.user.findMany({
     omit: { password: true },     // Omite o campo "password" do resultado
     orderBy: [ { fullname: 'asc' } ]
   })


   // HTTP 200: OK (implícito)
   res.send(result)
 }
 catch(error) {
   // Se algo de errado ocorrer, cairemos aqui
   console.error(error)  // Exibe o erro no terminal


   // Enviamos como resposta o código HTTP relativo
   // a erro interno do servidor
   // HTTP 500: Internal Server Error
   res.status(500).end()
 }
}

controller.retrieveOne = async function(req, res) {
 try {
   // Busca no banco de dados apenas o registro indicado
   // pelo parâmetro "id"
   const result = await prisma.user.findUnique({
     omit: { password: true },     // Omite o campo "password" do resultado
     where: { id: Number(req.params.id) }
   })


   // Encontrou ~> HTTP 200: OK (implícito)
   if(result) res.send(result)
   // Não encontrou ~> HTTP 404: Not Found
   else res.status(404).end()
 }
 catch(error) {
   // Se algo de errado ocorrer, cairemos aqui
   console.error(error)  // Exibe o erro no terminal


   // Enviamos como resposta o código HTTP relativo
   // a erro interno do servidor
   // HTTP 500: Internal Server Error
   res.status(500).end()
 }
}

controller.update = async function(req, res) {
 try {
   // Busca o registro no banco de dados por seu id
   // e o atualiza com as informações que vieram em
   // req.body
   await prisma.users.update({
     where: { id: Number(req.params.id) },
     data: req.body
   })


   // Encontrou e atualizou ~> HTTP 204: No Content
   res.status(204).end()
 }
 catch(error) {
   // Se algo de errado ocorrer, cairemos aqui
   console.error(error)  // Exibe o erro no terminal


   // No caso da biblioteca Prisma, é gerado um erro com
   // código 'P2025' caso o registro com o id especificado
   // não exista. Aqui, estamos detectando se é o caso e
   // retornando HTTP 404: Not Found para indicar essa
   // situação
   if(error?.code === 'P2025') res.status(404).end()


   // Se o erro for de outro tipo, retornamos o código de erro
   // padrão
   // HTTP 500: Internal Server Error
   else res.status(500).end()
 }
}

controller.delete = async function(req, res) {
 try {
   await prisma.users.delete({
     where: { id: Number(req.params.id) }
   })


   // Encontrou e excluiu ~> HTTP 204: No Content
   res.status(204).end()
 }
 catch(error) {
   // Se algo de errado ocorrer, cairemos aqui
   console.error(error)  // Exibe o erro no terminal


   // No caso da biblioteca Prisma, é gerado um erro com
   // código 'P2025' caso o registro com o id especificado
   // não exista. Aqui, estamos detectando se é o caso e
   // retornando HTTP 404: Not Found para indicar essa
   // situação
   if(error?.code === 'P2025') res.status(404).end()


   // Se o erro for de outro tipo, retornamos o código de erro
   // padrão
   // HTTP 500: Internal Server Error
   else res.status(500).end()
 } 
}


controller.login = async function(req, res) {
 try {
   // Busca o usuário no BD por meio dos campos
   // "username" ou "email"
   const user = await prisma.user.findUnique({
     where: {
       OR: [
         { username: req.body?.username },
         { email: req.body?.email }
       ]
     }
   })


   // Se o usuário não for encontrado, retorna
   // HTTP 401: Unauthorized
   if(! user) {
     console.error(`ERRO DE LOGIN: usuário "${req.body?.username}" ou e-mail "${req.body?.email}" não encontrado`)
     return res.send(401).end()
   }


 }
 catch(error) {
   console.error(error)
   // HTTP 500: Internal Server Error
   res.status(500).end()
 }
}

export default controller