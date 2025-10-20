import { Router } from "express";
import documentsRouter from "./documents.routes.js";
import filesRouter from "./files.routes.js";

const router = Router();

router.use("/demo", documentsRouter);
router.use("/files", filesRouter);

export default router;
