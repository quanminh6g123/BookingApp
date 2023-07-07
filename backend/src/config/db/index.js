const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(
            'mongodb+srv://admin:admin123@booking.wku5jbx.mongodb.net/',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
        );
        console.log('Success');
    } catch (error) {
        console.log('Failed');
    }
}

module.exports = { connect };
