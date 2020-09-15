const assert = require("assert")
// const {add} = require("../dist/add.js")
import add from '../src/add.js'

describe('add', function () {
        it('should return -1 when the value is not present', function () {
            assert.equal(add(3,4),7);
        })
});

// test('bar', async t => {
// 	const bar = Promise.resolve('bar');
// 	t.is(await bar, 'bar');
// });