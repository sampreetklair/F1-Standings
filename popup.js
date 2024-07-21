document.addEventListener('DOMContentLoaded', function() {
  const driverStandingsElement = document.getElementById('driver-list');
  const constructorStandingsElement = document.getElementById('constructor-list');
  const driverButton = document.getElementById('driver-button');
  const constructorButton = document.getElementById('constructor-button');
  const driverStandingsDiv = document.getElementById('driver-standings');
  const constructorStandingsDiv = document.getElementById('constructor-standings');

  fetch('https://ergast.com/api/f1/current/driverStandings.json')
    .then(response => response.json())
    .then(data => {
      const driverStandings = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;

      driverStandings.forEach(driver => {
        const listItem = document.createElement('li');
        listItem.textContent = `${driver.position}. ${driver.Driver.givenName} ${driver.Driver.familyName} (${driver.Constructors[0].name}) - ${driver.points} points`;
        driverStandingsElement.appendChild(listItem);
      });
    });

  fetch('https://ergast.com/api/f1/current/constructorStandings.json')
    .then(response => response.json())
    .then(data => {
      const constructorStandings = data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;

      constructorStandings.forEach(constructor => {
        const listItem = document.createElement('li');
        listItem.textContent = `${constructor.position}. ${constructor.Constructor.name} - ${constructor.points} points`;
        constructorStandingsElement.appendChild(listItem);
      });
    });

  driverButton.addEventListener('click', () => {
    driverStandingsDiv.style.display = 'block';
    constructorStandingsDiv.style.display = 'none';
  });

  constructorButton.addEventListener('click', () => {
    driverStandingsDiv.style.display = 'none';
    constructorStandingsDiv.style.display = 'block';
  });
});
