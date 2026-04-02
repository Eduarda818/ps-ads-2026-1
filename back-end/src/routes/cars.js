import { Router } from 'express'
import controller from '../controllers/cars.js'

const router = Router()

// onde for POST, vai no contoller e cria
//POST precisa ter corpo na requisição pois ele precisa mandar dados
router.post('/', controller.create)
router.get('/', controller.retrieveAll)
router.get('/:id', controller.retrieveOne) // parametro na rota funciona como uma váriavel, começa com :
// não podemos ter mias que um parâmetro por rota
router.put('/:id', controller.update)
router.delete('/:id', controller.delete)

// HTTP: tem dois verbos de atualização:
//  PUT: Substituição integral de objeto-
// PATCH: substituição parcial


export default router