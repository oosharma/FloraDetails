const rp = require("request-promise-native");
let getOptions = {
  uri: "http://127.0.0.1:3001/api/items",
  json: true
};
let postOptions = {
  method: "POST",
  uri: "http://127.0.0.1:3001/api/users",
  body: {
    name: "Abhishek Sharma",
    email: "asharma333@gmail",
    password: "123455"
  },
  headers: {
    "content-type": "application/json"
  },
  json: true
};

let authTest = {
  method: "POST",
  uri: "http://127.0.0.1:3001/api/auth",
  body: {
    email: "asharma333@gmail",
    password: "123455"
  },
  headers: {
    "content-type": "application/json"
  },
  json: true
};

(async function activityCycle() {
  console.log(`Initial get of items`);
  let msg = await rp(authTest)
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
