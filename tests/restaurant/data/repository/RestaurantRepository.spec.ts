import { expect } from 'chai';
import dotenv from 'dotenv';
import { afterEach, beforeEach } from 'mocha';
dotenv.config();
import { Mongoose } from "mongoose";
import RestaurantRepository from "../../../../src/restaurant/data/repository/RestaurantRepository";
import { Location } from '../../../../src/restaurant/domain/Restaurant';
import { cleanUpDB, prepareDB, } from "../../../restaurant/data/helpers/helpers";

describe('RestaurantRepository', () => {
    let client: Mongoose;
  
    let sut: RestaurantRepository;
    
    beforeEach(() => {
      
      client = new Mongoose();
  
      const connectionStr = encodeURI(process.env.DB_URI as string);
      
      client.connect(connectionStr, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      sut = new RestaurantRepository(client)
    });

    afterEach(() => {
        client.disconnect()
    })

    describe('Find All Restaurants.', () => {
        beforeEach(async () => {
            await prepareDB(client)
        });

        afterEach(async () => {
            await cleanUpDB(client)
        });

        it('Should return restaurants', async () => {
            const result = await sut.findAll(1, 2)

            expect(result).to.not.be.empty
            expect(result.data.length).eq(2)
        })
    })

    describe('Find One Restaurant.', () => {
        var insertedId = ''
        beforeEach(async () => {
            const docs = await prepareDB(client)
            insertedId = docs[0].id
        });

        afterEach(async () => {
            await cleanUpDB(client)
        });

        it('Should return a promise reject with an error message.', async () => {
            
            await sut.findOne('no_id').catch((err) => {
                expect(err).to.not.be.empty

            })
        });

        it('Should return a restaurant.', async () => {
            
            const result = await sut.findOne(insertedId)

            expect(result).to.not.be.empty
            expect(result.id).eq(insertedId)
        });
    })

    describe('Find Restaurant By Location.', () => {
        beforeEach(async () => {
            await prepareDB(client)
        });

        afterEach(async () => {
            await cleanUpDB(client)
        });

        it('Should return a promise reject with an error message.', async () => {
            
            const location = new Location(20.33, 73.33)

            await sut.findByLocation(location, 1, 2).catch((err) => {
                expect(err).to.not.be.empty
            })
        });

        it('Should return a restaurant.', async () => {
            const location = new Location(40.33, 73.23)

            const result = await sut.findByLocation(location, 1, 2)

            expect(result.data.length).eq(2)
        });
    })

    describe('Search For Restaurant.', () => {
        beforeEach(async () => {
            await prepareDB(client)
        });

        afterEach(async () => {
            await cleanUpDB(client)
        });

        it('Should return a promise reject with an error message.', async () => {
            
            const query = 'not present';

            await sut.search(1, 2, query).catch((err) => {
                expect(err).to.not.be.empty
            })
        });

        it('Should return restaurants that match query string.', async () => {
            
            const query = 'restaurant name';

            const result = await sut.search(1, 2, query)

            expect(result.data.length).eq(2)
        });
    })

    describe('Get Restaurant Menu.', () => {
        var insertedId = ''
        beforeEach(async () => {
            const docs = await prepareDB(client)
            insertedId = docs[0].id
        });

        afterEach(async () => {
            await cleanUpDB(client)
        });

        // it('Should return a promise reject with an error message.', async () => {
            
        //     const query = 'not present';

        //     await sut.search(1, 2, query).catch((err) => {
        //         expect(err).to.not.be.empty
        //     })
        // });

        it('Should return restaurant menus.', async () => {
            
            const menus = await sut.getMenus(insertedId);

            expect(menus.length).to.eq(1) // We expect 1 menu and,

            expect(menus[0].items.length).to.eq(2) // 2 Menu items
        });
    })
})