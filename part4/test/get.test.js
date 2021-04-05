const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const intialBlogs = require('../utils/test_helper').intialBlogs
beforeEach( async()=>{
    await Blog.deleteMany({})
    await new Blog(intialBlogs[0])
    .save()


})


test('GET Blogs return correct count of blogs', async() => {
    const response = await api.get('/api/blogs').expect(200).expect('Content-Type',/application\/json/)
    expect(response.body).toHaveLength(1)
    
})
