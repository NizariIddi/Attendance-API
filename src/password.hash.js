const bcrypt = require("bcryptjs");

bcrypt.hash("12345", 10).then(hash => {
  console.log("HASH:", hash);

  bcrypt.compare("12345", hash).then(res => {
    console.log("COMPARE:", res);
  });
});
