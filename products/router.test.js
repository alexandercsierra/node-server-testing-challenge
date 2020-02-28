const server = require('../server');
const request = require('supertest');
const db = require('../data/db-config')

describe('products router', ()=>{

    describe('GET /products', ()=>{
        it('should return an array', ()=>{
            return request(server).get('/products')
                .then(res=>{
                    console.log('products', res.body)
                    expect(Array.isArray(res.body)).toBe(true)
                })
        })

        it('should return a 200', ()=>{
            return request(server).get('/products')
                .then(res=>{
                    console.log('products', res.body)
                    expect(res.status).toBe(200)
                })
        })
    })

    describe('POST /products', ()=>{
        beforeEach(async () => {
            // this function executes and clears out the table before each test
            await db('products').truncate();
          });
        it('responds with array', ()=>{
            
            return request(server).post('/products')
                .send({name: 'Red Potion9', image: 'https://gamepedia.cursecdn.com/zelda_gamepedia_en/thumb/1/16/ALBW_Red_Potion.png/283px-ALBW_Red_Potion.png?version=3d6aa6655ca688760fe7bd91fefe9da9', price: 30, quantity: 2})
                .then(res=>{
                    console.log(res.body);
                    expect(Array.isArray(res.body)).toBe(true)
                }) 
        })

        it('responds with 201', ()=>{
            return request(server).post('/products')
                .send({name: 'Red Potion8', image: 'https://gamepedia.cursecdn.com/zelda_gamepedia_en/thumb/1/16/ALBW_Red_Potion.png/283px-ALBW_Red_Potion.png?version=3d6aa6655ca688760fe7bd91fefe9da9', price: 30, quantity: 2})
                .then(res=>{
                    expect(res.status).toBe(201)
                })
        })
    })

    describe('DELETE /products', ()=>{ 
        

        it('should return 200 on product delete', async ()=>{
            let newProduct = {name: 'Red Potion700', image: 'https://gamepedia.cursecdn.com/zelda_gamepedia_en/thumb/1/16/ALBW_Red_Potion.png/283px-ALBW_Red_Potion.png?version=3d6aa6655ca688760fe7bd91fefe9da9', price: 30, quantity: 2}
            await request(server).post('/products').send(newProduct)
            let addedProduct = await db('products').where({name: newProduct.name})
            let deleteRequest = await request(server).delete(`/products/${addedProduct[0].id}`)
                expect(deleteRequest.status).toBe(200)
        })

        it('should return status 404 if product does not exist', async ()=>{
            let deleteRequest = await request(server).delete(`/products/651651SDFweg189WERBHG`)
                expect(deleteRequest.status).toBe(404)
        })

 

    })
})







