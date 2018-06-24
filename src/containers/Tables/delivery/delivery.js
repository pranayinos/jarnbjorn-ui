const tableData = JSON.parse(
    `
    [
      {
          "id": 1,
          "hasReturn": true,
          "specialInstructions": "new order",
          "orderCreatedTime": 1526827833135,
          "status": "OPEN",
          "cod": true,
          "driverDetails": "Ritesh Mohan",
          "pickups": [
              {
                  "id": 1,
                  "address": "Flat 103, Maa Gokulayam Appartments, Whitefeild Bengaluru",
                  "landmark": "Sheetharampalya Lake",
                  "latitude": 17.1234,
                  "longitude": 23.12131,
                  "name": "name2",
                  "phone": 9908801234,
                  "pickupTime": null
              }
          ],
          "deliveries": [
              {
                  "id": 1,
                  "address": "Flat 103, Maa Gokulayam Appartments, Whitefeild Bengaluru",
                  "deliveryTime": 1234,
                  "landmark": "landmark",
                  "latitude": 12.1234,
                  "longitude": 13.12131,
                  "name": "name",
                  "phone": 9908804321
              },
              {
                  "id": 2,
                  "address": "Flat B33, Mantri Insignia, BTM Layout, Bengaluru",
                  "deliveryTime": 12345,
                  "landmark": "landmark4",
                  "latitude": 12.1009,
                  "longitude": 13.10031,
                  "name": "nam4e",
                  "phone": 9908804321
              }
          ],
          "user": null
      },
      {
          "id": 2,
          "hasReturn": true,
          "specialInstructions": "No sauce",
          "orderCreatedTime": 1527750860677,
          "status": "OPEN",
          "cod": false,
          "driverDetails": "Raja Ram Singh",
          "pickups": [
              {
                  "id": 2,
                  "address": "Flat B33, Mantri Insignia, BTM Layout, Bengaluru",
                  "landmark": "Somethinf",
                  "latitude": 17.1234,
                  "longitude": 23.12131,
                  "name": "name2",
                  "phone": 9908801234,
                  "pickupTime": null
              }
          ],
          "deliveries": [
              {
                  "id": 3,
                  "address": "address",
                  "deliveryTime": 1234,
                  "landmark": "landmark",
                  "latitude": 12.1234,
                  "longitude": 13.12131,
                  "name": "name",
                  "phone": 9162975876
              }
          ],
          "user": null
      }
  ]`,
  );
  const sortOption = {};
  class delivery {
    constructor(size) {
      this.size = size || 2000;
      this.datas = [];
      this.sortKey = null;
      this.sortDir = null;
    }
    dataModel(index) {
      return tableData[index];
    }
    getObjectAt(index) {
      if (index < 0 || index > this.size) {
        return undefined;
      }
      if (this.datas[index] === undefined) {
        this.datas[index] = this.dataModel(index);
      }
      return this.datas[index];
    }
    getAll() {
      if (this.datas.length < this.size) {
        for (let i = 0; i < this.size; i++) {
          this.getObjectAt(i);
        }
      }
      return this.datas.slice();
    }
  
    getSize() {
      return this.size;
    }
    getSortAsc(sortKey) {
      sortOption.sortKey = sortKey;
      sortOption.sortDir = 'ASC';
      return this.datas.sort(this.sort);
    }
    getSortDesc(sortKey) {
      sortOption.sortKey = sortKey;
      sortOption.sortDir = 'DESC';
      return this.datas.sort(this.sort);
    }
    sort(optionA, optionB) {
      const valueA = optionA[sortOption.sortKey].toUpperCase();
      const valueB = optionB[sortOption.sortKey].toUpperCase();
      let sortVal = 0;
      if (valueA > valueB) {
        sortVal = 1;
      }
      if (valueA < valueB) {
        sortVal = -1;
      }
      if (sortVal !== 0 && sortOption.sortDir === 'DESC') {
        return sortVal * (-1);
      }
      return sortVal;
    }
  }
  export default delivery;
  