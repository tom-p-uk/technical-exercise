# Technical Exercise

A technical exercise written in Node & React that fulfils the user stories further down the page.

## Running
Provided Docker and Docker Compose are installed, clone the repo, navigate to the root directory and run ```$ docker-compose up```.
Once all of the containers have been built and are running, open your browser and head to ```localhost:8080``` to access the frontend app.

To run the tests, head to the root directory and run ```$ docker-compose -f docker-compose.test.yml -p tech_exercise_testup``` to view the test output in your terminal window.

## User Stories

Create a delivery slot picker which generates a group of dates and delivery slots for selection by a user.

#### Backend
- Generate 4 weeks’ worth of dates and slots from the current date onwards
- Dates are to be grouped into a configurable number of days (e.g., group of 3 days, group of
4 days)
- Sunday is never available and not to be included in the output
- Ensure that a grouping of days is always filled to capacity (e.g., don’t have 1 day alone at the start of a group of 3 with the last 2 missing from the set)
- Simulate (or implement, if you prefer) database entries that indicate a particular date and slot are ‘full’ and mark them as such in the UI
 -- Example:2017-12-01,AM

#### Frontend
- Using your choice of tooling, render the date/slot picker interface based on the generated data into a grid or layout of your choosing
- The display of dates should be by group (e.g., 3 or 4 days at a time) along with their time slots and the groups should be swipeable/scrollable
- Selecting a slot/cell in the grid should indicate that it is selected and persist across any swiping/scrolling of the day groups

#### Extra
- If the first date in the picker has no available slots for any reason, it is removed from the data/UI
- When the date generator is given a flag of your choosing (e.g., indicating a particular type of item in the order being delivered), dates which fall on a Wednesday are unavailable and indicated as such in the UI rather than missing or marked as ‘full’
- The first time slot for the day is never available on every second Friday
