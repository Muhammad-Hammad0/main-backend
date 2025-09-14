import User from "../model/userModel.js";

export const addToCart = async (req, res) => {
  try {
    const { itemId, size } = req.body;

    const userData = await User.findById(req.userId);
    if (!userData) {
      return res.status(404).json({ message: "User Not Found" });
    }

    let cartData = userData.cartData || {};

    // ✅ Agar product exist karta hai
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    await User.findByIdAndUpdate(req.userId, { cartData });

    return res.status(201).json({ message: "Added To Cart", cartData });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Add TO Cart Error" });
  }
};

export const UpdateCart = async (req, res) => {
  try {
    const { itemId, size, quantity } = req.body;
    const userData = await User.findById(req.userId);

    if (!userData) {
      return res.status(404).json({ message: "User Not Found" });
    }

    let cartData = userData.cartData;

    if (cartData[itemId] && cartData[itemId][size] !== undefined) {
      if (quantity <= 0) {
        // ✅ agar quantity 0 ho to delete kar do
        delete cartData[itemId][size];
        if (Object.keys(cartData[itemId]).length === 0) {
          delete cartData[itemId];
        }
      } else {
        cartData[itemId][size] = quantity;
      }
    }

    await User.findByIdAndUpdate(req.userId, { cartData });

    return res.status(201).json({ message: "Cart Updated", cartData });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Update Cart Error" });
  }
};

export const getUserCart = async (req, res) => {
  try {
    const userData = await User.findById(req.userId);
    let cartData = userData.cartData || {};
    return res.status(200).json(cartData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Get Cart Error" });
  }
};
