var RepositoryManager = function RepositoryManager(repositorySource) {
  this.repositorySource = repositorySource;
}

RepositoryManager.prototype.loadSelectedRobots = function(selectedRobots) {
  return this.repositorySource.loadSelectedRobots(selectedRobots);
}

RepositoryManager.prototype.refresh = function refresh() {
  this.repositorySource.refresh();
}

/***********************************************************************
 *  Robot specification, contains the data
 **********************************************************************/
var RobotSpecification = function RobotSpecification(specification, name, author, version, robocodeVersion, fullClassName, description) {
  this.specification = specification;
  this.name = name;
  this.author = author;
  this.version = version;
  this.robocodeVersion = robocodeVersion;
  this.fullClassName = fullClassName;
  this.description = description;
}

exports.RepositoryManager = RepositoryManager;
exports.RobotSpecification = RobotSpecification;