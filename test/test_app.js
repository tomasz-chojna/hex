import { expect } from 'chai';
import server from '../src/server/app';

describe('Application Test', () => {
    it ('should start', () => {
        server();
    });
});