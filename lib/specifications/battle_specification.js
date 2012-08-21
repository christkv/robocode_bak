var BattlefieldSpecification = require('./battlefield_specification').BattlefieldSpecification;

var BattleSpecification = function BattleSpecification(numRounds, inactivityTime, gunCoolingRate, hideEnemyNames, battlefieldSpec, robots) {
  this.battlefieldWidth = battlefieldSpec ? battlefieldSpec.width : 0;
  this.battlefieldHeight = battlefieldSpec ? battlefieldSpec.height : 0;
  this.numRounds = numRounds || 0;
  this.gunCoolingRate = gunCoolingRate || 0.1;
  this.inactivityTime = inactivityTime || 450;
  this.hideEnemyNames = hideEnemyNames || false;
  this.robots = robots || [];
}

BattleSpecification.prototype.getBattlefield = function getBattlefield() {
  return new BattlefieldSpecification(this.battlefieldWidth, this.battlefieldHeight);
}

BattleSpecification.prototype.getRobots = function getRobots() {
  this.robots.slice(0);
}

exports.BattleSpecification = BattleSpecification;