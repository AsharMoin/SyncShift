import { Schema, model, Document } from 'mongoose';

interface ScheduleProps extends Document {
  employeeName: string;
  employeeId: number;
  title: string;
  start: string;
  end: string;
  allDay: boolean;
  extendedProps: {
    isWorking: boolean;
    Hours: string;
  };
}

const ScheduleSchema: Schema<ScheduleProps> = new Schema({
  employeeName: {
    type: String,
    ref: 'Employee',
    required: [true, "Must Provide Employee"],
  },
  employeeId: {
    type: Number,
    requires: [true, "Must Provide Employee ID"],
    maxlength: [6, "Must be a 6 Number ID"] 
  },
  title: {
    type: String,
    required: [true, 'Must Provide Title'],
    trim: true,
    maxlength: [20, "Title Must Be Within 20 Characters"]
  },
  start: {
    type: String,
    required: function (this: ScheduleProps) : boolean {
      return !this.allDay;
    },
  },
  end: {
    type: String,
    required: function (this: ScheduleProps) : boolean {
      return !this.allDay;
    },
  },
  allDay: {
    type: Boolean,
    required: [true, 'Must Specify Whether It\'s an All-Day Event'],
  }, 
  extendedProps: {
    isWorking: {
      type: Boolean,
      required: [true, 'Must Specify Whether It\'s a Working Event'],
    },
    Hours: {
      type: String,
      required: function (this: ScheduleProps): boolean {
        return !this.allDay;
      },
    },
  },
});

const ScheduleModel = model<ScheduleProps>('Schedule', ScheduleSchema);

export { ScheduleModel, ScheduleSchema, ScheduleProps };