Feature: Admin
  As a sysadmin I want to know
  the number of requests

Scenario: A request comes in
  When a request comes in to "/ping"
  Then I get "1" for the total number of requests
