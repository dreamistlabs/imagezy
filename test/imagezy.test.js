var assert = chai.assert;

describe('Array', function() {
  it('should start empty', function() {
    var arr = [];
    assert.equal(arr.length, 0);
	});
});

describe('something', function() {
	for (var i = 0; i < 5; i++) {
		var image = document.createElement('img');
		image.classList.add('imagezy-img');
		document.body.appendChild(image);
	}

	it('something that is something', function() {
		initializeImagezy();
		// var imagezys = document.querySelectorAll('.imagezy-img');
		assert.equal(imagezys.length, 5);
	});

	it('something', function() {
		var imagezy = document.createElement('div');

		assert.equal(imagezy.nodeName, 'DIV');
	});
});