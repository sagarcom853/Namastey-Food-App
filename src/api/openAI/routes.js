import OpenAI from "openai";
const client = new OpenAI();

console.log(response.output_text);
export const handleOpenAI = async (req, res) => {
  const { query } = req.body;
  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }

  try {
    // const response = await axios.post(
    //   "https://api.openai.com/v1/chat/completions",
    //   {
    //     model: "gpt-3.5-turbo",
    //     messages: [{ role: "user", content: query }],
    //     max_tokens: 1000,
    //     temperature: 0.7,
    //   },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );
    const response = await client.responses.create({
      model: "gpt-5",
      input: query,
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error in OpenAI API call:", error.response?.data || error.message);
    res.status(500).json({ error: error.message || "Failed to fetch from Open AI" });
  }
};
