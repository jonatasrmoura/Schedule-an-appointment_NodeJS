import Route from '@ioc:Adonis/Core/Route';

import EnsureAuthenticated from '../app/Middleware/EnsureAuthenticated';

const ensureAuthenticated = new EnsureAuthenticated();

Route.group(() => {
  Route.post('/users', 'UsersController.store');
  Route.post('/users/authenticate', 'UsersController.authenticate');
  Route.post('/users/schedules', 'UsersController.index');

  Route.post('/schedules/:userId', 'SchedulesController.store');
  Route.get('/schedules', 'SchedulesController.index');
  Route.patch('/schedules/:id/:userId', 'SchedulesController.update');
}).prefix('/api')
