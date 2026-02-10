import express from 'express';
import { getTravelChecklist } from '../controllers/aiController.js';

const aiRouter = express.Router();

aiRouter.post('/checklist', getTravelChecklist);

export default aiRouter;
