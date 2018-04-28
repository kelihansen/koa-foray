const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');

describe('Bird API', () => {

    before(() => dropCollection('birds'));

    let hummingbird = {
        scientificName: 'Calypte anna',
        colors: ['magenta', 'gray', 'red']        
    };

    it('saves a bird', () => {
        return request.post('/birds')
            .send(hummingbird)
            .then(({ body }) => {
                const { _id, __v } = body;
                assert.ok(_id);
                assert.strictEqual(__v, 0);
                assert.deepEqual(body, {
                    ...hummingbird,
                    _id, __v
                });
                hummingbird = body;
            });
    });
});