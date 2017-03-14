Feature: Intrusion Detector service
	As a sysadmin I want to monitor attempts to
	access confidential information

	Scenario: Register incoming request
		When the system get an Incoming request
		Then I see "0" requests in the "Intrusion" database

	Scenario: Register insecure incoming request
		When the system gets an Incoming insecure request
		Then I see "1" requests in the "Intrusion" database
