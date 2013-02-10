var ShotsController,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

ShotsController = (function(_super) {

  __extends(ShotsController, _super);

  ShotsController.prototype.view = "ShotView";

  function ShotsController() {
    this.onClick = __bind(this.onClick, this);    ShotsController.__super__.constructor.apply(this, arguments);
    this.render();
  }

  ShotsController.prototype.render = function() {
    var height, tmpl;
    tmpl = $("#" + this.view).tmpl(this.item);
    tmpl.css("width", app.COLUMN_WIDTH);
    height = (app.COLUMN_WIDTH * this.item.height) / this.item.width;
    tmpl.css("height", height);
    this.el.append(tmpl).masonry('appended', tmpl);
    this.el = tmpl;
    return this.el.click(this.onClick);
  };

  ShotsController.prototype.fetch = function(userId) {
    return $.get(User.url(userId + Task.url() + ".json")).success(function(response) {
      return Task.refresh(response);
    });
  };

  ShotsController.prototype.remove = function() {
    return this.el.remove();
  };

  ShotsController.prototype.onClick = function() {
    return app.lightbox.show(this.item);
  };

  return ShotsController;

})(Spine.Controller);
