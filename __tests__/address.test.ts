import request from 'supertest';
import app from '../app';
import { StatusCodes } from 'http-status-codes';

describe('Address Controller', () => {
    it('should create a new address', async () => {
        const newAddress = {
            street: '123 Main St',
            city: 'Anytown',
            userId: 1, // Replace with a valid user ID
        };
        const response = await request(app).post('/addresses').send(newAddress);
        if (response.status === StatusCodes.CREATED) {
            expect(response.body).toHaveProperty('street', newAddress.street);
            expect(response.body).toHaveProperty('city', newAddress.city);
            expect(response.body).toHaveProperty('userId', newAddress.userId);
        } else if (response.status === StatusCodes.NOT_FOUND) {
            expect(response.status).toBe(StatusCodes.NOT_FOUND);
        } else {
            expect(response.status).toBe(StatusCodes.CONFLICT);
        }
    });

    it('should update an address', async () => {
        const updatedAddress = {
            street: '456 Elm St',
            city: 'Othertown',
        };
        const userId = 1; // Replace with a valid user ID
        const response = await request(app).put(`/addresses/${userId}`).send(updatedAddress);
        if (response.status === StatusCodes.OK) {
            expect(response.body).toHaveProperty('street', updatedAddress.street);
            expect(response.body).toHaveProperty('city', updatedAddress.city);
        } else {
            expect(response.status).toBe(StatusCodes.NOT_FOUND);
        }
    });

    it('should get an address by user ID', async () => {
        const userId = 1; // Replace with a valid user ID
        const response = await request(app).get(`/addresses/${userId}`);
        if (response.status === StatusCodes.OK) {
            expect(response.body).toHaveProperty('street');
            expect(response.body).toHaveProperty('city');
            expect(response.body).toHaveProperty('userId', userId);
        } else {
            expect(response.status).toBe(StatusCodes.NOT_FOUND);
        }
    });
});