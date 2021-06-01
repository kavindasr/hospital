const router = require('express').Router();
const multer = require('multer');
const { uploadSchema } = require('../validation/upload');
const ApiError = require('../helpers/ApiError');
const { requestService } = require('../service/upload');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, __dirname+'../../../uploads');
    },
    filename: function(req, file, cb) {
      cb(null, new Date().getTime() +file.originalname);
    }
});
  
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
  
const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

router.put('/formData/:req_id', upload.single('attach'), async (req, res, next) => {
    try{
        const { value, error } = uploadSchema.validate(req.body);
        if (error) {
            next(ApiError.unprocessableEntity(error));
            return;
        }
        await requestService(value, req.file, req.params.req_id, req.user.role);
        res.status(201).send('Complete the request');
    } catch (err) {
        next(err);
    }
});

module.exports = router;