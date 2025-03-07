import request from 'supertest';
import app from '../app';
import { StatusCodes } from 'http-status-codes';

describe('User Controller', () => {
    it('should get a list of users', async () => {
        const response = await request(app).get('/users');
        expect(response.status).toBe(StatusCodes.OK);
        expect(response.body).toBeInstanceOf(Array);
    });

    it('should get user count', async () => {
        const response = await request(app).get('/users/count');
        expect(response.status).toBe(StatusCodes.OK);
        expect(response.body).toHaveProperty('count');
    });

    it('should get a user by ID', async () => {
        const userId = 1; // Replace with a valid user ID
        const response = await request(app).get(`/users/${userId}`);
        if (response.status === StatusCodes.OK) {
            expect(response.body).toHaveProperty('user');
        } else {
            expect(response.status).toBe(StatusCodes.NOT_FOUND);
        }
    });

    it('should create a new user', async () => {
        const newUser = {
            id: 2, // Replace with a valid user ID
            name: 'John Doe',
            email: 'john.doe@example.com',
        };
        const response = await request(app).post('/users').send(newUser);
        if (response.status === StatusCodes.CREATED) {
            expect(response.body).toHaveProperty('id', newUser.id);
            expect(response.body).toHaveProperty('name', newUser.name);
            expect(response.body).toHaveProperty('email', newUser.email);
        } else if (response.status === StatusCodes.NOT_FOUND) {
            expect(response.status).toBe(StatusCodes.NOT_FOUND);
        } else {
            expect(response.status).toBe(StatusCodes.CONFLICT);
        }
    });
});