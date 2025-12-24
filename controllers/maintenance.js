const Maintenence = require('../models/Maintenence');

exports.AddMaintenance = async (req, res) => {
    try {
        const maintenance = new Maintenence(req.body);
        await maintenance.save();
        res.json({ message: "Maintenance added" });
    } catch (error) {
        console.error('maintanence error:', error);
        return res.status(500).json({
            message: 'Failed to create booking'
        })

    };
};


exports.GetCarMaintenance = async (req, res) => {
        try {
            const list = await Maintenence.find({ carid: req.params.carid })
                .sort({ createdAt: -1 });
            res.json({ data: list });
        } catch (error) {
            console.error('maintanence error:', error);
            return res.status(500).json({
                message: 'Failed to create booking'
            })

        };
    }