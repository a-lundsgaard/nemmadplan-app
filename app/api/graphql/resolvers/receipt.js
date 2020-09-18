
const Receipt = require('../../models/receipt');
const User = require('../../models/user');

const { transformReceipt } = require('./merge');

module.exports = {
  receipts: async () => {
    try {
      // protecting our resolver by accessing metadata from the request object attached by our middleware
      /* if(!req.isAuth) {
         throw new Error('Unauthenticated');
       }*/

      //const user = await User.findById("5f4ff005e1144e1ad8709e7f");
     // const events = await Receipt.find();

      const userDishes = await Receipt.find({creator: "5f4ff005e1144e1ad8709e7f"})
      return userDishes.map(dish => {
        return transformReceipt(dish);
      });
    } catch (err) {
      throw err;
    }
  },

  createReceipt: async (args, req) => {

    // protecting our resolver by accessing metadata from the request object attached by our middleware
   /* if(!req.isAuth) {
      throw new Error('Unauthenticated');
    }*/

    console.log('Function called')
    console.log(args.receiptInput.ingredients)


    const receipt = new Receipt({
      name: args.receiptInput.name,
      type: args.receiptInput.type,
      text: args.receiptInput.text,
      ingredients: args.receiptInput.ingredients,
      creator: "5f4ff005e1144e1ad8709e7f"
    });

    let createdReceipt;
    try {
      const result = await receipt.save();
      createdReceipt = transformReceipt(result);
     // const creator = await User.findById("5f4ff005e1144e1ad8709e7f");

      console.log(createdReceipt)

     // console.log(creator);

   //   if (!creator) {
      //  throw new Error('User not found.');
     // }
      //creator.createdEvents.push(event);
     // await creator.save();

      return createdReceipt;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  deleteReceipt: async (args, req)=> {

    // protecting our resolver by accessing metadata from the request object attached by our middleware
    /* if(!req.isAuth) {
       throw new Error('Unauthenticated');
     }*/

    console.log('Function delete plan was called');

    try {
      const user = await User.findById("5f4ff005e1144e1ad8709e7f");
      if (!user) {
        throw new Error('User not found.');
      }

      const unwantedReceipt = await Receipt.findOne({_id: args.receiptId, creator: "5f4ff005e1144e1ad8709e7f"})
      if (!unwantedReceipt) {
        throw new Error('Receipt not found');
      }
      console.log(unwantedReceipt);

      await Receipt.findByIdAndDelete(args.receiptId);
      console.log('Weekplan successfully deleted');
      // console.log(createdWeekPlan)
      return unwantedReceipt;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

};