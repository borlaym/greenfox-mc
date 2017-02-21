Feature: Request Monitor service
  As a sysadmin I want to be able to
  monitor the incoming requests

  Scenario: Register incoming request
    When the system get an Incoming request
    Then I see "1" for "totalIncomingRequests" in the statistics

	Scenario: Get all requests
		When I try to get all requests from the request monitor
		Then it returns the request in an array
