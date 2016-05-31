var Reel = function(index, options) {
  this.id = index + 1;
  this.options = options || [];
  this.result = options.length ? Math.floor(Math.random() * options.length) : null;
  this.rounds = 1 + Math.floor(Math.random() * 2);

  var elmId = '#reel'+this.id;
  var that = this;
  var htmlString = '';
  
  for (var i=0; i < options.length; ++i) {
    htmlString += '<figure class="' + options[i].replace(/\s/, '-') +'">' + options[i] + '</figure>';
  }
  $(elmId).html(htmlString.repeat(3));
  this.spin = function() {
    $({deg: 0}).animate({deg: 40 * this.result + 360 * this.rounds}, {
      duration: 8000,
      step: function(now) {
        $(elmId).css({
          transform: 'rotateX(' + now + 'deg)'
        });
      },
      complete: function() {
        that.promise.resolve();
      }
    });
  };
};

var SlotMachine = function(reels, msgs) {
  this.reels = [];
  this.winningMsgs = msgs;
  this.isWinner = null;
  for(var i = 0; i < reels.length; ++i) {
    this.reels.push(new Reel(i, reels[i]));
  }

  var that = this;
  this.start = function() {
    var promises = [];
    for (var i = 0; i < this.reels.length; ++i) {
      this.reels[i].spin();
      this.reels[i].promise = $.Deferred();
      promises.push(this.reels[i].promise);
		}
    $.when.apply(null, promises).done(function(results) {
      that.check();
    });
  };

  this.check = function(){
    for (var i = 1; i < this.reels.length; ++i) {
      if (this.reels[i].result !== this.reels[0].result) {
        break;
      }
    }
    if (i === this.reels.length) {
      $('.result').html(this.winningMsgs[this.reels[0].result]);
    }
    $('#end').css('display', 'block');
  };

  $('.start-btn').click(function() {
    $('#start').css('opacity', '0');
    that.start();
  });
};

$(new SlotMachine([['coffee maker', 'teapot', 'espresso machine'],
                  ['coffee filter', 'tea strainer', 'espresso tamper'],
                  ['coffee grounds', 'tea', 'espresso beans']],
                  ['Enjoy your coffee!', 'Enjoy an espresso shot!', 'Enjoy a cup of tea!'])
                );