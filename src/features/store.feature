Feature: Store
  As a developer I want to be able to access
	a model schema and query on it

Scenario: Get a schema
  When I ask for schema definition "Test"
  Then I can run a query on it
