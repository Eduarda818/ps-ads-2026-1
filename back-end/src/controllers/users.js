import { prisma } from '../database/client.js'
import argon2 from 'argon2';
import jwt from 'jsonwebtoken'

const ARGON2_CONFIG = {
  type: argon2.argon2id,  // variante recomendada do algoritmo
  memoryCost: 65536,      // 64 KB de memória máxima utilizada
  timeCost: 3,            // número de iterações
  parallelism: 4          // número de threads simultâneas
}

const controller = {}   // Objeto vazio

controller.create = async function(req, res) {
  try {
    if(req.body.password) {
      req.body.password = await argon2.hash(req.body.password, ARGON2_CONFIG)
    }
    await prisma.user.create({ data: req.body })
    res.status(201).end()
  }
  catch(error) {
    console.error(error)
    res.status(500).end()
  }
}

controller.retrieveAll = async function(req, res) {
  try {
    const result = await prisma.user.findMany({
      omit: { password: true },
      orderBy: [ { fullname: 'asc' } ]
    })
    res.send(result)
  }
  catch(error) {
    console.error(error)
    res.status(500).end()
  }
}

controller.retrieveOne = async function(req, res) {
  try {
    const result = await prisma.user.findUnique({
      omit: { password: true },
      where: { id: Number(req.params.id) }
    })
    if(result) res.send(result)
    else res.status(404).end()
  }
  catch(error) {
    console.error(error)
    res.status(500).end()
  }
}

controller.update = async function(req, res) {
  try {
    await prisma.user.update({
      where: { id: Number(req.params.id) },
      data: req.body
    })
    res.status(204).end()
  }
  catch(error) {
    console.error(error)
    if(error?.code === 'P2025') res.status(404).end()
    else res.status(500).end()
  }
}

controller.delete = async function(req, res) {
  try {
    await prisma.user.delete({
      where: { id: Number(req.params.id) }
    })
    res.status(204).end()
  }
  catch(error) {
    console.error(error)
    if(error?.code === 'P2025') res.status(404).end()
    else res.status(500).end()
  } 
}

controller.login = async function(req, res) {
  try {
    // CORREÇÃO: findFirst permite usar o operador OR.
    // Usamos '|| undefined' para que o Prisma ignore campos que não foram enviados.
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { username: req.body?.username || undefined },
          { email: req.body?.email || undefined }
        ]
      }
    })

    // Se o usuário não for encontrado
    if(!user) {
      console.error(`ERRO DE LOGIN: credenciais não encontradas`)
      return res.status(401).end() // CORREÇÃO: .status(401) em vez de .send(401)
    }

    // Conferir senha
    const match = await argon2.verify(user.password, req.body?.password || '')

    if(!match) {
      console.error('ERRO DE LOGIN: senha inválida')
      return res.status(401).end()
    }

    // Remover senha antes de gerar token e retornar
    if(user.password) delete user.password

    const token = jwt.sign(
      user,
      process.env.TOKEN_SECRET,
      { expiresIn: '24h' }
    )

    res.send({user, token})

  }
  catch(error) {
    console.error("ERRO NO CONTROLLER LOGIN:", error)
    res.status(500).end()
  }
}

export default controller