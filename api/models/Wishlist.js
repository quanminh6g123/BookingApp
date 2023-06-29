const mongoose = require("mongoose");

const { Schema } = mongoose;

const wishListSchema = new Schema({
   owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
   wishlist: [{
      place: { type: mongoose.Schema.Types.ObjectId, ref: 'Place' },
   }]
})

const WishListModel = mongoose.model('WishList', wishListSchema);

module.exports = WishListModel;
