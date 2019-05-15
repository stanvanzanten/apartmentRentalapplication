const app = require('../index')
const request = require('supertest')
const chai = require('chai')
expect = chai.expect;
const sql = require('mysql')

const db = sql.createConnection({
    host: 'coolsma.synology.me',
    user: '2019-I14',
    password: '2019-I14',
    database: '2019-i14-appartementen'
});

describe('the user_controller ', () => {
    var user = {
        UserId: "205",
        FirstName: "Tester",
        LastName: "FirstTester",
        StreetAddress: "TestStreet",
        PostalCode: "5126TT",
        City: "Gilze",
        DataOfBirth: "TestStraat",
        PhoneNumber: "0611223344",
        EmailAddress: "test@registerTest.com",
        Password: "testpass"
    }
    var edited = {
        UserId: "205",
        FirstName: "Tester",
        LastName: "FirstTester",
        StreetAddress: "TestStreet",
        PostalCode: "5126TT",
        City: "Breda",
        DataOfBirth: "TestStraat",
        PhoneNumber: "0611553344",
        EmailAddress: "test@registerTest.com",
        Password: "testpass"
    }

    var login = {
        EmailAddress: "test@registerTest.com",
        Password: "testpass"
    }

    it('can get a list of users', (done) => {
        request(app)
            .get('/api/user')
            .end((err, res) => {
                if (err) {
                    console.log(err)
                } else {
                    expect(res.body).to.be.an('Array')
                    expect(res.statusCode).to.equal(200)
                    done()
                }
            })
    })

    it('can register a new user', (done) => {
        request(app)
            .post('/api/user/register')
            .send(user)
            .end((err, res) => {
                if (err) {
                    console.log(err)
                } else {
                    expect(res.statusCode).to.equal(200)
                    expect(res.body.Message).to.equal('User created')
                    let sql = 'SELECT UserId FROM user WHERE email= "test@registerTest.com"'
                    db.query(sql, (err, result) => {
                        var id = result[0].userid
                        request(app)
                            .get('/api/user/id=' + id)
                            .end((err, res) => {
                                expect(res.statusCode).to.equal(200)
                                expect(res.body[0].email).to.equal('test@registerTest.com')
                                done()
                            })
                    })
                }
            })
    })

    it('can get a single user', (done) => {
        request(app)
            .get('/api/user/id=' + 1)
            .end((err, res) => {
                if (err) {
                    console.log(err)
                } else {
                    expect(res.statusCode).to.equal(200)
                    expect(res.body).to.be.an('Array')
                    done()
                }
            })
    })

    it('can edit an existing user', (done) => {
        var token = 'Bearer '
        request(app)
            .post('/api/user/register')
            .send(user)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200)
                expect(res.body.Message).to.equal('User created')
                expect(res.body.auth).to.equal(true)
                token = 'Bearer ' + res.body.token
                let sql = 'SELECT UserId FROM user WHERE EmailAddress= "test@registerTest.com"'
                db.query(sql, (err, result) => {
                    var id = result[0].UserId
                    request(app)
                        .put('/api/user/id=' + id)
                        .set({ 'Authorization': token })
                        .send(edited)
                        .end((err, res) => {
                            expect(res.statusCode).to.equal(200)
                            expect(res.body.Message).to.equal('User edited')
                            done()
                        })

                })

            })
    })

    it('can delete an existing user', (done) => {
        var token = 'Bearer '
        request(app)
            .post('/api/user/register')
            .send(user)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200)
                expect(res.body.Message).to.equal('User created')
                expect(res.body.auth).to.equal(true)
                token = 'Bearer ' + res.body.token
                let sql = 'SELECT UserId FROM user WHERE email= "test@registerTest.com"'
                db.query(sql, (err,result) => {
                    var id = result[0].UserId
                    request(app)
                    .delete('/api/user/id=' + id)
                    .set({ 'Authorization': token })
                    .end((err,res) => {
                        expect(res.statusCode).to.equal(200)
                        request(app)
                        .get('/api/user')
                        .end((err,res) => {
                            expect(res.body).to.be.empty
                            done()
                        })
                    })
                })
                
            })

    })
})