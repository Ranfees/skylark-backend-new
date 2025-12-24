const uploadImage = require('../utils/uploadImage')
const Car = require('../models/Car')
const Booking = require('../models/Booking')
const User = require('../models/User')


exports.Dashboard = async (req, res) => {
  try {
    return res.status(200).json({
      message: 'Welcome to Admin Dashboard',
      admin: {
        id: req.user.id,
        role: req.user.role
      }
    })
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      message: 'Admin dashboard error'
    })
  }
}

exports.GetAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select('-password -otp') 
      .sort({ createdAt: -1 })  

    return res.status(200).json({
      success: true,
      count: users.length,
      users
    })

  } catch (error) {
    console.error('GetAllUsers error:', error)
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch users'
    })
  }
}

exports.UpdateUser = async (req, res) => {
  try {
    const { id } = req.params

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name: req.body.name,
        role: req.body.role,
      },
      { new: true, runValidators: true }
    ).select('-password -otp')

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      user: updatedUser
    })

  } catch (error) {
    console.error('UpdateUser error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to update user'
    })
  }
}

exports.DeleteUser = async (req, res) => {
  try {
    const { id } = req.params

    const user = await User.findByIdAndDelete(id)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    })

  } catch (error) {
    console.error('DeleteUser error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to delete user'
    })
  }
}

exports.AddCar = async (req, res) => {
  try {
    const images = req.files?.images;

    if (!images) {
      return res.status(400).json({ message: "Images are required" });
    }

    const files = Array.isArray(images) ? images : [images];

    let uploadedImages = [];
    for (const file of files) {
      const result = await uploadImage(
        file,
        800,
        600,
        `skylark/cars/${req.body.name}`

      );
      uploadedImages.push(result);
    }

    let features = req.body["features[]"] || [];
    if (!Array.isArray(features)) {
      features = [features];
    }


    const car = await Car.create({
      name: req.body.name,
      model: req.body.model,
      seats: Number(req.body.seats),
      category: req.body.category,
      fuel: req.body.fuel,
      status: req.body.status,
      price: Number(req.body.price),
      safetyRating: req.body.safetyRating,
      transmission: req.body.transmission,
      description: req.body.description,
      features: features,
      images: uploadedImages
    });

    res.status(201).json({
      success: true,
      message: "Car added successfully",
      data: car
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.GetAllCars = async (req, res) => {
  try {
    const cars = await Car.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: cars.length,
      data: cars
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch cars",
      error: error.message
    });
  }
};



exports.GetCars = async (req, res) => {
  const cars = await Car.find();
  res.json({ data: cars });
};

exports.UpdateCar = async (req, res) => {
  await Car.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Car updated" });
};

exports.DeleteCar = async (req, res) => {
  await Car.findByIdAndDelete(req.params.id);
  res.json({ message: "Car deleted" });
};

exports.GetTotalSummary = async (req,res) => {
  try{
 
    const totalCars = await Car.countDocuments()
    const totalUsers = await User.countDocuments()
    const totalBooking = await Booking.countDocuments()
    const result = await Booking.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" }
        }
      }
    ])
    
    const totalRevenue = result[0]?.totalRevenue || 0

    return res.status(200).json({
      success:true,
      data:{ totalBooking , totalCars , totalRevenue , totalUsers},
      message:"total summary send"
    })    

  }catch(e){
    return res.status(500).json({
      success:false,
      message:"summary not retrived from backend"
    })
  }
}

exports.GetCarCategoryStats = async (req, res) => {
  try {
    const result = await Car.aggregate([
      {
        $group: {
          _id: "$category",   
          count: { $sum: 1 }
        }
      }
    ])

    const labels = result.map(i => i._id)
    const data = result.map(i => i.count)

    res.status(200).json({
      success: true,
      data: { labels, data }
    })

  } catch (e) {
    console.error(e)
    res.status(500).json({ success: false })
  }
}

exports.GetMonthlyBookings = async (req, res) => {
  try {
    const result = await Booking.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } }
    ])


    const labels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    const data = Array(12).fill(0)

    result.forEach(item => {
      data[item._id - 1] = item.count
    })

    res.status(200).json({
      success: true,
      data: {
        labels,
        data
      }
    })

  } catch (e) {
    console.error(e)
    res.status(500).json({ success: false })
  }
}

exports.GetMonthlyRevenue = async (req, res) => {
  try {
    const result = await Booking.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalRevenue: { $sum: "$totalAmount" }
        }
      },
      { $sort: { "_id": 1 } }
    ])

    const labels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    const data = Array(12).fill(0)

    result.forEach(item => {
      data[item._id - 1] = item.totalRevenue
    })

    res.status(200).json({
      success: true,
      data: {
        labels,
        data
      }
    })

  } catch (e) {
    console.error(e)
    res.status(500).json({ success: false })
  }
}

exports.GetMonthlyUserGrowth = async (req, res) => {
  try {
    const result = await User.aggregate([
      {
        $project: {
          effectiveDate: {
            $ifNull: ["$createdAt", "$updatedAt"]
          }
        }
      },
      {
        $group: {
          _id: { $month: "$effectiveDate" },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } }
    ])

    const labels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    const data = Array(12).fill(0)

    result.forEach(item => {
      data[item._id - 1] = item.count
    })

    res.status(200).json({
      success: true,
      data: { labels, data }
    })

  } catch (e) {
    console.error(e)
    res.status(500).json({ success: false })
  }
}



