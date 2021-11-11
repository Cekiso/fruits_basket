const assert = require("assert");
const baskets = require('../FruitBasket')

const pg = require("pg");
const { count } = require("console");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://nkully:nkully@localhost:5432/fruit_basket';

const pool = new Pool({
    connectionString
});

describe('The fruits basket', async function() {

    beforeEach(async function() {

        console.log("********");
        await pool.query("DELETE FROM baskets;");

        await pool.query(`insert into baskets(fruit_name, quantity, price, basket) values('Apple', 1, 3, 'A')`);
        await pool.query(`insert into baskets(fruit_name, quantity, price, basket) values('Banana', 2, 3, 'B')`)

    });

    it('should be able to add new fruit basket for a given fruit type, qty & fruit price', async function() {
        let fruits = baskets(pool);

        let tst = await fruits.InsertValuesbasket("Apple", 2, 2, 'G');
        await fruits.InsertValuesbasket("Orange", 1, 2, 'B');
        await fruits.InsertValuesbasket("Banana", 2, 3, 'A');


        assert.deepEqual(await fruits.GetAll(),



            [{
                    basket: 'A',
                    fruit_name: 'Apple',
                    price: 3,
                    quantity: 1
                },
                {
                    basket: 'B',
                    fruit_name: 'Banana',
                    price: 3,
                    quantity: 2
                },
                {
                    basket: 'G',
                    fruit_name: 'Apple',
                    price: 2,
                    quantity: 2
                },
                {
                    basket: 'B',
                    fruit_name: 'Orange',
                    price: 2,
                    quantity: 1
                },
                {
                    basket: 'A',
                    fruit_name: 'Banana',
                    price: 3,
                    quantity: 2
                }
            ]

        )
    });
    it('should return all the data in the database', async function() {
        let fruits = baskets(pool);

        assert.deepEqual(

            [{
                basket: 'A',
                fruit_name: 'Apple',
                price: 3,
                quantity: 1
            }, {
                basket: 'B',
                fruit_name: 'Banana',
                price: 3,
                quantity: 2
            }], await fruits.GetAll());

    });
    it('should be able to find the fruit basket for a given fruit type', async function() {
        let fruits = baskets(pool);


        assert.deepEqual([{
                basket: 'B'
            }],
            await fruits.FruitType('Banana'))

    });
    it('should be able update the number of fruits in a basket', async function() {
        let fruits = baskets(pool);

        let update = await fruits.UpdateFruitQuantity(10, 'B', 'Banana');

        assert.deepEqual([{
            quantity: 2
        }], update)
    });
    it('should return a total price for a given basket', async function() {
        let fruits = baskets(pool);

        let price = await fruits.TotalFruitPrice('B');
        assert.deepEqual([{
            total_price: '6'
        }], price)
    });
    it('should return the total sum of the fruit baskets for a given fruit type', async function() {
        let fruits = baskets(pool);

        let fruitsType = await fruits.TotalSum('Banana');
        assert.deepEqual([{
            total_qty: '2'
        }], fruitsType)
    })
    after(function() {
        pool.end();
    });
});