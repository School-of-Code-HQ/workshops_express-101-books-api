const request = require("supertest");

const app = require("../app.js");
const books = require("../books-data.js");

const validBook = { id: 3, title: "The Night Circus", author: "Erin Morgenstern" };
const modifiedBook = { id: 3, title: "The Night Movie", author: "Erin Morgy" };
const newBook = { id: 6, title: "The Bible", author: "Unknown" };

const getBooks = (id = null) => {
  const url = `/books${id ? `/${id}` : ""}`;
  return request(app).get(url).send();
};

const postBook = (book) => {
  return request(app).post("/book").send(book);
};

const putBook = (book) => {
  const url = `/books/${book.id}`;
  return request(app).put(url).send(book);
}

const deleteBook = (id) => {
  const url = `/books/${id}`;
  return request(app).delete(url).send();
}

const patchBook = (id, data) => {
  const url = `/books/${id}`;
  return request(app).patch(url).send(data);
}

describe("Read Books", () => {
  it("should return all books when sent a valid GET request", async () => {
    const response = await getBooks();
    expect(response.body).toEqual({success: true, payload: books});
  });

  it("should return the correct book when send a valid GET request with a book id", async () => {
    const response = await getBooks(validBook.id);
    expect(response.body).toEqual({success: true, payload: validBook})
  });
});

describe("Create Book", () => {
  it("should create and return the new book when sent a valid POST request", async () => {
    const response = await postBook(newBook);
    expect(response.body).toEqual({success: true, payload: newBook});
  });
});

describe("Update Book", () => {
  it("should update and return the new book when sent a valid PUT request", async () => {
    const putResponse = await putBook(modifiedBook);
    const response = await getBooks(modifiedBook.id);
    expect(putResponse.body).toEqual({success: true, payload: modifiedBook})
    expect(response.body).toEqual({success: true, payload: modifiedBook});
  });

  it("should update and return the new book when sent a valid PATCH request", async () => {
    const title = "New title";
    const payload = {...modifiedBook, title}
    const patchResponse = await patchBook(validBook.id, {title});
    const response = await getBooks(validBook.id);
    expect(patchResponse.body).toEqual({success: true, payload})
    expect(response.body).toEqual({success: true, payload});
  });
});

describe("Delete Book", () => {
  it("should delete and return the book when sent a valid DELETE request", async () => {
    const response = await deleteBook(newBook.id);
    const getResponse = await getBooks();
    expect(response.body).toEqual({success: true, payload: newBook});
    expect(getResponse.body.payload.find(book => book.id === newBook.id)).not.toBeDefined();
  });
});

