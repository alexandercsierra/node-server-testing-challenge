const server = require('../server');
const request = require('supertest');
const db = require('../data/db-config')

describe('products router', ()=>{

    describe('GET /products', ()=>{
        it('products is an array', ()=>{
            return request(server).get('/products')
                .then(res=>{
                    console.log('products', res.body)
                    expect(Array.isArray(res.body)).toBe(true)
                })
        })
    })

    describe('POST /products', ()=>{
        it('responds with array', ()=>{
            beforeEach(async () => {
                // this function executes and clears out the table before each test
                await db('products').truncate();
              });
            return request(server).post('/products')
                .send({name: 'Red Potion5', image: 'https://gamepedia.cursecdn.com/zelda_gamepedia_en/thumb/1/16/ALBW_Red_Potion.png/283px-ALBW_Red_Potion.png?version=3d6aa6655ca688760fe7bd91fefe9da9', price: 30, quantity: 2})
                .then(res=>{
                    console.log(res.body);
                    expect(Array.isArray(res.body)).toBe(true)
                })
        })

        it('responds with 201', ()=>{
            return request(server).post('/products')
                .send({name: 'Red Potion4', image: 'https://gamepedia.cursecdn.com/zelda_gamepedia_en/thumb/1/16/ALBW_Red_Potion.png/283px-ALBW_Red_Potion.png?version=3d6aa6655ca688760fe7bd91fefe9da9', price: 30, quantity: 2})
                .then(res=>{
                    expect(res.status).toBe(201)
                })
        })
    })

    describe('DELETE /products', ()=>{ 
        
        it('product deleted', ()=>{
            return request(server).post('/products')
                .send({name: 'Red Potion7', image: 'https://gamepedia.cursecdn.com/zelda_gamepedia_en/thumb/1/16/ALBW_Red_Potion.png/283px-ALBW_Red_Potion.png?version=3d6aa6655ca688760fe7bd91fefe9da9', price: 30, quantity: 2})
                .then(res=>{
                    console.log('the id', res.body)
                    return request(server).delete(`/products/${res.body.id}`)
                    .then(res=>{
                        expect(res.status).toBe(200)
                    })
                    .catch(err=>console.log('error deleting', err))
                })
                .catch(err=>console.log('error adding product', err))
        })
    })

})