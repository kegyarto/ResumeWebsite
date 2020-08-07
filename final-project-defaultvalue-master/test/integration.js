var app = require('../app')
var assert = require('assert')
var axios = require('axios')

const axiosCookieJarSupport = require('axios-cookiejar-support').default;
const tough = require('tough-cookie');
const PORT = 9000;
const URL = `http://localhost:${PORT}/`


function getRandomString(length) {
    let s = '';
    do {
      s += psrand()
        .toString(36)
        .substr(2);
    } while (s.length < length);
    s = s.substr(0, length);
    return s;
  }

//var should = require('should'); 
var request = require('supertest');


const psrand = (() => {
    let seed = 0xaabbccd;
    return () => {
      /* eslint-disable no-bitwise */
      // Robert Jenkins’ 32 bit integer hash function
      seed = (seed + 0x7ed55d16 + (seed << 12)) & 0xffffffff;
      seed = (seed ^ 0xc761c23c ^ (seed >>> 19)) & 0xffffffff;
      seed = (seed + 0x165667b1 + (seed << 5)) & 0xffffffff;
      seed = ((seed + 0xd3a2646c) ^ (seed << 9)) & 0xffffffff;
      seed = (seed + 0xfd7046c5 + (seed << 3)) & 0xffffffff;
      seed = (seed ^ 0xb55a4f09 ^ (seed >>> 16)) & 0xffffffff;
      return (seed & 0xfffffff) / 0x10000000;
      /* eslint-enable no-bitwise */
    };
  })();

  async function createRandomUser(axiosClient) {
    const newUser = {
      username: getRandomString(10),
      password: getRandomString(10),
      number: Math.floor(psrand() * 100),
    };
    const response = await axiosClient.post('/register', newUser);
    return { newUser, response };
}

//var should = require('should'); 
var request = require('supertest');
// * Add Axios Cookie Jar
const cookiejar = new tough.CookieJar();
const client = axios.create({
    baseURL: URL,
    withCredentials: true,
    jar: cookiejar,
    validateStatus: () => {
    /* always resolve on any HTTP status */
        return true
    }
})
axiosCookieJarSupport(client);

describe("application", async()=>{

    describe("sanity", async()=>{
        it("does basic math", async()=>{
            a = 6+5;
            assert.strictEqual(a,11);
        })
    })
})
// beforeEach(async () => {
//     client = axios.create();
//     // make a new cookie jar every time you create a new client
//     client.defaults.jar = new tough.CookieJar();

//     server = app.listen(PORT);
//   });

//   afterEach(async () => {
//     await server.close();
//   });
describe("Home Page", async()=>{

    describe("Check home path", async()=>{
        it("Check message", async()=>{
            assert(true);
        })
    }) 

    describe("Check Web App name on  home page", async()=>{
        it("Check message", async()=>{
            assert(true);
        })
    })

    describe("Check Web App home page has login and registration form", async()=>{
        it("Check message", async()=>{
            assert(true);
        })
    })

})

describe("Registration form", async()=>{

    describe("Check that user does not send a empty form and inform to user that he/she must enter a username and password ", 
    async()=>{
        it("Check message", async()=>{
            const result = await client.post('/register',  {
                username: '',
                password: '',
            });
            assert.equal(result.status,400);//assert(result.data.includes(`no username`));
        })
    })  

    describe("Check a user doesn't register with a existing username, inform that he/she must choose another one", 
    async()=>{
        it("Check message on registration form", async()=>{
            const { newUser } = await createRandomUser(client);
            const client2 = axios.create({
                baseURL: URL,
                withCredentials: true,
                jar: cookiejar,
                validateStatus: () => {
                /* always resolve on any HTTP status */
                    return true
                }
            })
            axiosCookieJarSupport(client2);
        const secondResponse = await client2.post('/register', newUser);
        // The second registration does not succeed
        assert(
          !secondResponse.data.includes(
            `Welcome to your Digital Resume', ${newUser.username}`,
          ),
        );
        // A useful error message is returned
        assert(secondResponse.data.includes('already exist'));
      });
    });

    
    describe("Check password is the combination of alphabetic, numeric and special characters and minimun lenght of 8 characters", 
    async()=>{
        it("Check message on  registration form", async()=>{
            assert(true);
        })
    })
    
    describe("Check submit button is enabled when username and password are filled", 
    async()=>{
        it("Check message on  registration form", async()=>{
            assert(true);
        })
    })

    describe("Check username/name on account page is displayed", 
    async()=>{
        it("Check message", async()=>{
            assert(true);
        })
    })

    describe("Register a new user and check if a session is created", 
    async()=>{
        it("Check ", async()=>{
            assert(true);
        })
    })



})


describe("login form", async()=>{

    describe("Check if the form doesn't have empty fields, if so, check that the web app inform to the user", 
    async()=>{
        it("Check message", async()=>{
            let params = {username: '',password: ''}
            request(app)
                .post('/login')
                .send(params)
                .expect(200)
                .then((res)=> {
                    assert(res.text.includes(`Username or Password has empty fields`));
                    //assert(false);
                });
        })
    })  

    describe("Check user's username/name is shown profile page", 
    async()=>{
        it("Check message", async()=>{
            
            let params = {username: 'charly',password: 'sandoval'}
            request(app)
                .post('/login')
                .send(params)
                .expect(200)
                .then((res)=> {
                    assert(res.text.includes(`charly`));
                    //assert(false);
                });
            /*
            const client2 = axios.create();
            const result = await client2.post('/login', {
                username: 'Gino',
                password: 'pass9',
            });
            assert(result.data.includes(`Gino`));
            */
        })
    }) 

    describe("Check message when a user has limited the allowed login attemps", 
    async()=>{
        it("Check message", async()=>{
            assert(true);
        })
    }) 

    describe("Check if there is only one session", 
    async()=>{
        it("Check message", async()=>{
            assert(true);
        })
    })

    describe("Check profile page when session is active, otherwise check if for home page", 
    async()=>{
        it("Check message", async()=>{
            assert(true);
        })
    })

})

describe("User Session", async()=>{

    describe("Check a user is login and able to create a projects", 
    async()=>{
        it("Check message", async()=>{
            assert(true);
        })
    }) 

    describe("Check a user is login and able to upload a resume on pdf format", 
    async()=>{
        it("Check message", async()=>{
            assert(true);
        })
    }) 

    describe("Check a user is login and able to replace an existing resume for a new one", 
    async()=>{
        it("Check message", async()=>{
            assert(true);
        })
    }) 

    describe("Check a user is login and able to display a resume on pdf format", 
    async()=>{
        it("Check message", async()=>{
            assert(true);
        })
    }) 

    describe("Check a user is login and to add information on its profile page", 
    async()=>{
        it("Check message", async()=>{
            assert(true);
        })
    }) 

    describe("Check a user is login and able to edit an existing project", 
    async()=>{
        it("Check message", async()=>{
            assert(true);
        })
    }) 

    describe("Check a user is login and able to modify its profile", 
    async()=>{
        it("Check message", async()=>{
            assert(true);
        })
    })

    describe("Check a user is login and able to delete a projects", 
    async()=>{
        it("Check message", async()=>{
            assert(true);
        })
    }) 

    describe("Check a user is logout and not able to access and modify to profile page", 
    async()=>{
        it("Check message", async()=>{
            assert(true);
        })
    }) 

    describe("Check a user is logout and not able to access and modify to profile project", 
    async()=>{
        it("Check message", async()=>{
            assert(true);
        })
    }) 

    describe("Check a user is logout and not able to access and modify to resume page", 
    async()=>{
        it("Check message", async()=>{
            assert(true);
        })
    }) 


})


describe("CRUD Tests", async()=>{

    describe("Check insert a user", async()=>{
        it("Check DB", async()=>{
            var user = {
                'username': 'bpuma5',
                'password': '12345678',
                'sessionId': 'it is a test'
            }
            request(app)
            .post('/user/create')
            .send(user)
            .expect(201)
        })
    })   

    describe("Check modify a user ", async()=>{
        it("Check DB", async()=>{
            var user = {
                'username': 'Charly123',
                'password': 'Sandoval123',
                'sessionId': 'it is a test'
            }
            request(app)
            .put('/users/update/5e5afe43f2009636d3161195')
            .send(user)
            .expect(200);
        })
    })
    
    describe("Check delete a user", async()=>{
        it("Check DB", async()=>{
            request(app)
            .delete('/users/delete/5e5ae77e692a4e1113a91e45')
            .expect(200);
        })
    }) 

    describe("Check retrieve a user's information", async()=>{

        it("Check DB", async()=>{
            request(app)
            .get('/users/read/5e5afe43f2009636d3161195')
            .expect(200);
        })
        
    }) 

    let temp_project_id = '';

    describe("Check Create a project", async()=>{
        it("Validate inputs", async()=>{
            var project = {
                'title ': 'project 123 ',
                'description': 'this is a test ',
                'link': 'test.com'
            }
            const response = await client.post('/project/create', {
                title:       "Project Title "+getRandomString(5),
                description:  "Project Desc "+getRandomString(25),
                link:         "http://"+getRandomString(10)
            })
            temp_project_id = response.data._id;
            assert.equal(response.status,200);
        });
        it("Validate empty or missing(null) inputs values", async()=>{
            const response = await client.post('/project/create', {
                title:       "",
                link:         "http://"+getRandomString(10)
            })
            assert.equal(response.status,400);
        });
    });   

    describe("Check Update a project ", async()=>{
        it("Update a valid project", async()=>{
            const response = await client.put('/project/update/'+temp_project_id, {
                title:       "P.Title "+getRandomString(10),
                description:  "P. Desc "+getRandomString(40),
                link:         "http://"+getRandomString(15)
            });
            assert.equal(response.status,200);
            assert(response.data.includes('Project Successfully Updated'));
        });
        it("Attemp to update by using an invalid project id", async()=>{
            const response = await client.put('/project/update/000000', {
                title:       "P.Title "+getRandomString(10),
                description:  "P. Desc "+getRandomString(40),
                link:         "http://"+getRandomString(15)
            });
            assert.equal(response.status,200);
            assert(response.data.includes('Error in updating'));
        });
    })

    describe("Check retrieve a project's information", async()=>{
        it("Read a valid (previously created) project id", async()=>{
            const response = await client.get('/project/read/'+temp_project_id);
            assert.equal(response.status,200);
            assert.notStrictEqual(response.data.title.length, 0)
        });
        it("Read an invalid project id", async()=>{
            const response = await client.get('/project/read/000000');
            assert.equal(response.status,200);
            assert(response.data.includes('Error in finding'));
        });
    })
    
    describe("Check delete a project", async()=>{
        it("Delete a valid (previously created) project id", async()=>{
            const response = await client.get('/project/delete/'+temp_project_id);
            assert.equal(response.status,200);
            assert(response.data.includes('Project Successfully Deleted'));
            
        });
        it("Attemp to delete by using an invalid project id", async()=>{
            const response = await client.get('/project/delete/000000');
            assert.equal(response.status,200);
            assert(response.data.includes('Error in deleting'));
        });
    }) 

    describe("Check retrieve a user's projects related", async()=>{
        it("Check DB", async()=>{
            assert(true); //TODO
        })
    })


})
