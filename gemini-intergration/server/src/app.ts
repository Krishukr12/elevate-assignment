import express, { Request, Response } from "express";
import { summarizeText } from "./utils/summarizer";
import cors from "cors";
const PORT = 8000;
const app = express();

app.use(express.json());
app.use(cors());

app.get("/health", (req: Request, res: Response) => {
  res.send("server is healthy");
});

app.post("/summarize", async (req: Request, res: Response) => {
  const { text } = req.body;
  const summary = await summarizeText(text);
  res.status(200).send({
    data: summary,
  });
});

app.listen(PORT, () => {
  console.log(`server is running on port:${PORT}`);
});
