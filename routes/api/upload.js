const router = require('express').Router();
const multer = require('multer');
const { uploadSchema } = require('../validation/upload');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
      cb(null, new Date().toISOString() + file.originalname);
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

router.put('/formData', upload.single('attach'), async (req, res, next) => {
    try{
        const { value, error } = uploadSchema.validate(req.body);
        console.log(JSON.parse(value.formdata));
        res.send('ok');
    } catch (err) {
        next(err);
    }
});

module.exports = router;