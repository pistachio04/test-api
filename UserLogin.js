const { it } = require("mocha");
const common = require("mocha/lib/interfaces/common");

const request = require("supertest")("http://restapi.adequateshop.com/api");
const expect = require("chai").expect;


describe("POST ", function () {
  let token;
  let userId;
  let nameUser;
  let newNameUser;
  let nameUserUpdate;

    it("user login", async function () {
      const response = await request
        .post("/authaccount/login")
        .send({
          "email": "belajar99@gmail.com",
          "password": "password23"
        });
        
        
        expect(response.status).to.eql(200);
        expect(response.body.message).to.eql("success");
        nameUser = response.body.data.name;
        expect(response.body.data.name).to.eql(nameUser);
        token = response.body.data.Token;
    });


    //GANTI EMAIL TERLEBIH DAHULU AGAR TIDAK ERORR
    it("create new user", async function () {
      const response = await request
        .post("/users")
        .send({
          "name": "Prasetyo",
          "email": "prasetyo66@gmail.com",
          "location":"USA"
        })
        
        .set({ 'Authorization': `Bearer ${token}` });
        console.log(response.body)
        expect(response.status).to.eql(201);
        newNameUser = response.body.name;
        expect(response.body.name).to.eql(newNameUser);
        userId = response.body.id;
    });

    it("get user by id", async function () {
      const response = await request
        .get(`/users/${userId}`)
        .set({ 'Authorization': `Bearer ${token}` });
        
        console.log(response.body)
        expect(response.status).to.eql(200);
        expect(response.body.id).to.eql(userId);
    });

    //JANGAN LUPA UPDATE EMAIL AGAR TIDAK ERROR
    it("update user", async function () {
      const response = await request
        .post(`/users/${userId}`)
        .send({
          "id": userId,
	        "name":"Prasetyo Edited",
	        "email":"ngantuukk88@gmail.com",
	        "location":"USA"
        })
        .set({ 'Authorization': `Bearer ${token}` });
        // console.log(response.body)
        expect(response.status).to.eql(201);
        nameUserUpdate = response.body.name;
        expect(response.body.name).to.eql(nameUserUpdate);
    });
  });