import express from 'express';
import controller from '../application/controllers/controller.js';

const router = express.Router();
const oController = controller();

router.get('/bairro/:id', async (req, res) => {
    /* #swagger.description = 'Recebe o id de um bairro e retorna dados básicos'

	*/
	try {
		const result = await oController.getBairroById(req.params.id);

		res.status(200).send({
			success: 'true',
			body: result.value
		});

	} catch (error) {
		res.status(error.statusCode).send({
			sucess: 'false',
			message: error.message
		})
	}
});

router.get('/localizar/numero/:numero/cep/:cep', async (req, res) => {
	/* #swagger.description = 'Recebe um endereço (número e cep) e retorna coordenadas.'

	*/
	try {
		const result = await oController.getLatLongbyCEPeNumero(req.params.numero, req.params.cep);
	
		res.status(200).send({
			success: 'true',
			body: result.value
		});
	} catch (error) {
		res.status(error.statusCode).send({
			sucess: 'false',
			message: error.message
		})
	}
});

router.get('/pesquisar', async (req, res) => {
    /* #swagger.description = 'Recebe um CEP e retorna dados básicos sobre o bairro em que está localizado.'

	*/
	try {
		const result = await oController.getInfobyCEP(req.query.cep)
	
		res.status(200).send({
			success: 'true',
			body: result.value
		});
	} catch (error) {
		res.status(error.statusCode).send({
			sucess: 'false',
			message: error.message
		})
	}
});

router.post('/comparar', async (req, res) => {
	/*  #swagger.requestBody = {
			required: true,
			schema: {$ref: "#/components/schemas/comparadorSchema2"}
		  }
		#swagger.description = 'Recebe três endereços (número e CEP) e retorna dados básicos, 
		resultados das comparações entre os indicadores e as distâncias entre as localidades.'
	*/
	try {
		const result = await oController.comparar(req.body.origem, req.body.destino, req.body.localDeInteresse)
	
		res.status(200).send({
			success: 'true',
			body: result.value
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
		#swagger.description = 'Recebe dois endereços (número e CEP) e retorna as distâncias entre as localidades.'
	*/
	try {
		const result = await oController.getDistancia(req.body.origem, req.body.destino)
	
		res.status(200).send({
			success: 'true',
			body: result.value
		});
	} catch (error) {
		res.status(error.statusCode).send({
			sucess: 'false',
			message: error.message
		})
	}
});

export default router;