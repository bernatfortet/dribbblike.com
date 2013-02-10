var Shot,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

Shot = (function(_super) {

  __extends(Shot, _super);

  function Shot() {
    Shot.__super__.constructor.apply(this, arguments);
  }

  Shot.configure('Shot', 'id', 'index', 'url', 'image_url', 'image_400_url', 'image_teaser_url', 'title', 'width', 'height', 'player');

  Shot.prototype.setup = function() {
    this.index = app.shotCount;
    app.shotCount++;
    return this.save();
  };

  return Shot;

})(Spine.Model);

Shot.bind("create", function(shot) {
  return shot.setup();
});
