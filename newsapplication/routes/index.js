const express = require('express');
const router  = express.Router();
const axios = require('axios');
const moment = require('moment');
const math = require('math');
const User = require("../controller/models/User");

const {ensureAuthenticated} = require('../config/auth')

router.get('/', async(req,res) => {
    res.redirect('/1')
})



router.get('/:page',async(req,res)=>{
    const art = []
    try {
        var url = 'http://newsapi.org/v2/top-headlines?category=general&country=us&apiKey=cc4478bbcbd04d059ab2a76ecd7cf5d0&pageSize=100';
        const news_get =await axios.get(url)
        for (let i = 0; i < 100; i++) {
            art.push(news_get.data.articles[i])
          }

          const arr = art
          const sortByDate = arr => {
          const sorter = (a, b) => {
              return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
          }
          arr.sort(sorter);
      };
          sortByDate(arr);
          const reach = {}
          reach.reach = arr.slice(0,250)
        
        const page = req.params.page || 1
        const limit = 20
        const countt = reach.reach.length
        const startIndex =  ((limit * page) - limit) //(page - 1) * limit
        const endIndex= ((page * limit))

        const results = {}
        results.results = reach.reach.slice(startIndex, endIndex)  //art
        res.status(200).render('landing', {
            articles: results.results,
            pages: Math.ceil(countt / limit),
            current: page
            })

    } catch (error) {
        if(error.response){
            console.log(error)
        }
    }
})




router.get('/dashboard/home',ensureAuthenticated, async(req,res)=>{ // changed the rroute /dashboard/home
const art = []
    try {
            if(req.user.general === 'yes'){
                var url1 = 'http://newsapi.org/v2/top-headlines?category=general&country=us&apiKey=cc4478bbcbd04d059ab2a76ecd7cf5d0';
                const news_get =await axios.get(url1)
                for (let i = 0; i < 20; i++) {
                    art.push(news_get.data.articles[i])
                  } 
            }   
            if(req.user.business == 'yes'){
                var url2 = 'http://newsapi.org/v2/top-headlines?category=business&country=us&apiKey=cc4478bbcbd04d059ab2a76ecd7cf5d0';
                const news_bus =await axios.get(url2)
                for (let i = 0; i < 20; i++) {
                    art.push(news_bus.data.articles[i])
                  } 
                
            }   
            if(req.user.entertainment == 'yes'){
                var url3 = 'http://newsapi.org/v2/top-headlines?category=entertainment&country=us&apiKey=cc4478bbcbd04d059ab2a76ecd7cf5d0';
                const news_ent =await axios.get(url3)
                for (let i = 0; i < 20; i++) {
                    art.push(news_ent.data.articles[i])
                  } 
            }   
            if(req.user.health == 'yes'){
                var url4 = 'http://newsapi.org/v2/top-headlines?category=health&country=us&apiKey=cc4478bbcbd04d059ab2a76ecd7cf5d0';
                const news_hlt =await axios.get(url4)
                for (let i = 0; i < 20; i++) {
                    art.push(news_hlt.data.articles[i])
                }
            }   
            if(req.user.science == 'yes'){
                var url5 = 'http://newsapi.org/v2/top-headlines?category=science&country=us&apiKey=cc4478bbcbd04d059ab2a76ecd7cf5d0';
                const news_sci =await axios.get(url5)
                for (let i = 0; i < 20; i++) {
                    art.push(news_sci.data.articles[i])
                } 
            }   
            if(req.user.sport == 'yes'){
                var url6 = 'http://newsapi.org/v2/top-headlines?category=sports&country=us&apiKey=cc4478bbcbd04d059ab2a76ecd7cf5d0';
                const news_sport =await axios.get(url6)
                for (let i = 0; i < 20; i++) {
                    art.push(news_sport.data.articles[i])
                }   
            }  
            if(req.user.technology == 'yes'){
                var url7 = 'http://newsapi.org/v2/top-headlines?category=technology&country=us&apiKey=cc4478bbcbd04d059ab2a76ecd7cf5d0';
                const news_tech =await axios.get(url7)
                for (let i = 0; i < 20; i++) {
                    art.push(news_tech.data.articles[i])
                } 
                
            }
           
            res.status(200).render('home',{articles:art, user: req.user, id: req.user._id})
                
            } catch (error) {
                if(error.response){
                    console.log(error)
                }
            }
});

router.get('/dashboard/home/:page', ensureAuthenticated, async(req,res)=>{
    const art = []
    try {
        if(req.user.general === 'yes'){
            var url1 = 'http://newsapi.org/v2/top-headlines?category=general&country=us&apiKey=cc4478bbcbd04d059ab2a76ecd7cf5d0&pageSize=100';
            const news_get =await axios.get(url1)
            for (let i = 0; i < 100; i++) {
                art.push(news_get.data.articles[i])
              } 
        }   
        if(req.user.business == 'yes'){
            var url2 = 'http://newsapi.org/v2/top-headlines?category=business&country=us&apiKey=cc4478bbcbd04d059ab2a76ecd7cf5d0&pageSize=100';
            const news_bus =await axios.get(url2)
            for (let i = 0; i < 100; i++) {
                art.push(news_bus.data.articles[i])
              } 
        }   
        if(req.user.entertainment == 'yes'){
            var url3 = 'http://newsapi.org/v2/top-headlines?category=entertainment&country=us&apiKey=cc4478bbcbd04d059ab2a76ecd7cf5d0&pageSize=100';
            const news_ent =await axios.get(url3)
            for (let i = 0; i < 100; i++) {
                art.push(news_ent.data.articles[i])
              } 
        }   
        if(req.user.health == 'yes'){
            var url4 = 'http://newsapi.org/v2/top-headlines?category=health&country=us&apiKey=cc4478bbcbd04d059ab2a76ecd7cf5d0&pageSize=100';
            const news_hlt =await axios.get(url4)
            for (let i = 0; i < 100; i++) {
                art.push(news_hlt.data.articles[i])
            }
        }   
        if(req.user.science == 'yes'){
            var url5 = 'http://newsapi.org/v2/top-headlines?category=science&country=us&apiKey=cc4478bbcbd04d059ab2a76ecd7cf5d0&pageSize=100';
            const news_sci =await axios.get(url5)
            for (let i = 0; i < 100; i++) {
                art.push(news_sci.data.articles[i])
            } 
        }   
        if(req.user.sport == 'yes'){
            var url6 = 'http://newsapi.org/v2/top-headlines?category=sports&country=us&apiKey=cc4478bbcbd04d059ab2a76ecd7cf5d0&pageSize=100';
            const news_sport =await axios.get(url6)
            for (let i = 0; i < 100; i++) {
                art.push(news_sport.data.articles[i])
            }   
        }  
        if(req.user.technology == 'yes'){
            var url7 = 'http://newsapi.org/v2/top-headlines?category=technology&country=us&apiKey=cc4478bbcbd04d059ab2a76ecd7cf5d0&pageSize=100';
            const news_tech =await axios.get(url7)
            for (let i = 0; i < 100; i++) {
                art.push(news_tech.data.articles[i])
            } 
            
        }

        //Sorting the consolidated articles data
        const arr = art
        const sortByDate = arr => {
        const sorter = (a, b) => {
            return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        }
        arr.sort(sorter);
    };
        sortByDate(arr);
        const reach = {}
        reach.reach = arr.slice(0,250)
        //arr = arr.slice(0,250);
        //arr.arr = arr.slice(0, 10);
  
        //Pagination - consolidated data
        //var perPage = 4
        const page = req.params.page || 1

        //const page = req.query.page
        const limit = 20
        const countt = reach.reach.length //art
        
        const startIndex =  ((limit * page) - limit) //(page - 1) * limit
        const endIndex= ((page * limit))

        //console.log("PRINTING PAGINATED NEWS!!!")
        const results = {}

        results.results = reach.reach.slice(startIndex, endIndex)  //art
        
        //console.log("END OF PAGINATED NEWS") 
        
        
        //res.status(200).render('home',{articles:art, user: req.user, id: req.user._id}) // uncomment line 
        res.status(200).render('home', {
                articles: results.results,
                pages: Math.ceil(countt / limit),
                current: page,
                user: req.user,
                id: req.user._id
                })
           // })
        
       // })
    
    }catch (error) {
                if(error.response){
                    console.log(error)
                }
            }
});
    
/// END OF alternate to critical code


router.get('/dashboard/general/:page',ensureAuthenticated, async(req,res)=>{
    const art = []
    try {
        var url = 'http://newsapi.org/v2/top-headlines?category=general&country=us&apiKey=cc4478bbcbd04d059ab2a76ecd7cf5d0&pageSize=100';
        const news_get =await axios.get(url)
        for (let i = 0; i < 100; i++) {
            art.push(news_get.data.articles[i])
          }

          const arr = art
          const sortByDate = arr => {
          const sorter = (a, b) => {
              return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
          }
          arr.sort(sorter);
      };
          sortByDate(arr);
          const reach = {}
          reach.reach = arr.slice(0,250)
        
        const page = req.params.page || 1
        const limit = 20
        const countt = reach.reach.length
        const startIndex =  ((limit * page) - limit) //(page - 1) * limit
        const endIndex= ((page * limit))

        const results = {}
        results.results = reach.reach.slice(startIndex, endIndex)  //art
        res.status(200).render('general', {
            articles: results.results,
            pages: Math.ceil(countt / limit),
            current: page,
            user: req.user,
            id: req.user._id
            })
    } catch (error) {
        if(error.response){
            console.log(error)
        }
    }
})

router.get('/dashboard/health/:page',ensureAuthenticated, async(req,res)=>{
    const art = []
    try {
        var url = 'http://newsapi.org/v2/top-headlines?category=health&country=us&apiKey=cc4478bbcbd04d059ab2a76ecd7cf5d0&pageSize=100';
        const news_get =await axios.get(url)
        for (let i = 0; i < 100; i++) {
            art.push(news_get.data.articles[i])
          }

          const arr = art
          const sortByDate = arr => {
          const sorter = (a, b) => {
              return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
          }
          arr.sort(sorter);
      };
          sortByDate(arr);
          const reach = {}
          reach.reach = arr.slice(0,250)
        
        const page = req.params.page || 1
        const limit = 20
        const countt = reach.reach.length
        const startIndex =  ((limit * page) - limit) //(page - 1) * limit
        const endIndex= ((page * limit))

        const results = {}
        results.results = reach.reach.slice(startIndex, endIndex)  //art
        res.status(200).render('health', {
            articles: results.results,
            pages: Math.ceil(countt / limit),
            current: page,
            user: req.user,
            id: req.user._id
            })
    } catch (error) {
        if(error.response){
            console.log(error)
        }
    }
});
       
router.get('/dashboard/entertainment/:page',ensureAuthenticated, async(req,res)=>{
    const art = []
    try {
        var url = 'http://newsapi.org/v2/top-headlines?category=entertainment&country=us&apiKey=cc4478bbcbd04d059ab2a76ecd7cf5d0&pageSize=100';
        const news_get =await axios.get(url)
        for (let i = 0; i < 100; i++) {
            art.push(news_get.data.articles[i])
          }

          const arr = art
          const sortByDate = arr => {
          const sorter = (a, b) => {
              return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
          }
          arr.sort(sorter);
      };
          sortByDate(arr);
          const reach = {}
          reach.reach = arr.slice(0,250)
        
        const page = req.params.page || 1
        const limit = 20
        const countt = reach.reach.length
        const startIndex =  ((limit * page) - limit) //(page - 1) * limit
        const endIndex= ((page * limit))

        const results = {}
        results.results = reach.reach.slice(startIndex, endIndex)  //art
        res.status(200).render('entertainment', {
            articles: results.results,
            pages: Math.ceil(countt / limit),
            current: page,
            user: req.user,
            id: req.user._id
            })
    } catch (error) {
        if(error.response){
            console.log(error)
        }
    }
});

router.get('/dashboard/science/:page',ensureAuthenticated, async(req,res)=>{
    const art = []
    try {
        var url = 'http://newsapi.org/v2/top-headlines?category=science&country=us&apiKey=cc4478bbcbd04d059ab2a76ecd7cf5d0&pageSize=100';
        const news_get =await axios.get(url)
        for (let i = 0; i < 100; i++) {
            art.push(news_get.data.articles[i])
          }

          const arr = art
          const sortByDate = arr => {
          const sorter = (a, b) => {
              return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
          }
          arr.sort(sorter);
      };
          sortByDate(arr);
          const reach = {}
          reach.reach = arr.slice(0,250)
        
        const page = req.params.page || 1
        const limit = 20
        const countt = reach.reach.length
        const startIndex =  ((limit * page) - limit) //(page - 1) * limit
        const endIndex= ((page * limit))

        const results = {}
        results.results = reach.reach.slice(startIndex, endIndex)  //art
        res.status(200).render('science', {
            articles: results.results,
            pages: Math.ceil(countt / limit),
            current: page,
            user: req.user,
            id: req.user._id
            })
    } catch (error) {
        if(error.response){
            console.log(error)
        }
    }
});

router.get('/dashboard/business/:page',ensureAuthenticated, async(req,res)=>{
    const art = []
    try {
        var url = 'http://newsapi.org/v2/top-headlines?category=business&country=us&apiKey=cc4478bbcbd04d059ab2a76ecd7cf5d0&pageSize=100';
        const news_get =await axios.get(url)
        for (let i = 0; i < 100; i++) {
            art.push(news_get.data.articles[i])
          }

          const arr = art
          const sortByDate = arr => {
          const sorter = (a, b) => {
              return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
          }
          arr.sort(sorter);
      };
          sortByDate(arr);
          const reach = {}
          reach.reach = arr.slice(0,250)
        
        const page = req.params.page || 1
        const limit = 20
        const countt = reach.reach.length
        const startIndex =  ((limit * page) - limit) //(page - 1) * limit
        const endIndex= ((page * limit))

        const results = {}
        results.results = reach.reach.slice(startIndex, endIndex)  //art
        res.status(200).render('business', {
            articles: results.results,
            pages: Math.ceil(countt / limit),
            current: page,
            user: req.user,
            id: req.user._id
            })
    } catch (error) {
        if(error.response){
            console.log(error)
        }
    }
});

router.get('/dashboard/sports/:page',ensureAuthenticated, async(req,res)=>{
    const art = []
    try {
        var url = 'http://newsapi.org/v2/top-headlines?category=sports&country=us&apiKey=cc4478bbcbd04d059ab2a76ecd7cf5d0&pageSize=100';
        const news_get =await axios.get(url)
        for (let i = 0; i < 100; i++) {
            art.push(news_get.data.articles[i])
          }

          const arr = art
          const sortByDate = arr => {
          const sorter = (a, b) => {
              return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
          }
          arr.sort(sorter);
      };
          sortByDate(arr);
          const reach = {}
          reach.reach = arr.slice(0,250)
        
        const page = req.params.page || 1
        const limit = 20
        const countt = reach.reach.length
        const startIndex =  ((limit * page) - limit) //(page - 1) * limit
        const endIndex= ((page * limit))

        const results = {}
        results.results = reach.reach.slice(startIndex, endIndex)  //art
        res.status(200).render('sports', {
            articles: results.results,
            pages: Math.ceil(countt / limit),
            current: page,
            user: req.user,
            id: req.user._id
            })
    } catch (error) {
        if(error.response){
            console.log(error)
        }
    }
});

    router.get('/dashboard/technology/:page',ensureAuthenticated, async(req,res)=>{
        const art = []
    try {
        var url = 'http://newsapi.org/v2/top-headlines?category=technology&country=us&apiKey=cc4478bbcbd04d059ab2a76ecd7cf5d0&pageSize=100';
        const news_get =await axios.get(url)
        for (let i = 0; i < 100; i++) {
            art.push(news_get.data.articles[i])
          }

          const arr = art
          const sortByDate = arr => {
          const sorter = (a, b) => {
              return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
          }
          arr.sort(sorter);
      };
          sortByDate(arr);
          const reach = {}
          reach.reach = arr.slice(0,250)
        
        const page = req.params.page || 1
        const limit = 20
        const countt = reach.reach.length
        const startIndex =  ((limit * page) - limit) //(page - 1) * limit
        const endIndex= ((page * limit))

        const results = {}
        results.results = reach.reach.slice(startIndex, endIndex)  //art
        res.status(200).render('technology', {
            articles: results.results,
            pages: Math.ceil(countt / limit),
            current: page,
            user: req.user,
            id: req.user._id
            })
    } catch (error) {
        if(error.response){
            console.log(error)
        }
    }
});

router.get('/general',async(req,res)=>{
    //var api = 'https://newsapi.org/v2/top-headlines/sources?category='
    //var country = 'country=us'
    var api = 'https://newsapi.org/v2/top-headlines?category='
    var category = 'general'
    var apiKey = '&apiKey=cc4478bbcbd04d059ab2a76ecd7cf5d0' 

    try {
        var url = api + category + apiKey
        //'http://newsapi.org/v2/top-headlines?country=in&category=general' + '&apiKey=cc4478bbcbd04d059ab2a76ecd7cf5d0';
        const news_get =await axios.get(url)
        res.status(200).render('general',{articles:news_get.data.articles})
    } catch (error) {
        if(error.response){
            console.log(error)
        }
    }
})

router.get('/entertainment',async(req,res)=>{
    //var api = 'https://newsapi.org/v2/top-headlines/sources?category='
    var api = 'https://newsapi.org/v2/top-headlines?category='
    //var country = 'country=us'
    var category = 'entertainment'
    var apiKey = '&apiKey=cc4478bbcbd04d059ab2a76ecd7cf5d0' 
    try {
        var url = api + category + apiKey
        //'http://newsapi.org/v2/top-headlines?country=in&category=general' + '&apiKey=cc4478bbcbd04d059ab2a76ecd7cf5d0';
        const news_get =await axios.get(url)
        res.status(200).render('entertainment',{articles:news_get.data.articles})
    } catch (error) {
        if(error.response){
            console.log(error)
        }
    }
})

router.get('/sports',async(req,res)=>{
    //var api = 'https://newsapi.org/v2/top-headlines/sources?category='
    //var country = 'country=us'
    var api = 'https://newsapi.org/v2/top-headlines?category='
    var category = 'sports'
    var apiKey = '&apiKey=cc4478bbcbd04d059ab2a76ecd7cf5d0' 
    try {
        var url = api + category + apiKey
        //'http://newsapi.org/v2/top-headlines?country=in&category=general' + '&apiKey=cc4478bbcbd04d059ab2a76ecd7cf5d0';
        const news_get =await axios.get(url)
        res.status(200).render('sports',{articles:news_get.data.articles})
    } catch (error) {
        if(error.response){
            console.log(error)
        }
    }
})

router.get('/business',async(req,res)=>{
    //var api = 'https://newsapi.org/v2/top-headlines/sources?category='
    //var country = 'country=us'
    var api = 'https://newsapi.org/v2/top-headlines?category='
    var category = 'business'
    var apiKey = '&apiKey=cc4478bbcbd04d059ab2a76ecd7cf5d0' 
    try {
        var url = api + category + apiKey
        //'http://newsapi.org/v2/top-headlines?country=in&category=general' + '&apiKey=';
        const news_get =await axios.get(url)
        res.status(200).render('business',{articles:news_get.data.articles})
    } catch (error) {
        if(error.response){
            console.log(error)
        }
    }
})

router.get('/health',async(req,res)=>{
    //var api = 'https://newsapi.org/v2/top-headlines/sources?category='
    //var country = 'country=us'
    var api = 'https://newsapi.org/v2/top-headlines?category='
    var category = 'health'
    var apiKey = '&apiKey=cc4478bbcbd04d059ab2a76ecd7cf5d0' 
    try {
        var url = api + category + apiKey
        //'http://newsapi.org/v2/top-headlines?country=in&category=general' + '&apiKey=cc4478bbcbd04d059ab2a76ecd7cf5d0';
        const news_get =await axios.get(url)
        res.status(200).render('health',{articles:news_get.data.articles})
    } catch (error) {
        if(error.response){
            console.log(error)
        }
    }
})

router.get('/technology',async(req,res)=>{
    //var api = 'https://newsapi.org/v2/top-headlines/sources?category='
    //var country = 'country=us'
    var api = 'https://newsapi.org/v2/top-headlines?category='
    var category = 'technology'
    var apiKey = '&apiKey=cc4478bbcbd04d059ab2a76ecd7cf5d0' 
    try {
        var url = api + category + apiKey
        //'http://newsapi.org/v2/top-headlines?country=in&category=general' + '&apiKey=cc4478bbcbd04d059ab2a76ecd7cf5d0';
        const news_get =await axios.get(url)
        res.status(200).render('technology',{articles:news_get.data.articles})
    } catch (error) {
        if(error.response){
            console.log(error)
        }
    }
})

router.get('/science',async(req,res)=>{
    //var api = 'https://newsapi.org/v2/top-headlines/sources?category='
    //var country = 'country=us'
    var api = 'https://newsapi.org/v2/top-headlines?category='
    var category = 'science'
    var apiKey = '&apiKey=cc4478bbcbd04d059ab2a76ecd7cf5d0'
    try {
        var url = api + category + apiKey
        //'http://newsapi.org/v2/top-headlines?country=in&category=general' + '&apiKey=cc4478bbcbd04d059ab2a76ecd7cf5d0';
        const news_get =await axios.get(url)
        res.status(200).render('science',{articles:news_get.data.articles})
    } catch (error) {
        if(error.response){
            console.log(error)
        }
    }
})






router.get("/news/users/:id", async (req, res) => {
    const art = []
    var userId = req.params.id;
    const user = await User.findOne({ _id: userId });
    
    if (!user) {
        return res.status(401).json({ message: "User is not recognized (unauthorized)" });
      }
    try{
        if (!user) {
          return res.status(401).json({ message: "User is not recognized (unauthorized)" });
        }
        else {
            if(user.general === 'yes'){
                  var url1 = 'http://newsapi.org/v2/top-headlines?category=general&apiKey=cc4478bbcbd04d059ab2a76ecd7cf5d0&pageSize=100';
                  const news_get =await axios.get(url1)
                  for (let i = 0; i < 100; i++) {
                      art.push(news_get.data.articles[i])
                    } 
              }   
              if(user.business === 'yes'){
                  var url2 = 'http://newsapi.org/v2/top-headlines?category=business&apiKey=cc4478bbcbd04d059ab2a76ecd7cf5d0&pageSize=100';
                  const news_bus =await axios.get(url2)
                  for (let i = 0; i < 100; i++) {
                      art.push(news_bus.data.articles[i])
                    }  
              }   
              if(user.entertainment === 'yes'){
                  var url3 = 'http://newsapi.org/v2/top-headlines?category=entertainment&apiKey=cc4478bbcbd04d059ab2a76ecd7cf5d0&pageSize=100';
                  const news_ent =await axios.get(url3)
                  for (let i = 0; i < 100; i++) {
                      art.push(news_ent.data.articles[i])
                    } 
              }   
              if(user.health === 'yes'){
                  var url4 = 'http://newsapi.org/v2/top-headlines?category=health&apiKey=cc4478bbcbd04d059ab2a76ecd7cf5d0&pageSize=100';
                  const news_hlt =await axios.get(url4)
                  for (let i = 0; i < 100; i++) {
                      art.push(news_hlt.data.articles[i])
                  }
              }   
              if(user.science === 'yes'){
                  var url5 = 'http://newsapi.org/v2/top-headlines?category=science&apiKey=cc4478bbcbd04d059ab2a76ecd7cf5d0&pageSize=100';
                  const news_sci =await axios.get(url5)
                  for (let i = 0; i < 100; i++) {
                      art.push(news_sci.data.articles[i])
                  } 
              }   
              if(user.sport === 'yes'){
                  
                  var url6 = 'http://newsapi.org/v2/top-headlines?category=sports&apiKey=cc4478bbcbd04d059ab2a76ecd7cf5d0&pageSize=100';
                  const news_sport =await axios.get(url6)
                  for (let i = 0; i < 100; i++) {
                      art.push(news_sport.data.articles[i])
                  }   
              }  
              if(user.technology === 'yes'){
                  var url7 = 'http://newsapi.org/v2/top-headlines?category=technology&apiKey=cc4478bbcbd04d059ab2a76ecd7cf5d0&pageSize=100';
                  const news_tech =await axios.get(url7)
                  for (let i = 0; i < 100; i++) {
                      art.push(news_tech.data.articles[i])
                  }   
              }

        //Sorting the consolidated articles data
        const arr = art
        const sortByDate = arr => {
        const sorter = (a, b) => {
            return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        }
        arr.sort(sorter);
    };
        sortByDate(arr);
        const articles = {}
        articles.articles = arr.slice(0,250)  
        //const articles = {}      
        //articles.articles = art
              
      res.status(200).json(articles)
        }
    }
    catch (err){
        res.status(500).json({ message: "Error retrieving user with id " });
    }
  });


  router.post('/search/1',ensureAuthenticated, async (req,res)=>{
    const art = []
    const id = req.user._id
    //req.user.search = search
    var search = req.body.search
    console.log("search req body " + search)
    if(search == 'undefined'){
        var search = req.user.search
        console.log("search user search " + search)
    }else{
        let user = await User.findById(req.user._id);
        user = await User.updateOne({_id:req.user._id},{$set: req.body});
    }

    console.log("search" + search)
    console.log("search" + id) 
    try {
        if(search.length > 0){
            var url = `http://newsapi.org/v2/everything?q=${search}&apiKey=cc4478bbcbd04d059ab2a76ecd7cf5d0&pageSize=100`
            const news_get =await axios.get(url)
            if((news_get.data.articles.length) != 0){
                console.log(news_get.data.articles.length)
                for (let i = 0; i < 100; i++) {
                  art.push(news_get.data.articles[i])
                 }
          const arr = art
          const sortByDate = arr => {
          const sorter = (a, b) => {
              return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
          }
          arr.sort(sorter);
      };
          sortByDate(arr);
          const reach = {}
          reach.reach = arr.slice(0,250)
        
        const page = req.params.page || 1
        const limit = 20
        const countt = reach.reach.length
        const startIndex =  ((limit * page) - limit) //(page - 1) * limit
        const endIndex= ((page * limit))

        const results = {}
        results.results = reach.reach.slice(startIndex, endIndex)  //art
        res.status(200).render('search', {
            articles: results.results,
            pages: Math.ceil(countt / limit),
            current: page,
            user: req.user,
            id: req.user._id,
            search: req.user.search
            }) 
        
        }else{
            res.render('nonews', {
                user: req.user,
                id: req.user._id,
                search: req.body.search
            })
        }
        
         } else {
             res.redirect('/dashboard/home/1')
    }

  }catch (error) {
    if(error.response){
        console.log(error)
        }
    }
})

router.get("/search/searchitems", async (req, res) => {
    const art = []
    var search = req.query.search
    console.log(search)
    var userId = req.params.id;
    try {
        if(search.length > 0){
            var url = `http://newsapi.org/v2/everything?q=${search}&apiKey=cc4478bbcbd04d059ab2a76ecd7cf5d0&pageSize=100`
                const news_get =await axios.get(url)
                if((news_get.data.articles.length) != 0){
                    for (let i = 0; i < 100; i++) {
                        art.push(news_get.data.articles[i])
                }
                const arr = art
                const sortByDate = arr => {
                const sorter = (a, b) => {
                    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
                }
                arr.sort(sorter);
            };
        sortByDate(arr);
        const articles = {}
        articles.articles = arr.slice(0,250)  
        //const articles = {}      
        //articles.articles = art
              
      res.status(200).json(articles)
        }else{
            res.status(401).json({ message: "There are no articles matching the search keyword" });
            }     
        }
    }
    catch (err){
        res.status(500).json({ message: "An error occured. Please retry" });
    }
  });

router.get('/search/:page',ensureAuthenticated, async (req,res)=>{
    const art = []
    const id = req.user._id
    //req.user.search = search
    var search = req.user.search
    console.log("search" + search)
    console.log("search" + id) 
    try {
        if(search.length > 0){
            var url = `http://newsapi.org/v2/everything?q=${search}&apiKey=cc4478bbcbd04d059ab2a76ecd7cf5d0&pageSize=100`
                const news_get =await axios.get(url)
                    for (let i = 0; i < 100; i++) {
                        art.push(news_get.data.articles[i])
                }
                const arr = art
                const sortByDate = arr => {
                const sorter = (a, b) => {
                    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
                }
                arr.sort(sorter);
            };
                sortByDate(arr);
                const reach = {}
                reach.reach = arr.slice(0,250)
            
                const page = req.params.page || 1
                const limit = 20
                const countt = reach.reach.length
                const startIndex =  ((limit * page) - limit) //(page - 1) * limit
                const endIndex= ((page * limit))

            const results = {}
            results.results = reach.reach.slice(startIndex, endIndex)  //art
            res.status(200).render('search', {
                articles: results.results,
                pages: Math.ceil(countt / limit),
                current: page,
                user: req.user,
                id: req.user._id,
                search: req.user.search
                }) 
         } else {
             res.redirect('/dashboard/home/1')
    }
  }catch (error) {
    if(error.response){
        console.log(error)
        }
    }
})



router.get("/news/category/:category", async (req, res) => {
	var category = req.params.category;
    try {
		const response = await axios({
			url: "http://newsapi.org/v2/top-headlines?category=" + category + "&apiKey=cc4478bbcbd04d059ab2a76ecd7cf5d0&pageSize=100",
			method: "get",
		});
		res.status(200).send(response.data);
  
    } catch (err) {
		res.status(500).json({ message: err });
	}
});

module.exports = router; 
