import * as dotenv from 'dotenv';
dotenv.config();

export function env(key: string, defaultValue: any = null): any {
  return process.env[key] ?? defaultValue;
}

export function envOrFail(key: string): any {
  if (typeof process.env[key] === 'undefined') {
    throw new Error(`Environment variable ${key} is not defined!`);
  }

  return process.env[key];
}
