import { Schema, model, Document } from 'mongoose';

// Define an Employee schema
interface EmployeeProps extends Document {
  employeeName: string;
  employeeId: Number;
}

const EmployeeSchema: Schema<EmployeeProps> = new Schema({
  employeeName: {
    type: String,
    required: [true, "Must Provide Employee Name"],
    maxlength: [20, "Name Must be Within 20 Characters"]
  },
  employeeId: {
    type: Number,
    requires: [true, "Must Provide Employee ID"],
    maxlength: [6, "Must be a 6 Number ID"] 
  }
});

const EmployeeModel = model<EmployeeProps>('Employee', EmployeeSchema);

export { EmployeeModel, EmployeeSchema }