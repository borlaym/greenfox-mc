Feature: Cache Service

	We keep track of different numbers in a cache

	Scenario: I request the amount of a given key
	When I request the key
	Then I get the amount
	Then I can increment a value
