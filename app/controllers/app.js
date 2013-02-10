var App,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

App = (function(_super) {

  __extends(App, _super);

  App.prototype.count = 0;

  App.prototype.start = 0;

  App.prototype.amount = 50;

  App.prototype.PER_PAGE = 15;

  App.prototype.pageCount = 1;

  App.prototype.jsonCallback = "";

  App.prototype.debug = {
    active: true,
    color: "color:white; background-color:black",
    name: "APP"
  };

  App.prototype.MIN_WIDTH = 200;

  App.prototype.MAX_WIDTH = 200;

  App.prototype.COLUMN_WIDTH = 200;

  App.prototype.GAP = 5;

  App.prototype.SCROLL_OFFSET = 1600;

  App.prototype.currentPlayer = "bernatfortet";

  App.prototype.isLoading = false;

  App.prototype.state = {
    all: "all",
    author: "author",
    tag: "tag",
    single: "single"
  };

  App.prototype.currentState = "all";

  App.prototype.elements = {
    "#Shots": "ShotsDiv"
  };

  function App() {
    this.checkScrolling = __bind(this.checkScrolling, this);    App.__super__.constructor.apply(this, arguments);
    console.log("App Controller initialised");
    this.fetchPlayerLikes(this.currentPlayer);
    this.layout();
    $(document).scroll(this.checkScrolling);
  }

  App.prototype.layout = function() {
    return this.ShotsDiv.masonry({
      itemSelector: '.Shot',
      columnWidth: this.COLUMN_WIDTH,
      gutterWidth: this.GAP,
      isResizable: true,
      isFitWidth: true
    });
  };

  App.prototype.setColumnWidth = function() {
    var columns, extraSpace, newWidth, width;
    width = this.ShotsDiv.width();
    columns = Math.floor(width / this.MIN_WIDTH);
    newWidth = columns * this.MIN_WIDTH + this.GAP * (columns - 1);
    extraSpace = width - newWidth;
    return this.COLUMN_WIDTH = this.MIN_WIDTH + (extraSpace / columns - this.GAP * (columns - 1)) >= this.MIN_WIDTH ? void 0 : this.MIN_WIDTH;
  };

  App.prototype.checkScrolling = function() {
    var bottomPos, scrollPos;
    bottomPos = this.ShotsDiv.outerHeight();
    scrollPos = $(window).scrollTop();
    if (scrollPos + $(window).height() * 3 >= bottomPos && !this.isLoading) {
      console.log("fectich more likes after scrol");
      this.fetchPlayerLikes(this.currentPlayer);
      return this.checkScrolling();
    }
  };

  App.prototype.createShots = function(shots) {
    var shot, _i, _len;
    console.log(shots);
    for (_i = 0, _len = shots.length; _i < _len; _i++) {
      shot = shots[_i];
      this.createShot(shot);
    }
    return this.isLoading = false;
  };

  App.prototype.createShot = function(shot) {
    var shotController, shotModel;
    if (!Shot.exists(shot.id)) {
      shotModel = Shot.create(shot);
      return shotController = new ShotsController({
        el: this.ShotsDiv,
        item: shotModel
      });
    }
  };

  App.prototype.renderShots = function(shots) {
    var shot, _i, _len, _results;
    console.log(shots);
    _results = [];
    for (_i = 0, _len = shots.length; _i < _len; _i++) {
      shot = shots[_i];
      _results.push(this.renderShot(shot));
    }
    return _results;
  };

  App.prototype.renderShot = function(shot) {
    return new ShotsController({
      el: this.ShotsDiv,
      item: shot
    });
  };

  App.prototype.cleanShotss = function() {
    return this.ShotsDiv.masonry('remove', this.ShotsDiv.children()).masonry('reload');
  };

  App.prototype.fetchPlayerLikes = function(playerId) {
    var _this = this;
    console.log("Loading Page: " + this.pageCount + " ");
    $.jribbble.getShotsThatPlayerLikes("bernatfortet", function(data) {
      _this.createShots(data.shots);
      return _this.checkScrolling();
    }, {
      page: this.pageCount,
      per_page: this.PER_PAGE
    });
    this.isLoading = true;
    return this.pageCount++;
  };

  return App;

})(Spine.Controller);
