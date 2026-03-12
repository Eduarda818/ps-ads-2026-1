import { prisma } from '../database/client.js'


const controller = {}   // Objeto vazio


// Todas as funções de controller têm, pelo menos,
// dois parâmetros:
// req ~> representa a requisição (request)
// res ~> representa a resposta (response)
controller.create = async function(req, res) {
 try {
   // Para a inserção no BD, os dados são enviados
   // dentro de um objeto chamado "body" que vem
   // dentro da requisição ("req")
   await prisma.customer.create({ data: req.body })


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
   const result = await prisma.customer.findMany({
     orderBy: [ { name: 'asc' }]
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
   const result = await prisma.customer.findUnique({
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
   await prisma.customer.update({
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
   await prisma.customer.delete({
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



export default controller