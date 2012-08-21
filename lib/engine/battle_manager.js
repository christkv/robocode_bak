var Battle = require("./battle/battle").Battle;

var BattleManager = function BattleManager(properties, repositoryManager, hostManager, cpuManager, battleEventDispatcher, recordManager) {
  // Internal values
  this.pauseCount = 0;
  // All the managers and properties
  this.properties = properties;
  this.repositoryManager = repositoryManager;
  this.hostManager = hostManager;
  this.cpuManager = cpuManager;
  this.battleEventDispatcher = battleEventDispatcher;
  this.recordManager = recordManager;
}

BattleManager.prototype.startNewBattle = function startNewBattle(spec, initialPositions, waitTillOver, enableCLIRecording) {
  console.log("========================================================= startNewBattle")
  console.dir(spec)

  this.battleProperties = {
    battlefieldWidth: spec.getBattlefield().width,
    battlefieldHeight: spec.getBattlefield().height,
    gunCoolingRate: spec.gunCoolingRate,
    inactivityTime: spec.inactivityTime,
    numRounds: spec.numRounds,
    hideEnemyNames: spec.hideEnemyNames,
    selectedRobots: spec.getRobots(),
    initialPositions: spec.initialPositions
  }

  var robots = this.repositoryManager.loadSelectedRobots(spec.getRobots());
  _startNewBattle(this, robots, waitTillOver, enableCLIRecording);
}

var _startNewBattle = function _startNewBattle(self, battlingRobots, waitTillOver, enableCLIRecording) {
  self.stop(true);

  console.log("Preparing battle...");

  var recording = (self.properties.optionsCommonEnableReplayRecording) || (enableCLIRecording || false);
  if(recording) {
    self.recordManager.attachRecorder(self.battleEventDispatcher);
  } else {
    self.recordManager.detachRecorder();
  }

  // Create new battle
  var _battle = new Battle()
  _battle.setup(battlingRobots, self.battleProperties, self.isPaused());
  // Set the current battle
  this.battle = _battle;

  // Start the battle
  this.battle.start();
  if(waitTillOver) {
    while(!this.battle.isDone());
  }
}

BattleManager.prototype.isPaused = function isPaused() {
  return this.pauseCount != 0;
}

BattleManager.prototype.stop = function stop(waitTillOver) {
  if(this.battle != null && this.battle.isRunning()) this.battle.stop(waitTillOver);
}

exports.BattleManager = BattleManager;