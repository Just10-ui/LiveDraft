import cors from 'cors';
import express from 'express';

export const parseJson = express.json();
export const crossOrig = cors({origin: 'http://127.0.0.1:5500'});