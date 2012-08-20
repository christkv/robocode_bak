var inherits = require('util').inherits,
  RobocodeEngine = require('../../lib/engine/robocode_engine').RobocodeEngine,
  BattleAdaptor = require('../../lib/adaptors/battle_adaptor').BattleAdaptor,
  BattlefieldSpecification = require('../../lib/specifications/battlefield_specification').BattlefieldSpecification,
  BattleSpecification = require('../../lib/specifications/battle_specification').BattleSpecification;

exports.setUp = function(callback) {
  callback();
}

exports.tearDown = function(callback) {
  callback();
}

// Test the error reporting functionality
exports["Should correctly test the position of two tanks"] = function(test) {
  // The test
  var TestPosition = function() {
    RobocodeTestBed.call(this);
  }

  // Inherit basics
  inherits(TestPosition, RobocodeTestBed);

  // Create test case
  var testCase = new TestPosition();
  // Override the round started
  var onRoundStarted = testCase.onRoundStarted;
  testCase.onRoundStarted = function(event) {
    onRoundStarted.call(testCase, event);

    console.dir("========================================================= onRoundStarted")
    console.dir(event);
  }

  // Override the turn ended
  var onTurnEnded = testCase.onTurnEnded;
  testCase.onTurnEnded = function(event) {
    onTurnEnded.call(testCase, event);

    console.dir("========================================================= onTurnEnded")
    console.dir(event);
  }

  // Override the run event
  var _run = testCase.run;
  testCase.run = function() {
    _run.call(testCase);

    console.dir("========================================================= run")
  }

  // Override robots we want to use
  testCase.getRobotNames = function() {
    return "Crazy,Target";
  }

  // Run the test
  testCase.run();

  // Finsh test
  test.done();
}


/***********************************************************************
 *  Robocode test bed
 **********************************************************************/
var RobocodeTestBed = function RobocodeTestBed() {
  BattleAdaptor.call(this);

  var self = this;
  self.messages = 0;
  self.errors = 0;
  self.isDumpingMessages = true;
  // Create a battle field spec
  this.battleFieldSpec = new BattlefieldSpecification();
  // Create an adaptor instance
  var battleAdaptor = new BattleAdaptor();
  // Override some methods
  battleAdaptor.onBattleMessage = function(event) {
    console.dir(event)
    self.messages = self.messages +  1;
  }
  // Override some methods
  battleAdaptor.onBattleError = function(event) {
    console.dir(event)
    self.errors = self.errors +  1;
  }
  // Create an engine
  this.engine = new RobocodeEngine(battleAdaptor);
}

// Inherit basics
inherits(RobocodeTestBed, BattleAdaptor);

RobocodeTestBed.prototype.onTurnEnd = function onTurnEnd(event) {
  return null;
}

RobocodeTestBed.prototype.onBattleStarted = function onBattleStarted(event) {
  return null;
}

RobocodeTestBed.prototype.getRobotNames = function getRobotNames() {
  return null;
}

RobocodeTestBed.prototype.getNumRounds = function getNumRounds() {
  return 1;
}

RobocodeTestBed.prototype.getInitialPositions = function getInitialPositions() {
  return null;
}

RobocodeTestBed.prototype.getExpectedRobotCount = function getExpectedRobotCount(robotList) {
  return robotList.split(/[\\s,;]+/).length;
}

RobocodeTestBed.prototype.isDeterministic = function isDeterministic() {
  return true;
}

RobocodeTestBed.prototype.isCheckOnBattleStart = function isCheckOnBattleStart() {
  return false;
}

RobocodeTestBed.prototype.runSetup = function runSetup() {
}

RobocodeTestBed.prototype.runTeardown = function runTeardown() {
}

RobocodeTestBed.prototype.run = function run() {
  this.runSetup();
  this.runBattle(this.getRobotNames(), this.getNumRounds(), this.getInitialPositions());
  this.runTeardown();
}

RobocodeTestBed.prototype.runBattle = function runBattle(robotList, numRounds, initialPositions) {
  var robotSpecifications = this.engine.getLocalRepository(robotList);

  if (this.getExpectedRobotCount(robotList) > 0) {
    // New battle specification
    var specification = new BattleSpecification(numRounds, this.battleFieldSpec, robotSpecifications);
    // Execute battle
    this.engine.runBattle(specification, initialPositions, true);
  }
}









