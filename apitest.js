const rp = require("request-promise-native");
let getItems = {
  uri: "http://127.0.0.1:3001/api/items",
  json: true
};
let addItems = {
  uri: "http://127.0.0.1:3001/api/items",
  method: "POST",
  headers: {
    "content-type": "application/json",

    "x-auth-token":
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlYzFhYWM0OTE1ZTBlMmRlMDYzZTZmNyIsImlhdCI6MTU4OTc1MzI4OCwiZXhwIjoxNTg5NzU2ODg4fQ.CqOY_IZTrUMuqzQjprRR8eiUS4gemzv1O2ODRjhqFY4"
  },
  body: {
    commonName: "test name",
    bloomTime: "Spring, Summer",
    plantType: "Grass",
    appropriateLocation: "Sidewalk, Garden",
    waterNeeds: "Low",
    sizeAtMaturity: "1-3 ft",
    suitableSiteConditions: "Sun, Part Shade"
  },
  json: true
};
let addUser = {
  method: "POST",
  uri: "http://127.0.0.1:3001/api/users",
  body: {
    name: "test user Sharma",
    email: "ash@gmail",
    password: "123455"
  },
  headers: {
    "content-type": "application/json"
  },
  json: true
};

// {
//   id: idToBeAdded,
//   commonName: commonName,
//   bloomTime: this.state.addbloomTime,
//   plantType: this.state.addplantType,
//   appropriateLocation: this.state.addappropriateLocation,
//   waterNeeds: this.state.addwaterNeeds,
//   sizeAtMaturity: this.state.addsizeAtMaturity,
//   suitableSiteConditions: this.state.addsuitableSiteConditions
// }
// let userUpdate = (name, email, password) => {
//   const config = this.tokenConfig();
//   const body = JSON.stringify({ name, email, password });
//   console.log({ body });
//   axios
//     .post("api/users", body, config)
//     .then(res => {
//       this.registerSuccess(res.data);
//     })
//     .catch(err => {
//       //  errorUpdate(err);
//       this.updateError(err, "REGISTER_FAIL");
//     });
// };

let userUpdate = {
  method: "POST",
  uri: "http://127.0.0.1:3001/api/userItem",
  body: {
    filter: { email: "abc" },
    update: {
      items: [
        {
          id: 1,
          commonName: "ssss",
          bloomTime: "dfd",
          plantType: "ddd",
          appropriateLocation: "ddd",
          waterNeeds: "ddd",
          sizeAtMaturity: "ddd",
          suitableSiteConditions: "ddd"
        }
      ]
    }
  },
  headers: {
    "content-type": "application/json"
  },
  json: true
};

let testUser = {
  method: "POST",
  uri: "http://127.0.0.1:3001/api/auth",
  body: {
    email: "usernew@gmail",
    password: "123455"
  },
  headers: {
    "content-type": "application/json"
  },
  json: true
};

let authGetUser = {
  method: "GET",
  uri: "http://127.0.0.1:3001/api/auth/user",

  headers: {
    "content-type": "application/json",

    "x-auth-token":
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlYzFhYWM0OTE1ZTBlMmRlMDYzZTZmNyIsImlhdCI6MTU4OTc1MzI4OCwiZXhwIjoxNTg5NzU2ODg4fQ.CqOY_IZTrUMuqzQjprRR8eiUS4gemzv1O2ODRjhqFY4"
  },
  json: true
};

(async function activityCycle() {
  console.log(`Initial get of items`);
  let msg = await rp(userUpdate)
    .then(function(data) {
      //   let msg = `${data.events.length} number of activities`;

      //   data.events.forEach(function(event, i) {
      //     msg += `Event ${i + 1} name ${event.name}, dates: ${event.dates} \n`;
      //   });
      return data;
    })
    .catch(function(err) {
      console.log(`Error: ${err}`);
    });
  console.log(msg);
})();
