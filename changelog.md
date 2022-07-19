# Changelog

## [2.0.0] - 2022-07-19

### Added

* All application is refactored leveraging [mui](https://mui.com/) 

## [1.0.3] - 2022-07-18

### Changed

* a lot of refactor preparing for the local/global voting

## [1.0.2] - 2022-07-13

### Added

* Disaster recovery: you will always have your already answered questions even if
  + you reload the tab
  + you close the browser
  + you restart your mac
  + This backup is only deleted when:
    - you click on the red button
    - you download all the data by the end of the session
* If you hit back/reload by error, the SAF tool will alert you before leaving the page
* Live notes could be provided for each question
* All question information (initially provided in the google spreadsheet) can now be shown for each question
* A full details of analyses are now available to be exported
  + there is a built-in table which contains all user answers along with provided notes

### Changed

* Change SAF stripe style
