const { assert } = require('chai');
const Bird = require('../lib/models/Bird');

describe('Bird model', () => {
    
    it('is a good, valid model', () => {
        let info = {
            commonName: 'Anna\'s hummingbird',
            scientificName: 'Calypte anna',
            wingspan: '12 cm',
            diet: 'nectar',
            colors: ['magenta', 'gray', 'red']
        };
        const hummingbird = new Bird(info);
        info._id = hummingbird._id;
        assert.deepEqual(hummingbird.toJSON(), info);
        assert.isUndefined(hummingbird.validateSync());
    });

    it('has a required field', () => {
        const bird = new Bird({});
        const { errors } = bird.validateSync();
        assert.equal(errors.scientificName.kind, 'required');
    });

});