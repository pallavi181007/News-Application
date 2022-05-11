const User = require('../controller/models/User');
const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp); 


    it('Route', (done) =>{
        chai.request(app)
        .get('/')
        .end((err,res) => {
            res.should.have.status(200);
            done();
        });
    });


    it(' Landing page ', (done) => {
        
        chai.request(app)
        .get('/') 
        .end((err, res) => {
            res.should.have.status(200);
           
            done();
        });
    });

    it('GET all users from the DB', (done) => {
        chai.request(app)
        .get('/api/Users')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.length.should.not.be.eql(0);
            done();
        });
    });

    it('GET Register ', (done) => {
        chai.request(app)
        .get('/users/register')
        .end((err, res) => {
            res.should.have.status(200);
            done();
        });
    });

   

    it('GET Login ', (done) => {
        chai.request(app)
        .get('/users/login')
        .end((err, res) => {
            res.should.have.status(200);
            done();
        });
    });

    
    it(' user details ', (done) => {
        let User = {
            email: "something@gmail.com",
            password: "Something123!"
        }
       
       chai.request(app)
       .post('/users/login') 
       .send(User)
       .end((err, res) => {
           res.should.have.status(200);
           done();
       });
   });

   it('landing - Dashboard', (done) => {
    let User = {
        _id: "6258ce0c1f6e50c81df846c", 
    }    
    chai.request(app)
    .get('/dashboard') 
    .send(User)
    .end((err, res) => {
        res.should.have.status(200);
        done();
  });
});

   it('GET Specific user details', (done) => {
    let User = {
        _id: "6258ce0c1f6e50c81df846c", 
    }    
    chai.request(app)
    .get('/api/Users') 
    .send(User)
    .end((err, res) => {
        res.should.have.status(200);
        done();
    });
});

  
    it('Logout ', (done) => {
         let User = {
             _id: "6258ce0c1f6e50c81df846c", 
         }    
    chai.request(app)
    .get('/users/logout') 
    .send(User)
    .end((err, res) => {
        res.should.have.status(200);
        done();
    });
    });


   it(' General', (done) => {   
        chai.request(app)
        .get('/news/category/general')  
        .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.articles.should.have.length(100);
      
        done();
        }).timeout(10000);
    }) 
    it('Business', (done) => {   
            chai.request(app)
            .get('/news/category/business') 
            .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.articles.should.have.length(100);
          
            done();
        }).timeout(10000);
    })
    it('Entertainment', (done) => {  
            chai.request(app)
            .get('/news/category/entertainment')  
            .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.articles.should.have.length(100);
          
            done();
        }).timeout(10000);
    })
    it('Health', (done) => {
        chai.request(app)
        .get('/news/category/health')  
        .end((err, res) => { 
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.articles.should.have.length(100);
      
        done();
        }).timeout(10000);
    })

   
    it('Technology', (done) => { 
            chai.request(app)
            .get('/news/category/technology')  
            .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.articles.should.have.length(100);
          
            done();
        }).timeout(10000);
    })
    it('Sports', (done) => { 
            chai.request(app)
            .get('/news/category/sports')  
            .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.articles.should.have.length(100);
            done();
        }).timeout(10000);
    })

    it('Science', (done) => { 
            chai.request(app)
            .get('/news/category/science')  
            .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.articles.should.have.length(100);
            
            done();
        }).timeout(10000);
    }) 

    it('Dashboard - home', (done) => { 
            chai.request(app)
            .get('/dashboard/home/1')  
            .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        }).timeout(10000);
    })

