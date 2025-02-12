import { Router } from "express";

import { isAuth } from "../middlewares/authMiddleware.js";
import volcanoServise from "../services/volcanoServise.js";
import { getErrorMessage } from "../utils/errorUtils.js";
import getVolcanoTypes from "../utils/volcanoTypeUtils.js";

const volcanoController = Router();


volcanoController.get('/catalog', async (req, res) => {

    try {
        const vulcanoes = await volcanoServise.getAllForCatalog();
        res.render('volcano/catalog', { vulcanoes });

    } catch (err) {
        //TODO: Error handling!
        console.log(err.message);

    }
});

volcanoController.get('/:volcanoId/details', async (req, res) => {
    const volcanoId = req.params.volcanoId;

    try {
        const volcano = await volcanoServise.getOne(volcanoId);
        const isCreator = volcano.owner.equals(req.user?.id);
        console.log(isCreator);

        res.render('volcano/details', { volcano, isCreator });
    } catch (err) {
        //TODO: Error handling!
    }
});

volcanoController.get('/create', isAuth, (req, res) => {
    const types = getVolcanoTypes();
    res.render('volcano/create', { types });
});

volcanoController.post('/create', isAuth, async (req, res) => {

    const volcanoData = req.body;

    try {
        await volcanoServise.create(volcanoData, req.user.id);
        res.redirect('/volcanoes/catalog');
    } catch (err) {
        const types = getVolcanoTypes(volcanoData.typeVolcano);
        console.log(types);

        res.render('volcano/create', { volcanoData, types, error: getErrorMessage(err) });
    }
});

volcanoController.get('/:volcanoId/delete', isAuth, async (req, res) => {
    const volcanoId = req.params.volcanoId;

    try {
        const volcano = await volcanoServise.getOne(volcanoId);
        const isCreator = volcano.owner.equals(req.user.id);
        if (!isCreator) {
            res.setError('You are not authorized for this action!');
            return res.redirect('/');
        }

        await volcanoServise.delete(volcanoId);
        res.redirect('/volcanoes/catalog');
    } catch (err) {
        //TODO: Error Handling
    }
});

export default volcanoController;