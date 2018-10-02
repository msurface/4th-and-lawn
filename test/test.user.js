const should = require("should");
const mongoose = require("mongoose");
const db = require("../models");

const User = db.User;

mongoose.Promise = global.Promise;

describe("User", function () {

  before((done) => {
    mongoose.connect("mongodb://localhost/4th-and-long");
    mongoose.connection
    .once("open", () => { done(); })
    .on("error", (error) => {
      console.warn("error", error);
    });
  });

  after((done) => {
    mongoose.connection.close()
    done();
  });

  beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
      const user = new User({
        username: "12345",
        password: "testy",
        firstname: "Ben",
        lastname: "Thomson",
        address: "324 bob",
        phonenumber: "2134328765"
      });
      user.save((error) => {
        if (error) console.log("error" + error.message);
        else console.log("no error");
        done();
      });
    });
  });

  it("find a user by username", (done) => {
    User.findOne({ username: "12345" }, (err, user) => {
      if (err) throw err
      user.username.should.eql("12345");
      console.log("  username: ", user.username)
    });
    done();
  });

  this.afterEach((done) => {
    User.deleteOne({ username: "12345"}, () => {
      done()
    });
  });

});