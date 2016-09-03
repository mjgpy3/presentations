function incrementCounts(input) {
  var results = [];

  for (var i = 0; i < input.length; i++) {
    if ('counts' in input[i]) {
      results.push(
        { counts: input[i].counts + 1 }
      );
    }
  }

  return results;
}

module.exports.incrementCounts = incrementCounts;
