import { Request, Response } from "express";
import { ScheduleModel, ScheduleProps } from "../models/Schedule";
import { EmployeeModel } from "../models/Employee";

const getEmployeeSchedule = async (req: Request, res: Response) => {
  const employeeId = req.baseUrl.replace(/^\//, '');
  
  try {
    const employee = await EmployeeModel.findOne({ employeeId: employeeId });
    if (!employee) {
        res.status(404).send('No such employee!')
        return 
    }
    const schedule = await ScheduleModel.find({ employeeId: employeeId });

    res.status(201).json({ employee, schedule })

  }catch(error : any) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const updateEmployeeSchedule = async (req: Request, res: Response) => {
  try {
    const { employeeId, schedule, employeeName } = req.body;

    // Find or create the employee based on the provided name
    let employee = await EmployeeModel.findOne({ employeeName, employeeId });
    if (!employee) {
      // If the employee doesn't exist, create a new one
      employee = await EmployeeModel.create({ employeeName, employeeId });
    }

    await ScheduleModel.deleteMany({ employeeName, employeeId });

    const schedules = await Promise.all(
      schedule.map(async (event: ScheduleProps) => {
        const { title, allDay, extendedProps } = event;
        let { start, end } = event;

        // Create and save the new schedule for the given employee and event details
        const schedule = new ScheduleModel({
          employeeName,
          employeeId,
          title,
          start,
          end,
          allDay,
          extendedProps,
        });

        await schedule.save();

        return schedule;
      })
    );

    res.status(201).json(schedules);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { getEmployeeSchedule, updateEmployeeSchedule };
