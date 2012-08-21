var RepositoryManager = require('./repository_manager').RepositoryManager,
  BattleManager = require('./battle_manager').BattleManager,
  RecordManager = require('./record_manager').RecordManager,
  CPUManager = require('./cpu_manager').CPUManager;

var RobocodeEngine = function RobocodeEngine(battleAdaptor, repositorySource) {
  this.battleAdaptor = battleAdaptor;
  this.repositoryManager = new RepositoryManager(repositorySource);

  // Init the engine
  _init(this);

  // Set up the battle manager
  this.battleManager = new BattleManager(this.properties, this.repositoryManager, this.hostManager, this.cpuManager, this.battleEventDispatcher, this.recordManager)
}

var _init = function _init(self) {
  // Properties
  var defaultCpuProperties = {
    cpuConstant: 26267236
    // cpuConstant: -1
  };

  // All manager
  self.properties = {};
  self.hostManager = {};
  self.cpuManager = new CPUManager(defaultCpuProperties);
  self.battleEventDispatcher = {};
  self.recordManager = new RecordManager();
  // Init the structures
  self.cpuManager.getCpuConstant();
}

RobocodeEngine.prototype.getLocalRepository = function getLocalRepository(selectedRobots) {
  // Refresh the repository
  this.repositoryManager.refresh();
  // Return the list of robots
  return this.repositoryManager.loadSelectedRobots(selectedRobots);
}

RobocodeEngine.prototype.runBattle = function runBattle(battleSpecification, initialPositions, waitTillOver) {
  console.log("---------------------------------------------------------------- runBattle")
  this.battleSpecification = battleSpecification;
  this.battleManager.startNewBattle(battleSpecification, initialPositions, waitTillOver, false);
}

exports.RobocodeEngine = RobocodeEngine;