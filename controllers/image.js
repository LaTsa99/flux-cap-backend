const clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '9ba450b59697453a94064a8fe41e3a75'
});

const handleApiCall = () => (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('unable to work with API'))
}

const handleImagePut = (db) => (req, res) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImagePut: handleImagePut,
    handleApiCall: handleApiCall
}