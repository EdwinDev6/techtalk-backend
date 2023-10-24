import User from "../models/User";

export const activateSubscription = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "This email does not exist in our database." });
    }

    user.subscription = true;

    await user.save();

    return res
      .status(200)
      .json({ message: "Subscription activated successfully.." });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const unsubscribe = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not Found." });
    }

    user.subscription = false;
    await user.save();

    return res.status(200).json({ message: "Successful unsubscription." });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
