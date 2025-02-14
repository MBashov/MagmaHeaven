import { Router } from "express";

import { isAuth } from "../middlewares/authMiddleware.js";
import volcanoServise from "../services/volcanoServise.js";
import { getErrorMessage } from "../utils/errorUtils.js";
import getVolcanoTypes from "../utils/volcanoTypeUtils.js";

const volcanoController = Router();


volcanoController.get('/catalog', async (req, res) => {

    try {
        const vulcanoes = await volcanoServise.getAll();
        res.render('volcano/catalog', { vulcanoes });

    } catch (err) {
        res.setError(getErrorMessage(err));
        res.redirect('/404');
    }
});

volcanoController.get('/:volcanoId/details', async (req, res) => {
    const volcanoId = req.params.volcanoId;
    const userId = req.user?.id;

    try {
        const volcano = await volcanoServise.getOne(volcanoId);

        const isCreator = volcano.owner.equals(userId);
        const hasVote = volcano.voteList.includes(userId);

        res.render('volcano/details', { volcano, userId, isCreator, hasVote });
    } catch (err) {
        res.setError(getErrorMessage(err));
        res.redirect('/404');
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
            return res.redirect(`/volcanoes/${volcanoId}/details`);
        }

        await volcanoServise.delete(volcanoId);
        res.redirect('/volcanoes/catalog');
    } catch (err) {
        res.setError(getErrorMessage(err));
        res.redirect('/404');
    }
});

volcanoController.get('/:volcanoId/edit', isAuth, async (req, res) => {
    const volcanoId = req.params.volcanoId;

    try {
        const volcano = await volcanoServise.getOne(volcanoId);

        const types = getVolcanoTypes(volcano.typeVolcano);

        const isCreator = volcano.owner.equals(req.user.id);
        if (!isCreator) {
            res.setError('You are not authorized for this action!');
            return res.redirect(`/volcanoes/${volcanoId}/details`);
        }

        res.render('volcano/edit', { volcano, types });
    } catch (err) {
        res.setError(getErrorMessage(err));
        res.redirect('/404');
    }
});

volcanoController.post('/:volcanoId/edit', isAuth, async (req, res) => {

    const volcanoId = req.params.volcanoId;
    const volcanoData = req.body;

    try {
        const volcano = await volcanoServise.getOne(volcanoId);

        const isCreator = volcano.owner.equals(req.user.id);
        if (!isCreator) {
            res.setError('You are not authorized for this action!');
            return res.redirect(`/volcanoes/${volcanoId}/details`);
        }

        await volcanoServise.edit(volcanoId, volcanoData);

        res.redirect(`/volcanoes/${volcanoId}/details`);

    } catch (err) {
        const types = getVolcanoTypes(volcanoData.typeVolcano);
        res.render('volcano/edit', { volcano: volcanoData, types, error: getErrorMessage(err) });
    }
});

volcanoController.get('/:volcanoId/vote', isAuth, async (req, res) => {
    const userId = req.user.id;
    const volcanoId = req.params.volcanoId;

    try {

        const volcano = await volcanoServise.getOne(volcanoId);

        const isOwner = volcano.owner.equals(userId);
        if (isOwner) {
            res.setError('Cannot vote for own post!');
            return res.redirect(`/volcanoes/${volcanoId}/details`);
        }

        const hasVote = volcano.voteList.includes(userId);
        if (hasVote) {
            res.setError('You have already vote for this post!');
            return res.redirect(`/volcanoes/${volcanoId}/details`);
        }

        await volcanoServise.vote(volcanoId, userId);

        res.redirect(`/volcanoes/${volcanoId}/details`);

    } catch (err) {
        res.setError(getErrorMessage(err));
        res.redirect('/404');
    }
});

volcanoController.get('/search', async (req, res) => {

    const { name, typeVolcano } = req.query;

    try {
        const volcanoes = await volcanoServise.getAll({ name, typeVolcano });

        const volcanoTypes = getVolcanoTypes(typeVolcano);

        res.render('volcano/search', { volcanoes, name, volcanoTypes });
    } catch (err) {
        res.setError(getErrorMessage(err));
        res.redirect('/404');

    }
});


export default volcanoController;