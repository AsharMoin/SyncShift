import { getEmployeeSchedule, updateEmployeeSchedule } from '../controllers/schedules'
import express from 'express';
const router = express.Router()

router.get('/', getEmployeeSchedule)
router.post('/', updateEmployeeSchedule)

export default router