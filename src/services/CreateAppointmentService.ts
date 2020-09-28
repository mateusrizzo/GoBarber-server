import { startOfHour} from 'date-fns';
import {getCustomRepository} from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
    provider: string;
    date: Date;
}

class CreateAppointmentService {


    public execute({date, provider}: Request): Appointment {
        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = this.appointmentsRepository.findByDate(date);

        if (findAppointmentInSameDate) {
            throw Error('This date is already booked');
        }

        const appointment = this.appointmentsRepository.create({
            provider,
            date: appointmentDate
        });
        return appointment;
    }
}

export default CreateAppointmentService;
