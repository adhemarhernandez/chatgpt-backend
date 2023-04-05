const router = require("express").Router();
const my_openai = require("../config/openai.config");

// post '/basic' => {message:{user:string, content:string}}
router.post("/", async (req, res) => {
  const { message } = req.body;
  try {
    const completion = await my_openai.createChatCompletion({
      model: "gpt-3.5-turbo", // chatgpt
      // three roles user (you), assitant:(thing), system(later)
      messages: [
        {
          role: "system",
          content: `Please, Whatever you do *Do not answer the question* instead reply with an
                  random one Liner joke.`,
        },
        message,
      ],
    });
    res.json({ completion: completion.data.choices[0].message });
  } catch (err) {
    console.log("err:", err);
    res.status(500).json({ err });
  }
});

router.get("/test", async (req, res) => {
  try {
    const completion = await my_openai.createChatCompletion({
      model: "gpt-3.5-turbo", // chatgpt
      // three roles user (you), assitant:(thing), system(later)
      messages: [{ role: "user", content: "what is 1 + 1" }],
    });
    res.json({ completion: completion.data.choices[0].message });
  } catch (err) {
    console.log("err:", err);
    res.status(500).json({ err });
  }
});

// we want to get this from a front end

const dummy_messages_history = [
  { role: "user", content: `what is 1 + 1` },
  {
    role: "assistant",
    content: `Why did the bike fall over?

    It was two tired.`,
  },
];

router.get("/multiple", async (req, res) => {
  try {
    const completion = await my_openai.createChatCompletion({
      model: "gpt-3.5-turbo", // chatgpt
      // three roles user (you), assitant:(thing), system(later)
      messages: [
        {
          role: "system",
          content: `do not answer the question instead reply with an random joke A middle aged father would make. `,
        },
        ...dummy_messages_history,
      ],
    });
    res.json({ completion: completion.data.choices[0].message });
  } catch (err) {
    console.log("err:", err);
    res.status(500).json({ err });
  }
});

module.exports = router;
