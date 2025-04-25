// Firebase module declaration
declare module '*/firebase' {
  import { FirebaseApp } from 'firebase/app';
  import { Firestore } from 'firebase/firestore';

  export const app: FirebaseApp;
  export const db: Firestore;
} 