const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

console.log("Servers:", dns.getServers());

dns.resolveSrv(
  "_mongodb._tcp.personal-portfolio.e1ftegb.mongodb.net",
  (err, records) => {
    if (err) {
      console.error("SRV Error:", err);
    } else {
      console.log("SRV Records:", records);
    }
  }
);