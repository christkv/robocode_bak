var RepositoryManager = require('./repository_manager').RepositoryManager;

var RobocodeEngine = function RobocodeEngine() {
  this.repositoryManager = new RepositoryManager();
}

RobocodeEngine.prototype.getLocalRepository = function getLocalRepository(selectedRobots) {
  // Refresh the repository
  this.repositoryManager.refresh();
  // Return the list of robots
  return this.repositoryManager.loadSelectedRobots(selectedRobots);
}

RobocodeEngine.prototype.runBattle = function runBattle(battleSpecification, initialPositions, waitTillOver) {
  this.battleSpecification = battleSpecification;
}

exports.RobocodeEngine = RobocodeEngine;