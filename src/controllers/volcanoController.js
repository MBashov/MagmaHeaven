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

volcanoController.get('/create', isAuth, (req, res) => {
    const types = getVolcanoTypes();
    res.render('volcano/create', { types });
});

volcanoController.post('/create', isAuth, async (req, res) => {

    const volcanoData = req.body;

    try {
        await volcanoServise.create(volcanoData, req.user.id);
        res.redirect('/catalog');
    } catch (err) {
        const types = getVolcanoTypes(volcanoData.typeVolcano);
        console.log(types);

        res.render('volcano/create', { volcanoData, types, error: getErrorMessage(err) });
    }
});

export default volcanoController;