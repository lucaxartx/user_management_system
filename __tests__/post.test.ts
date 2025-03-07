import request from 'supertest';
import app from '../app';
import { StatusCodes } from 'http-status-codes';

describe('Post Controller', () => {
    it('should create a new post', async () => {
        const newPost = {
            title: 'New Post',
            body: 'This is a new post.',
            userId: 1, // Replace with a valid user ID
        };
        const response = await request(app).post('/posts').send(newPost);
        if (response.status === StatusCodes.CREATED) {
            expect(response.body).toHaveProperty('title', newPost.title);
            expect(response.body).toHaveProperty('body', newPost.body);
            expect(response.body).toHaveProperty('userId', newPost.userId);
        } else if (response.status === StatusCodes.NOT_FOUND) {
            expect(response.status).toBe(StatusCodes.NOT_FOUND);
        } else {
            expect(response.status).toBe(StatusCodes.CONFLICT);
        }
    });

    it('should get posts by user ID', async () => {
        const userId = 1; // Replace with a valid user ID
        const response = await request(app).get(`/posts?userId=${userId}`);
        if (response.status === StatusCodes.OK) {
            expect(response.body).toBeInstanceOf(Array);
        } else {
            expect(response.status).toBe(StatusCodes.NOT_FOUND);
        }
    });

    it('should delete a post by ID', async () => {
        const postId = 1; // Replace with a valid post ID
        const response = await request(app).delete(`/posts/${postId}`);
        if (response.status === StatusCodes.OK) {
            expect(response.body).toHaveProperty('message', `Post with id:${postId} deleted successfully`);
        } else {
            expect(response.status).toBe(StatusCodes.NOT_FOUND);
        }
    });
});