"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ScheinController_1 = require("../controllers/ScheinController");
const router = express_1.default.Router();
router.post('/schein', ScheinController_1.createSchein);
router.get('/schein/:id/preview', ScheinController_1.generateScheinPDF);
exports.default = router;
