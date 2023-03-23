import * as path from 'path';
import * as dotenv from 'dotenv';

let initialized = false;

export const initializeEnvinronment = () => {
  // const env = process.env.NODE_ENV || 'local';
  // const envName = `.env.${env}`;
  const envName = '.env';
  const dotenv_path = path.resolve(process.cwd(), envName);

  if (!initialized) {
    initialized = true;
    console.log('Inicializando variaveis de ambientes. ', process.env.NODE_ENV);
    dotenv.config({ path: dotenv_path });
  }

  return envName;
};
