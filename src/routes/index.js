import express from 'express';
import Controller from '../application/controllers/controller.js';

const router = express.Router();
const controller = new Controller();

router.get('/bairro/:id', async (req, res) => {
    /* #swagger.description = 'Recebe o id de um bairro e retorna dados básicos'

	*/
	try {
		const result = await controller.getBairroById(req.params.id);

		res.status(200).send({
			success: 'true',
			body: result
		});

	} catch (error) {
		res.status(error.statusCode).send({
			sucess: 'false',
			message: error.message
		})
	}
});

router.get('/localizar/numero/:numero/cep/:cep', async (req, res) => {
	try {
			const result = await controller.getLatLongbyCEPeNumero(req.params.numero, req.params.cep);
		
			res.status(200).send({
				success: 'true',
				body: result
			});
	} catch (error) {
		res.status(error.statusCode).send({
			sucess: 'false',
			message: error.message
		})
	}
});

router.get('/pesquisar', async (req, res) => {
	try {
			const result = await controller.getInfobyCEP(req.query.cep)
		
			res.status(200).send({
				success: 'true',
				body: result
			});
	} catch (error) {
		res.status(error.statusCode).send({
			sucess: 'false',
			message: error.message
		})
	}
});

router.post('/comparar', async (req, res) => {
	try {
		const result = await controller.comparar(req.body.origem, req.body.destino)
	
		res.status(200).send({
			success: 'true',
			body: result
		});
	} catch (error) {
		res.status(error.statusCode).send({
			sucess: 'false',
			message: error.message
		})
	}
});

router.post('/calcular-distancia', async (req, res) => {
	/*  #swagger.requestBody = {
			required: true,
			schema: {$ref: "#/components/schemas/comparadorSchema"}
		  }
	*/
	try {
		const result = await controller.getDistancia(req.body.origem, req.body.destino)
	
		res.status(200).send({
			success: 'true',
			body: result
		});
	} catch (error) {
		res.status(error.statusCode).send({
			sucess: 'false',
			message: error.message
		})
	}
});

export default router;