import mongoose from 'mongoose';
import StudentGrades from './StudentGrades.js';

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGODB;
db.studentGrades = StudentGrades(mongoose);
export { db };
