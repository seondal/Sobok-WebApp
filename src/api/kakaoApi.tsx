// 인가 코드 받아오는 >> 연습 << 용

const REST_API_KEY = process.env.KAKAO_API_KEY;
const REDIRECT_URI = "http://localhost/login";

const KAKAO_BASE_URL = "https://kauth.kakao.com/oauth/";

export const getAuthCode = `${KAKAO_BASE_URL}authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;
