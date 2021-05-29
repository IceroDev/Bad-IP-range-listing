const axios = require("axios");
const fs = require("fs");
var output = require("./ips.json");

var asn = require("./bad_asn.json").list;
var stringrep = "";
var i = 0;
var j = 0;
asn.forEach((as) => {
  i++;
  axios.get("https://asn.ipinfo.app/api/json/list/AS" + as).then((response) => {
    let ips = response.data.list;
    ips.forEach((element) => {
      j++;
      stringrep = stringrep + element + "\n";
    });
    fs.writeFile("ipranges.txt", stringrep + "\n", function (err) {
      if (err) return console.log(err);
      console.log("J'écris pour l'ASN AS" + as);
    });
  });
});
setTimeout(function () {
  console.log(`J'ai listé ${j} ranges IP pour un total de ${i} ASN`);
}, 10000);
