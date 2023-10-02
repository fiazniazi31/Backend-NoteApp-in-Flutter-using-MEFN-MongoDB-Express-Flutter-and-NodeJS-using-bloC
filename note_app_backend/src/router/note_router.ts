import express from "express";
import { NoteController } from "../controler/note_controler";

const noteRouter: express.Router = express.Router();

noteRouter.get("/getMyNotes", NoteController.getMyNotes);
noteRouter.post("/addNote", NoteController.addNote);
noteRouter.put("/updateNote", NoteController.updateNote);
noteRouter.delete("/deleteNote", NoteController.deleteNote);

export default noteRouter;
