import { Request, Response } from "express";
import { EmployeeModel } from "../models/Employee";
import { ScheduleModel } from "../models/Schedule";
import jwt from "jsonwebtoken";

const login = async (req: Request, res: Response) => {
  try {
    const { employeeId } = req.body;

    if (!employeeId) {
      return res.status(400).send("Enter an Employee ID");
    }

    // Find the employee by employeeId
    const employee = await EmployeeModel.findOne({ employeeId });

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    // Create a JWT token
    const token = jwt.sign({ employeeName: employee.employeeName, employeeId: employee.employeeId }, process.env.JWT_SECRET || "your_secret_token", {
        expiresIn: "20min", // Token expiration time
    });

    // Retrieve schedules associated with the employee
    const schedules = await ScheduleModel.find({ employeeId });

    res.status(200).json({ employeeName: employee.employeeName, employeeId: employee.employeeId, schedules, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default login;
