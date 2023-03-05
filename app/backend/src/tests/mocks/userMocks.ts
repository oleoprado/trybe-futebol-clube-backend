const validLogin = { email: 'admin@admin.com', password: 'secret_admin'};
const invalidLogin = { email: 'leo.leo.com', password: 212}
const invalidEmailOrPassword = { message: 'Invalid email or password' };
const invalidPassword = { email: 'admin@admin.com', password: 'secret_admin23'};
const role = { role: 'admin' };

export {
  validLogin,
  invalidLogin,
  invalidEmailOrPassword,
  invalidPassword,
  role
}