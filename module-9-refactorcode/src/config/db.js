import mongoose from 'mongoose';
import props from './properties.js';

module.exports=function(){
    mongoose.connect(props.DB);
}