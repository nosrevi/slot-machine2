var Reel = function(index, options) {
  this.id = index;
  this.options = options || [];
  this.result = options.length ? Math.floor(Math.random() * options.length) : null;
  this.direction = Math.floor(Math.random() * 2) || 0;
  this.rounds = 1 + Math.floor(Math.random() * 2);

  this.spin = function() {
    console.log('spinning' + this.id);
    $('#reel'+this.id).css('animation: spin1 8s linear');
  };
};

var SlotMachine = function(reels, msgs) {
  this.reels = [];
  this.winningMsgs = msgs;
  this.isWinner = null;
  for(var i = 0; i < reels.length; ++i) {
    this.reels.push(new Reel(i, reels[i]));
  }
  console.log(this.reels);
  this.start = function() {
    for (var i = 0; i < this.reels.length; ++i) {
      this.reels[i].spin();
			// speeds[i] = Math.random() + 0.5;
			// r[i] = (Math.random() * 3 | 0) * height / 3;
		}
		// animate();
  };
  this.check = function(){
    for (var i = 1; i < this.reels.length; ++i) {
      if (this.reels[i].result !== this.reels[0].result) {
        break;
      }
    }
    if (i === this.reels.length) {
      $('.result').html(this.winngMsgs[this.reels[0].result]);
    }
  };
  var that = this;
  $('.start-btn').click(function() {
    $('#start').css('opacity', '0');
    that.start();
  });
};

$(new SlotMachine([['coffee maker', 'teapot', 'espresso machine'],
                  ['coffee filter', 'tea strainer', 'espresso tamper'],
                  ['coffee grounds', 'tea', 'espresso beans']],
                  ['Enjoy your coffee!', 'Enjoy a cup of tea!', 'Enjoy an espresso shot!'])
                );