var APPROXIMATE_CYCLES_ALLOWED = 6250;
var TEST_PERIOD_MILLIS = 5000;

var CPUManager = function CPUManager(properties) {
  this.properties = properties;
  this.cpuConstant = -1;
}

CPUManager.prototype.getCpuConstant = function getCpuConstant() {
  if(this.cpuConstant == -1) {
    this.cpuConstant = this.properties.cpuConstant;

    if(this.cpuConstant == -1) {
      _setCpuConstant(this);
    }
  }
}

var _setCpuConstant = function _setCpuConstant(self) {
  var count = 0;
  var d = 0;

  // Get the calculate options
  var start = new Date().getTime();
  while(new Date().getTime() - start < TEST_PERIOD_MILLIS) {
    d += Math.hypot(Math.sqrt(Math.abs(Math.log(Math.atan(Math.random())))),
          Math.cbrt(Math.abs(Math.random() * 10))) / Math.exp(Math.random());
    count++;
  }
  // Set the cpu constant
  this.cpuConstant = Math.max(1, Math.round(1000000.0 * APPROXIMATE_CYCLES_ALLOWED * TEST_PERIOD_MILLIS / count));
}

Math.hypot = function(x, y) {
  return Math.sqrt(x*x + y*y);
}

Math.sign = function(x) {
 return x === 0 ? 0 : x > 0 ? +1 : -1;
};

Math.cbrt = function(x) {
 return Math.sign(x) * Math.pow(Math.abs(x), 1 / 3);
};

exports.CPUManager = CPUManager;