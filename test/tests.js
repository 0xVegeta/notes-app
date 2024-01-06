const { Request, Response } = require("express");
const {
	createNote,
	getAllNotes,
	getNoteById,
	updateNoteById,
	deleteNoteById,
	shareNoteById,
	searchNotes,
} = require("../server/controller/notes");
const Note = require("../server/models/notes.model");

jest.mock("../server/models/notes.model");

jest.mock("../server/models/user.model");


describe("=====getAllNotes======", () => {
	it("should return all the notes sorted of a loggin user by date in ascending order", async () => {
		const reqMock = {
			user: {
				userID: "659845a2d",
				name: "user",
				email: "user@gmail.com",
			},
		};
		const resMock = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		};
		const notes = [
			{ _id: "note1", textBody: "Note 1", date: new Date("2022-01-01") },
			{ _id: "note2", textBody: "Note 2", date: new Date("2022-01-02") },
			{ _id: "note3", textBody: "Note 3", date: new Date("2022-01-03") },
		];
		Note.find = jest.fn().mockResolvedValue(notes);
		await getAllNotes(reqMock, resMock);
		expect(resMock.status).toHaveBeenCalledWith(200);
		expect(resMock.json).toHaveBeenCalledWith({
			notes: [
				{
					id: "note1",
					textBody: "Note 1",
					date: new Date("2022-01-01"),
					author: "validUserEmail",
					author: "user@gmail.com",
				},

				{
					id: "note2",
					textBody: "Note 2",
					date: new Date("2022-01-02"),
					author: "validUserEmail",
					author: "user@gmail.com",
				},
				{
					id: "note3",
					textBody: "Note 3",
					date: new Date("2022-01-03"),
					author: "user@gmail.com",
				},
			],
		});
	});

	it("should return a 500 status code and an error message when there is an error fetching notes", async () => {
		const reqMock = {
			user: {
				userID: "659845a2d",
				name: "user",
				email: "user@gmail.com",
			},
		};
		const resMock = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		};
		Note.find = jest.fn().mockRejectedValue(new Error("Error fetching notes"));
		await getAllNotes(reqMock, resMock);
		expect(resMock.status).toHaveBeenCalledWith(500);
		expect(resMock.json).toHaveBeenCalledWith({
			error: "Error fetching your notes",
		});
	});

	it("should return an empty array when the user has no notes", async () => {
		const reqMock = {
			user: {
				userID: "659845a2d",
				name: "user",
				email: "user@gmail.com",
			},
		};
		const resMock = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		};
		Note.find = jest.fn().mockResolvedValue([]);
		await getAllNotes(reqMock, resMock);
		expect(resMock.status).toHaveBeenCalledWith(200);
		expect(resMock.json).toHaveBeenCalledWith({ notes: [] });
	});
});

describe("======createNote======", () => {
	it("should create a new note", async () => {
		const reqMock = {
			user: {
				userID: "659845a2d",
				name: "user",
				email: "user@gmail.com",
			},
			body: {
				textBody: "Test note",
			},
		};

		const resMock = {
			status: jest.fn(() => resMock),
			json: jest.fn(),
		};

		Note.create.mockResolvedValue({
			author: reqMock.user,
			textBody: reqMock.body.textBody,
		});

		await createNote(reqMock, resMock);
		expect(Note.create).toHaveBeenCalledWith({
			author: reqMock.user,
			textBody: reqMock.body.textBody,
		});

		expect(resMock.status).toHaveBeenCalledWith(200);
		expect(resMock.json).toHaveBeenCalledWith({
			textBody: "Test note",
			author: reqMock.user.email,
		});
	});

	it("should handle invalid note data when creating a new note", async () => {
		const req = {
			body: { textBody: null },
			user: {
				email: "test@example.com",
			},
		};
		const res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		};
		await createNote(req, res);
		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({ error: "Enter all the fields" });
	});
});


describe("=====update note by ID=====", () => {
	it("should update note when given valid ID and authorized user", async () => {
		const req = {
			params: { id: "validId" },
			body: { textBody: "newTextBody" },
			user: { _id: "authorizedUserId", email: "authorizedUserEmail" },
		};
		const res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		};
		const note = {
			_id: "validId",
			author: "authorizedUserId",
			textBody: "oldTextBody",
			save: jest.fn(),
		};
		Note.findById = jest.fn().mockResolvedValue(note);

		await updateNoteById(req, res);

		expect(Note.findById).toHaveBeenCalledWith("validId");
		expect(note.textBody).toBe("newTextBody");
		expect(note.save).toHaveBeenCalled();
		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith({
			textBody: "newTextBody",
			author: "authorizedUserEmail",
		});
	});

	it("should return error when given unauthorized user", async () => {
		const req = {
			params: { id: "validId" },
			body: { textBody: "newTextBody" },
			user: { _id: "unauthorizedUserId", email: "unauthorizedUserEmail" },
		};
		const res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		};
		const note = {
			_id: "validId",
			author: "authorizedUserId",
			textBody: "oldTextBody",
			save: jest.fn(),
		};
		Note.findById = jest.fn().mockResolvedValue(note);

		await updateNoteById(req, res);

		expect(Note.findById).toHaveBeenCalledWith("validId");
		expect(res.status).toHaveBeenCalledWith(403);
		expect(res.json).toHaveBeenCalledWith({
			error: "Unauthorized to update this note",
		});
	});

	it("should return error when given missing textBody field", async () => {
		const req = {
			params: { id: "validId" },
			body: {},
			user: { _id: "authorizedUserId", email: "authorizedUserEmail" },
		};
		const res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		};

		await updateNoteById(req, res);

		expect(res.status).toHaveBeenCalledWith(400);
		expect(res.json).toHaveBeenCalledWith({
			error: "No new updates",
		});
	});

		it("should accept only string for", async () => {
			const req = {
				params: { id: "validId" },
				body: {},
				user: { _id: "authorizedUserId", email: "authorizedUserEmail" },
			};
			const res = {
				status: jest.fn().mockReturnThis(),
				json: jest.fn(),
			};

			await updateNoteById(req, res);

			expect(res.status).toHaveBeenCalledWith(400);
			expect(res.json).toHaveBeenCalledWith({
				error: "No new updates",
			});
		});

});
