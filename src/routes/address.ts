import express from 'express';
import { createAddress, updateAddress, getAddress } from '../controller/addressController';
import { createAddressSchema, updateAddressSchema } from '../validators/addressValidator';
import { validateRequest } from '../middleware/validateRequest.ts';

const router = express.Router();


router.post(
    '/address',
    validateRequest(createAddressSchema),
);

// PATCH /addresses/{userId}
router.put(
    '/addresses/:userId',
    validateRequest(updateAddressSchema),
    updateAddress
);

router.get(
    '/addresses/:userId',
    getAddress
);

export default router;