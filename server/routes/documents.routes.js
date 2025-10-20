import { Router } from "express";
import {
  createDemoDocument,
  getDemoDocumentById,
} from "../controllers/documents.controller.js";

const router = Router();

router.post("/doc", createDemoDocument);
router.get("/doc/:id", getDemoDocumentById);

export default router;
