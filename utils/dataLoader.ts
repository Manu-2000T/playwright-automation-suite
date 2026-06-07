import * as fs from 'fs';
import * as path from 'path';

export function loadLoginData() {
  const filePath = path.resolve(__dirname, 'loginData.json');
  const rawData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(rawData);
}

export const envUser = {
  email: process.env.LOGIN_EMAIL || '',
  password: process.env.LOGIN_PASSWORD || ''
};
