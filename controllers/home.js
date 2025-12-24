const User = require('../models/User');
const Car = require('../models/Car');
const Booking = require('../models/Booking');
const uploadImage = require("../utils/uploadImage");

exports.GetHomePage = async(req,res) =>{
    try{
        let user = await User.findOne({id:req.user.id})
        if(!user || !req.user){
            return res.status(401).json({message:"User not found"})
        }
        console.log()
        return res.status(200).json({
            message:'Home Page',
            user:user
        })
    }catch(e){
        console.log('error while rendering homepage')
        console.log(e)
        return res.status(400).json({
            message:'Authentication Failed'
        })
    }
}


exports.GetCar = async (req,res) =>{
    try{
       const cars = await Car.findOne({_id:req.params.id});
       
           res.status(200).json({
             success: true,
             count: cars.length,
             data: cars
           })
    }catch(e){
        console.log('error while rendering getcar')
        console.log(e)
    }
}

exports.GetBookingsPage = async (req, res) => {
  try {
    const bookings = await Booking.find();

    return res.status(200).json({
      message: 'Bookings fetched',
      bookings
    });
  } catch (e) {
    console.error('GetBookingsPage error:', e);
    return res.status(500).json({
      message: 'Failed to fetch bookings'
    });
  }
};

exports.CreateBooking = async (req, res) => {
  try {
    console.log('Booking request body:', req.body);

    const {
      userId,
      carId,
      pickupDate,
      returnDate,
      pickupLocation,
      dropLocation,
      driverOption,
      paymentMethod,
      totalDays,
      totalAmount,
      pricePerDay,
      paymentId,
      orderId,
      paymentStatus,
    } = req.body;

    if (
      ! userId ||
      ! carId ||
      ! pickupDate ||
      ! returnDate ||
      ! pickupLocation ||
      ! dropLocation ||
      ! driverOption ||
      ! paymentMethod ||
      ! totalDays ||
      ! totalAmount ||
      ! pricePerDay ||
      ! paymentId ||
      ! orderId ||
      ! paymentStatus
    ) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const booking = await Booking.create({
      bookingId: Date.now().toString(), 
      userId,
      carId,
      pickupDate,
      returnDate,
      pickupLocation,
      dropLocation,
      driverOption,
      paymentMethod,
      totalDays,
      totalAmount,
      pricePerDay,
      paymentId,
      orderId,
      paymentStatus,
    });

    return res.status(201).json({
      message: 'Booking created successfully',
      booking
    });

  } catch (error) {
    console.error('CreateBooking error:', error);
    return res.status(500).json({
      message: 'Failed to create booking'
    });
  }
};

exports.GetBookingsDetails = async (req, res) => {
  try {
    const { userId } = req.params;
    const bookings = await Booking.find({ userId });
    // console.log('User bookings:', bookings);
    return res.status(200).json({
      message: 'User bookings fetched',
      data: bookings
    });
  } catch (error) {
    console.error('GetBookingsDetails error:', error);
    return res.status(500).json({
      message: 'Failed to fetch user bookings'
    });
  }
}

exports.UpdateUserProfile = async (req, res) => {
  try {
    let { name, username, mail, phone } = req.body;

    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    // Find user
    const user = await User.findOne({ id: req.params.id });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    let dp = user.dp; 


    if (req.files?.photo) {
      const uploadedDp = await uploadImage(
        req.files.photo,
        400,
        400,
        "dp"
      );
      dp = uploadedDp.url;
    }

  
    user.name = name ?? user.name;
    user.username = username ?? user.username;
    user.mail = mail ?? user.mail;
    user.phone = phone ?? user.phone;
    user.dp = dp;

    await user.save();

    const userResponse = user.toObject();
    delete userResponse.password;
    delete userResponse.otp;

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: userResponse
    });

  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({
      success: false,
      message: "Profile update failed"
    });
  }
};