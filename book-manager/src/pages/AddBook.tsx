import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { axiosInstances } from "../config/axios";
import { useNavigate } from "react-router";

const initialValues = {
  title: "",
  author: "",
  genre: "",
  price: "",
  description: "",
};

export const AddBook = () => {
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    author: Yup.string().required("Author is required"),
    genre: Yup.string().required("Genre is required"),
    price: Yup.number()
      .typeError("Price must be a number")
      .required("Price is required")
      .positive("Price must be greater than 0"),
    description: Yup.string(),
  });

  const handleAddBook = async (data: typeof initialValues) => {
    try {
      const res = await axiosInstances.post("/books", data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    await handleAddBook(values);
    resetForm();
    navigate("/");
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-8 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">Add a New Book</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="space-y-5">
          <div>
            <label className="block font-semibold mb-1" htmlFor="title">
              Title<span className="text-red-500">*</span>
            </label>
            <Field
              name="title"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Book Title"
            />
            <ErrorMessage
              name="title"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1" htmlFor="author">
              Author<span className="text-red-500">*</span>
            </label>
            <Field
              name="author"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Author Name"
            />
            <ErrorMessage
              name="author"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1" htmlFor="genre">
              Genre<span className="text-red-500">*</span>
            </label>
            <Field
              name="genre"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Genre"
            />
            <ErrorMessage
              name="genre"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1" htmlFor="price">
              Price<span className="text-red-500">*</span>
            </label>
            <Field
              name="price"
              type="number"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Price"
              min="0"
              step="0.01"
            />
            <ErrorMessage
              name="price"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1" htmlFor="description">
              Description
            </label>
            <Field
              as="textarea"
              name="description"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Description (optional)"
              rows={3}
            />
            <ErrorMessage
              name="description"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
          >
            Add Book
          </button>
        </Form>
      </Formik>
    </div>
  );
};
