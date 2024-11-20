import type { Express } from "express";
import { authenticateUserRouter } from "./authenticate-user/authenticate-user-router";
import { createCategoryRouter } from "./category/create-category-router";
import { createNoteRouter } from "./note/create-note-router";
import { getNotesRouter } from "./note/get-notes-router";
import { createUserRouter } from "./user/create-user-router";
import { refreshTokenRouter } from "./authenticate-user/refresh-token-router";
import { deleteNoteRouter } from "./note/deleted-note-router";
import { createNoteAndCategoryRouter } from "./note/create-note-and-category-router";
import { deleteCategoryRouter } from "./category/delete-category-router";
import { getNotesByCategoriesRouter } from "./note/get-notes-by-categories-router";
import { getNoteByIdRouter } from "./note/get-note-by-id.router";
import { getCategoriesRouter } from "./category/get-categories.router";
import { updateNoteRouter } from "./note/update-note.router";

const router = (app: Express) => {
	app.use(
		createNoteRouter,
		createNoteAndCategoryRouter,
		getNotesRouter,
		getNotesByCategoriesRouter,
		createCategoryRouter,
		deleteCategoryRouter,
		createUserRouter,
		authenticateUserRouter,
		refreshTokenRouter,
		deleteNoteRouter,
		getNoteByIdRouter,
		getCategoriesRouter,
		updateNoteRouter
	);
};

export default router;
