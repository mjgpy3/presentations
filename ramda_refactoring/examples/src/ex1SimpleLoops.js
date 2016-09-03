function getViews(youtubeVideos) {
  var results = [];

  for (var i = 0; i < youtubeVideos.length; i++) {
    if ('views' in youtubeVideos[i]) {
      results.push(youtubeVideos[i].views);
    }
  }

  return results;
}

module.exports.getViews = getViews;
