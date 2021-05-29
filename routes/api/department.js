const router = require('express').Router();
const ApiError = require('../helpers/ApiError');
const { nicSchema } = require('../validation/department');
const { viewReqsService } = require('../service/department');

router.get('/viewReqs', async (req, res, next) => {
    try {
        const patientNic = req.query.nic;
        const {value, error} = nicSchema.validate(patientNic);
        if (error) {
            next(ApiError.unprocessableEntity(error));
            return;
        } 
        const data = await viewReqsService(req.user.role.departmentId, value);
        res.status(200).send(data);
    } catch (err) {
        console.log(err);
        next(err);
    }
});


module.exports = router;