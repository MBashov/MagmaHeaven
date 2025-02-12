import { Router } from "express";

const volcanoController = Router();

volcanoController.get('/create', (req, res) => {
    res.render('volcano/create');
});

export default volcanoController;