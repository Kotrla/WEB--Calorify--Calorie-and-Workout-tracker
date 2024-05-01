import { Express } from 'express';
import { errorHandler } from './middleware/error.js';
import { UsersRoute } from './routes/users.route.js';
import { FoodsRoute } from './routes/foods.route.js';
import { MealsRoute } from './routes/meals.route.js';
import { TargetRoute } from './routes/target.route.js';
import { WorkoutsRoute } from './routes/workouts.route.js';

export default function routes(app: Express) {
	app.use('/users', UsersRoute);
	app.use('/foods', FoodsRoute);
	app.use('/meals', MealsRoute);
	app.use('/target', TargetRoute);
	app.use('/workout', WorkoutsRoute);

	app.use(errorHandler);
}
