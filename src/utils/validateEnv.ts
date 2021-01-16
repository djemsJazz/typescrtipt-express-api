import {
  cleanEnv, str,
} from 'envalid';

function validateEnv() {
  cleanEnv(process.env, {
    LOCAL_CNX_STR: str(),
  });
};

export default validateEnv;