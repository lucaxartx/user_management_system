import express from 'express';
import { createAddress, updateAddress } from '../controller/addressController';
import { createAddressSchema, updateAddressSchema } from '../validators/addressValidator';
import { validateRequest } from '../middleware/validateRequest.ts';

const router = express.Router();

// POST /addresses
router.post(
    '/address',//change to address
    validateRequest(createAddressSchema), // Validate the request body
    createAddress
);

// PATCH /addresses/{userId}
router.put(
    '/addresses/:userId',
    validateRequest(updateAddressSchema),    // Validate the request body
    updateAddress
);

export default router;