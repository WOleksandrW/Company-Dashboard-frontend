const usernameRegexp = /^[a-zA-Z0-9_]*$/;
const emailRegexp = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
const passwordRegexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
const titleRegexp = /^[a-zA-Z0-9\s]*$/;

export { usernameRegexp, emailRegexp, passwordRegexp, titleRegexp };
