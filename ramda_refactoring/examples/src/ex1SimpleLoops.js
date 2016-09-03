function getCounts(input) {
  var results = [];

  for (var i = 0; i < input.length; i++) {
    if ('counts' in input[i]) {
      results.push(input[i].counts);
    }
  }

  return results;
}

module.exports.getCounts = getCounts;
