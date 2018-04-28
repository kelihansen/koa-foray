const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');

describe('Bird API', () => {

    before(() => dropCollection('birds'));

    let hummingbird = {
        scientificName: 'Calypte anna',
        colors: ['magenta', 'gray', 'red']        
    };

    let crow = {
        scientificName: 'Corvus brachyrhynchos',
        colors: ['black']
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

    it('gets all birds', () => {
        return request.post('/birds')
            .send(crow)
            .then(({ body }) => {
                crow = body;
                return request.get('/birds')
                    .then(({ body }) => {
                        assert.deepEqual(body, [hummingbird, crow]);
                    });
            });
    });
});