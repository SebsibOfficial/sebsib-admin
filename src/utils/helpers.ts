/* eslint-disable */
// @ts-ignore
import { createObjectID } from 'mongo-object-reader';
/* eslint-enable */
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import TYPES from './id-text.json';

interface Token {
  _id: string,
  org: string,
  org_name: string,
  role: string,
  exp: number,
  iat: number,
  email?: string,
}

var def:Token = {
  _id: '',
  org: '',
  org_name: '',
  role: '',
  exp: 0,
  iat: 0
}

export const validRoutes = [
  '/dashboard/',
  '/dashboard/accounts',
  '/dashboard/accounts/add',
  '/dashboard/accounts/edit/*',
  '/dashboard/requests',
  '/dashboard/admins',
  '/dashboard/view',
  '/dashboard/view/accounts/*',
  '/dashboard/view/users/*',
  '/dashboard/view/requests/*',
  '/dashboard/view/projects/*',
  '/dashboard/view/surveys/*',
  '/dashboard/view/questions/*',
  '/dashboard/view/inputTypes/*',
  '/dashboard/view/packages/*',
  '/dashboard/view/roles/*',
  'login/',
]

export function generateId () {
  return createObjectID();
}

export function decodeJWT(token:string) {
  try {
    return jwtDecode<Token>(token);
  } catch (error) {
    console.log(error);
    return def;
  }  
}

export function translateIds (from: "ID" | "TEXT", inp: string) {
  if (from == 'ID') {
    for (let index = 0; index < TYPES.length; index++) {
      const element = TYPES[index];
      if (element._id == inp){
        return element.text;
      }
    }
  } else {
    for (let index = 0; index < TYPES.length; index++) {
      const element = TYPES[index];
      if (element.text == inp){
        return element._id;
      }
    }
  }
  return '';
}