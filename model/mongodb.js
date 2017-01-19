/**
 * Created by Yu.S.Z on 2017/1/11.
 */
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/STOCKS');

exports.mongoose=mongoose;