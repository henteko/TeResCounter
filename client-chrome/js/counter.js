function Counter() {
  this.count = 0;
  this.$counter = $('#counter');
};
Counter.prototype.increment = function() {
  this.count += 1;
  this.$counter.text(this.count);
};
