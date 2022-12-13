const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const postSignUp = `${BASE_URL}/auth/signup`;
export const getSignIn = `${BASE_URL}/auth/signin`;

export const getScheduleCalendar = `${BASE_URL}/schedule/calendar`;
export const getScheduleDetail = `${BASE_URL}/schedule/detail`;

export const getMyPillList = `${BASE_URL}/user/pill`;
