import assert from "assert";
import add from "../src/add";

describe('Array', function () {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            assert.equal(-1, [1, 2, 3].indexOf(5));
            assert.equal(-1, [1, 2, 3].indexOf(0));
        })
    })
});

describe('add', function () {
        it('should return -1 when the value is not present', function () {
            assert.equal(add(3,4),7);
        })
});
