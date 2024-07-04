export type User<T> = T & {
  usertype: 'patient' | 'admin' | 'analyst' | 'doctor';
};
