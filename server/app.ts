import express, { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import logger from 'morgan'

import homeRouter from './routes/home';
import loginRouter from './routes/login';

const app = express();

app.use(logger('dev'));
app.use(express.json());

app.use('/', loginRouter)
app.use('/:id', homeRouter);

// catch 404 and forward to error handler
app.use(function(req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function(err: Error, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(500);
  res.render('error');
});

export default app