import { env } from '../utils/env';
import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  jwtSecret: env('JWT_SECRET', 'my-secret'),
  jwtExpiresIn: env('JWT_EXPIRES_IN', '3600s'),
}));
