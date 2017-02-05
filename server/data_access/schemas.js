"use strict";

import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const AppSchema = new Schema({
    _id:{ type: Schema.Types.ObjectId, require: true},
    versionFamiliesById: { type: Object, require: true},
    worksById: { type: Object, require: true},
    doisById:  {type: Object, require: true},
    vectorsByName:  {type: Object, require: true}
});
