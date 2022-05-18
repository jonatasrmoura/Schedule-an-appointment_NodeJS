import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Schedule from 'App/Models/Schedule';
import User from 'App/Models/User';

export default class SchedulesController {
  public async store({ params, request, response }: HttpContextContract) {
    const { userId } = params;

    const {
      date,
      time,
      tel,
      description,
    } = request.only(['date', 'time', 'tel', 'description']);

    const userExists = await User.findOrFail(userId);

    if (!userExists) {
      throw new Error('User do not exists!');
    }

    const dateExists = await Schedule.findBy('date', date);

    if (dateExists && dateExists.time === time) {
      throw new Error('Time already is used!');
    }

    const availableTime = (String(time).slice(0, 2));

    if (Number(availableTime) < 9 || Number(availableTime) > 17) {
      throw new Error('Invalid time!');
    }

    await Schedule.create({
      userId: userExists.id,
      date,
      time,
      tel,
      description
    });

    return response.status(201).send('Schedule created successfully!');
  }

  public async index() {
    const schedules = await User.all();

    return schedules;
  }

  public async update({ params, request, response }: HttpContextContract) {
    const { id, userId } = params;
    const {
      date,
      time,
      tel,
      description,
      status,
    } = request.only(['date', 'time', 'tel', 'description', 'status']);

    const user = await User.findOrFail(userId);

    if (!user || user.isAdmin === false) {
      throw new Error('User not found!');
    }

    const schedule = await Schedule.findOrFail(id);

    if (!schedule) {
      throw new Error('Schedule not found!');
    }

    schedule.date = date;
    schedule.time = time;
    schedule.tel = tel;
    schedule.description = description;
    schedule.status = status;

    await schedule.save();

    return response.status(200).send('Schedule updated successfully!');
  }
}
