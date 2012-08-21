var Battle = function Battle() {
  this._isAborted = false;
  this._isPaused = false;
}

Battle.prototype.setup = function setup(battlingRobots, battleProperties, paused) {
  this._isPaused = paused || false;

  console.log("----------------------------------------------------------------")
  console.dir(battleProperties)
  // Set up the battle rules based on the properties
  this.battleRules = _createRules(this, battleProperties.battlefieldWidth,
      battleProperties.battlefieldHeight, battleProperties.numRounds, battleProperties.gunCoolingRate,
      battleProperties.inactivityTime, battleProperties.hideEnemyNames);
}

var _createRules = function _createRules(self, width, height, numRounds, gunCoolingRate, inactivityTime, hideEnemyNames) {

}

Battle.prototype.start = function start() {
  _run(this);
}

var _run = function _run(self) {
  try {
    _initalizeBattle(self);

    while(!self.isAborted() && self.roundNum < self.getNumRound()) {
      try {
        _preloadRound(self);

        _initializeRound(self);

        _runRound(self);

        _finalizeRound(self);

        _cleanRound(self);
      } catch(err) {
        console.log("Exception running a battle round");
        console.dir(err);
      }

      // Update the number of rounds
      self.roundNum = self.roundNum + 1;
    }
  } catch(err) {
    console.log("Exception a battle");
    console.dir(err);
  }
}

var _initalizeBattle = function _initalizeBattle(self) {

}

Battle.prototype.isDone = function isDone() {
  return true;
}

Battle.prototype.isAborted = function isAborted() {
  return this._isAborted;
}

exports.Battle = Battle;