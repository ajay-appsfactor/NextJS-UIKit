import { cookies } from 'next/headers';

export function setUserSession(userId) {
  cookies().set('user_id', String(userId), {
    httpOnly: true,
    path: '/',
    secure: false,
    maxAge: 60 * 60 * 24, 
  });
}

export function getUserSession() {
  const cookieStore = cookies();
  return cookieStore.get('user_id')?.value || null;
}

export function destroySession() {
  cookies().set('user_id', '', { path: '/', maxAge: 0 });
}
