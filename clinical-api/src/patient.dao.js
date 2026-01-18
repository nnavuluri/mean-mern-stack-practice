import mangoose from 'mongoose';
import patientSchema from './patient.model';

patientSchema.statics=
{
      
// inside schema.statics (model layer)
get: async function (query = {}) {
  // .lean() returns plain JS objects, faster if you don't need Mongoose document methods
  return await this.find(query).lean();
},

    
  
// model static (NEW)
create: async function (data) {
  const patient = new this(data);
  return await patient.save(); // returns saved document
},


//     update:function (query,updateData,cb) {
//         this.findOneAndUpdate(query,{$set:updateData},cb);
// },


// patient.model.js (inside schema.statics)
update: async function (query, updateData, options = { returnDocument: 'after', runValidators: true, context: 'query' }) {
  return await this.findOneAndUpdate(query, { $set: updateData }, options).lean();
},


//     delete:function (query,cb) {
//         this.deleteOne(query,cb);   
//     }



delete: async function (query) {
  // returns a write result: { acknowledged: true, deletedCount: <number> }
  return await this.deleteOne(query);
}
};

var patientModel = mangoose.model('Patient', patientSchema,'patient');  

module.exports = patientModel;
