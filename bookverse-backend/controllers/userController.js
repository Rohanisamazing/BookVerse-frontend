import User from '../models/userModel.js';

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password'); // exclude password

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error('❌ Error fetching user:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};


export const updateUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: updatedUser,
    });
  } catch (error) {
    console.error('❌ Error updating user:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
