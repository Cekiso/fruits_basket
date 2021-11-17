module.exports = function fruits(pool) {


    async function InsertValuesbasket(fruitName, quantity, price, basket) {
        await pool.query(`insert into baskets (fruit_name, quantity, price, basket) values ($1 , $2 , $3 , $4 )`, [fruitName, quantity, price, basket]);

    }

    //on the get f get all everyhing that is stored in the database 
    async function GetAll() {
        const getsql = await pool.query(`select fruit_name,quantity,price,basket from baskets`);
        return getsql.rows;
    }

    //Get by fruit type 
    async function FruitType(fruitName) {
        let types = await pool.query(`select basket from baskets where fruit_name = $1`, [fruitName]);
        return types.rows;



    }
    // a function that update the fruits in the basket
    async function UpdateFruitQuantity(fruit_name, qty) {
        await pool.query(`update baskets set quantity = quantity + $2 where fruit_name = $1 `, [fruit_name, qty])

    }
    //The total price for a given fruit
    async function TotalFruitPrice(basket) {
        let total = await pool.query(`select sum(price * quantity) as total_price from baskets where basket = $1`, [basket]);
        return total.rows;

    }
    //The function of the sum of the total of fruit basket for a given fruit type 
    async function TotalSum(type) {
        const total = await pool.query(`select sum(quantity) as total_qty from baskets where fruit_name = $1`, [type]);
        return total.rows;
    }
    return {
        InsertValuesbasket,
        GetAll,
        FruitType,
        UpdateFruitQuantity,
        TotalFruitPrice,
        TotalSum

    }
}