const request = require("supertest")("http://restapi.adequateshop.com/api");
const expect = require("chai").expect;

describe("POST /authaccount/registration", function () {
  let nameUser;

    it("regristration new user", async function () {
      const response = await request
        .post("/authaccount/registration")
        .send({
            "name":"Sigid QA",
            "email":"belajar990@gmail.com",
            "password": "password23"
        });
  
      expect(response.status).to.eql(200);
      expect(response.body.message).to.eql("success");
      console.log(response.body);
      nameUser = response.body.data.name;
      expect(response.body.data.name).to.eql(nameUser);  
    });
  });