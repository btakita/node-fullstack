// TODO: Move to node-riot-fullstack
module.exports = function(tagName, tag, opts) {
  tag.parent = opts.parent || tag.parent;
  tag.on('mount', mount);
  tag.on('unmount', unmount);
  var tags = this.tags;
  function mount() {
    tags[tagName] = tag;
    return tags;
  }
  function unmount() {
    if (tags[tagName] == tag) delete tags[tagName];
  }
  return this.tags;
};
