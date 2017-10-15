'use strict';
var submitButton = document.getElementById('new-store');
var time = ['6am', '7am','8am', '9am', '10am','11am', '12am','1pm','2pm', '3pm', '4pm','5pm', '6pm' , '7pm', '8pm'];

var storeTable = document.getElementById('location');
var pikePlace = new Stores('Pike Place', 23, 65, 6.3);
var seaTac = new Stores('SeaTac', 3, 24, 1.2);
var seaCenter = new Stores('Seattle Center', 11, 38, 3.7);
var capHill = new Stores('Capitol Hill', 20, 38, 2.3);
var alki = new Stores('Alki', 2, 16, 4.2);

var allLocations = [pikePlace, seaTac, seaCenter, capHill, alki];

function Stores(name, minCustomers, maxCustomers, avgCookiesPerSale){
  this.name = name;
  this.minCustomers = minCustomers;
  this.maxCustomers = maxCustomers;
  this.avgCookiesPerSale = avgCookiesPerSale;
  this.customersPerHour = [];
  this.calcCookiesSoldEachHourArray = [];
  this.totalCookiesPerDay = 0;
  this.calcCustomersPerHour = function() {
    for (var i = 0; i < time.length; i++) {
      this.customersPerHour.push(Math.floor(Math.random() * (this.maxCustomers - this.minCustomers + 1)) + this.minCustomers);
    }
    //allLocations.push(this);
  };
  this.calcCookiesSoldEachHour = function() {
    this.calcCustomersPerHour();
    for(var i = 0; i < time.length; i++){
      this.calcCookiesSoldEachHourArray.push(Math.ceil(this.customersPerHour[i] * this.avgCookiesPerSale));// <-- the [i] pulls from each hour
      this.totalCookiesPerDay += this.calcCookiesSoldEachHourArray[i];
      //console.log(this.totalCookiesPerDay, 'Cookies sold each day');
    }

  };
  //
  this.render = function() {
    this.calcCookiesSoldEachHour();
    var trEl = document.createElement('tr');
    var tdEl = document.createElement('td');
    tdEl.textContent = name; //store name
    tdEl.className = 'loc';
    trEl.appendChild(tdEl);
    for(var i = 0; i < time.length; i++){
      tdEl = document.createElement('td');
      tdEl.textContent = this.calcCookiesSoldEachHourArray[i];
      trEl.appendChild(tdEl);
    }
    tdEl = document.createElement('td');
    tdEl.textContent = this.totalCookiesPerDay;
    trEl.appendChild(tdEl);
    storeTable.appendChild(trEl);

  };

};
function sumUpHrs(){
  var trEl = document.createElement('tr');
  var tdEl = document.createElement('td');
  tdEl.textContent = 'Total that Hr';
  tdEl.className = 'tot';
  trEl.appendChild(tdEl);
  for(var i = 0; i < time.length; i++){
    tdEl = document.createElement('td');
    var totalHrCookie = 0;
    for(var j = 0; j < allLocations.length; j++){
      totalHrCookie += allLocations[j].calcCookiesSoldEachHourArray[i];

    }
    tdEl.textContent = totalHrCookie;
    tdEl.className = 'totHr';
    trEl.appendChild(tdEl);
  }
  storeTable.appendChild(trEl);

}
function myStores(){
  storeTable.innerHTML = '';
  makeHeaderRow();
  for(var i = 0; i < allLocations.length; i++){
    allLocations[i].render();
  }
  sumUpHrs();

}

function makeHeaderRow(){
  var trEl = document.createElement('tr');
  var thEl = document.createElement('th');
  thEl.textContent = 'Location';
  trEl.appendChild(thEl);

  for(var i = 0; i < time.length; i++){
    thEl = document.createElement('th');
    thEl.textContent = time[i];
    trEl.appendChild(thEl);
  }
  thEl = document.createElement('th');
  thEl.textContent = 'total';
  trEl.appendChild(thEl);
  storeTable.appendChild(trEl);
}

makeHeaderRow();

pikePlace.render();

seaTac.render();

seaCenter.render();

capHill.render();

alki.render();

sumUpHrs();

function handleNewStoreSubmit(event) {
  event.preventDefault();
  var name = event.target.newStoreName.value;
  var minCustomers = parseInt(event.target.newMinCustomers.value);
  var maxCustomers = parseInt(event.target.newMaxCustomers.value);
  var avgCookiesPerSale = parseInt(event.target.newAvgCookiesPerSale.value);
  var newStore = new Stores(name, minCustomers, maxCustomers, avgCookiesPerSale);
  allLocations.push(newStore);

  myStores();
}

submitButton.addEventListener('submit', handleNewStoreSubmit);
