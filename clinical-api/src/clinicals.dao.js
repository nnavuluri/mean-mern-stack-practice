import mongoose from "mongoose";
import clinicalsSchema from "./clinicals.model";

clinicalsSchema.statics = {

    // without callbacks and using async/await
     get: async function (query = {}) {
         return await this.find(query).lean();
     },
        create: async function (data) {
        const clinicalData = new this(data);
        return await clinicalData.save();
    }   

}
var clinicalsModel = mongoose.model('Clinicals', clinicalsSchema,"clinicals");
module.exports = clinicalsModel;