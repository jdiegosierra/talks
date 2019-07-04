
process.env.NODE_ENV = 'test';

const { assert, expect, should } = require('chai');
const chaiHttp = require('chai-http');
const converter = require("../routes/events");

let server = require('../server');

chai.use(chaiHttp);

describe("Events", function () {
  describe('/POST', () => {
    it('it should store the event in the smarcontract', (done) => {
      chai.request(server)
        .post('/events')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });
  
  // describe("GET", function () {
  //   it("Get de basic event", function () {

  //   });
  // });
});