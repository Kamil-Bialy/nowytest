const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const Buffer = require('Buffer');
const sharp = require('sharp');
require('dotenv').config();

const app = express();
app.use(express.json());

var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html','css','js','ico','jpg','jpeg','png','svg'],
  index: ['index.html'],
  maxAge: '1m',
  redirect: false
}
app.use(express.static('build', options))

const MongoURL = process.env.MONGO_URL;
const port = process.env.PORT || 5000;

mongoose
  .connect(MongoURL)
  .then(res => {
    console.log('Connected to mongodb');
    app.listen(port, console.log('Listening on port 5000'));
  })
  .catch(error => {
    console.error("Can't connect to mongodb", error);
    process.exit();
  });

const userModel = require('./Models/UserModel');

app.get('/', (req, res) => {
  res.send('Hallo');
});

app.post('/api/register', async (req, res) => {
  const { email, password, firstName, lastName, year, school } = req.body.user;

  let user = await userModel.findOne({ email });

  if (user) {
    return res.json(false);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  user = new userModel({
    email: email.toLowerCase(),
    password: hashedPassword,
    firstName: firstName.toLowerCase(),
    lastName: lastName.toLowerCase(),
    year: year,
    school: school.toLowerCase(),
    accepted: false,
    roleID: 0,
  });

  await user.save();
  return res.json(true);
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body.user;

  const user = await userModel.findOne({ email: email });
  if (!user) {
    return res.send(false);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.send(false);
  }

  return res.send({ logged: true, id: user._id, accepted: user.accepted });
});

app.get('/api/getUser', async (req, res) => {
  const id = req.query.id;
  const user = await userModel.findOne({ _id: id });
  return res.send(user);
});

app.get('/api/getUsers', async (req, res) => {
  const users = await userModel.find({}, { password: 0 }).sort({ accepted: 1 });
  return res.send(users);
});

app.put('/api/updateUser', async (req, res) => {
  const { _id } = req.body.user;
  const re = await userModel.updateOne(
    { _id: _id },
    {
      $set: {
        ...req.body.user,
      },
    }
  );
  return res.send({ re });
});

app.delete('/api/deleteUser', async (req, res) => {
  const email = req.body.email;
  await userModel.findOneAndRemove({ email: email });
  res.send(true);
});

app.get('/api/checkRole', async (req, res) => {
  const id = req.query.id;
  console.log(id);
  const user = await userModel.findOne({ _id: id }, { roleID: 1, _id: 0 });
  console.log(user)
  if (user === null) {
    return res.send({
      user: {
        roleID: 0,
      },
    });
  }
  return res.send({ user });
});

app.post('/api/addStory', async (req, res) => {
  const { storyTitle, storyText, userId } = req.body;

  const storage = multer.diskStorage({
    destination: async function (req, file, cb) {
      const userId = req.body.userId;
      const user = await userModel.findById(userId);
      const directoryPath = `./images/${userId}/`;
      if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath);
      }
      cb(null, directoryPath);
    },
    filename: function (req, file, cb) {
      cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    },
  });

  const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg'];
    const fileSize = parseInt(req.headers['content-length']);
    if (!allowedFileTypes.includes(file.mimetype)) {
      req.fileValidationError = 'Złe rozszerzenie. Akceptowane są rozszerzenia .jpg i .jpeg';
      cb(null, false, req.fileValidationError);
      return;
    }
    if (fileSize >= 4194304) {
      req.fileValidationError = 'Rozmiar pliku nie może być większy niż 4MB';
      cb(null, false, req.fileValidationError);
      return;
    }

    cb(null, true);
  };

  let upload = multer({ storage, fileFilter }).single('storyImage');

  upload(req, res, async function (err) {
    if (req.fileValidationError) {
      return res.send({ error: req.fileValidationError });
    }

    const { filename: image } = req.file;
    console.log(image);

    await sharp(req.file.path)
      .resize(1400, 400)
      .jpeg({ quality: 100 })
      .toFile(path.resolve(req.file.destination, '1' + image));

    fs.unlinkSync(req.file.path);

    const story = {
      title: req.body.storyTitle,
      text: req.body.storyText,
      image: req.file ? '1' + req.file.filename : null,
      added: Date.now(),
      accepted: false,
    };

    await userModel.findOneAndUpdate(
      { _id: req.body.userId },
      {
        $push: {
          stories: story,
        },
      }
    );
    res.send(true);
  });
});

app.put('/api/updateStory', async (req, res) => {
  const storyData = req.body.storyData;
  const re = await userModel.updateOne(
    { 'stories._id': storyData._id },
    {
      $set: {
        'stories.$.text': storyData.text,
        'stories.$.accepted': storyData.accepted,
      },
    }
  );
  return res.send({ re });
});

app.delete('/api/deleteStory', async (req, res) => {
  const { id, userId } = req.body;
  const re = await userModel.updateOne({ 'stories._id': id }, { $pull: { stories: { _id: id } } });
  res.send(true);
});

app.get('/api/getStories', async (req, res) => {
  const stories = await userModel.aggregate([
    {
      $unwind: {
        path: '$stories',
      },
    },
    {
      $sort: {
        'stories.added': -1,
      },
    },
    {
      $project: {
        email: 1,
        stories: 1,
      },
    },
  ]);

  for (const story of stories) {
    if (story.stories.image) {
      const userId = story._id;
      const imageName = story.stories.image;
      const downloadedImage = fs.readFileSync(`./images/${userId}/${imageName}`);
      story.stories.image = Buffer.from(downloadedImage).toString('base64');
    }
  }
  res.send(stories);
});

app.get('/api/getSchoolMates', async (req, res) => {
  const id = req.query.id;
  const user = await userModel.findOne({ _id: id }, { year: 1, school: 1, _id: 0 });
  if (!user) {
    return res.send(false);
  }
  const schoolMates = await userModel.find(
    { year: user.year, school: user.school },
    { firstName: 1, lastName: 1 }
  );
  return res.send({ schoolMates });
});

app.get('/api/searchUsers', async (req, res) => {
  const searchby = req.query.searchby;
  const value = req.query.value;

  if (searchby === 'firstName') {
    var re = value !== '' ? RegExp('^' + value.toLowerCase() + '*') : '';
    const response = await userModel.find({ firstName: { $regex: re } });
    return res.send({ response });
  }

  if (searchby === 'lastName') {
    var re = value !== '' ? RegExp('^' + value.toLowerCase() + '*') : '';
    const response = await userModel.find({ lastName: { $regex: re } });
    return res.send({ response });
  }

  if (searchby === 'school') {
    var re = value !== '' ? RegExp('^' + value.toLowerCase() + '*') : '';
    let response = await userModel.find({ school: { $regex: re } });
    return res.send({ response });
  }

  if (searchby === 'year') {
    let response = await userModel.find({ year: value });
    return res.send({ response });
  }
});

app.get('/api/searchStories', async (req, res) => {
  const searchby = req.query.searchby;
  const value = req.query.value;

  if (searchby === 'firstName') {
    var re = value !== '' ? RegExp('^' + value.toLowerCase() + '*') : '';
    const response = await userModel.aggregate([
      {
        $match: {
          firstName: { $regex: re },
        },
      },
      {
        $unwind: {
          path: '$stories',
        },
      },
      {
        $sort: {
          'stories.added': -1,
        },
      },
      {
        $project: {
          email: 1,
          stories: 1,
        },
      },
    ]);
    return res.send({ response });
  }

  if (searchby === 'lastName') {
    var re = value !== '' ? RegExp('^' + value.toLowerCase() + '*') : '';
    const response = await userModel.aggregate([
      {
        $match: {
          lastName: { $regex: re },
        },
      },
      {
        $unwind: {
          path: '$stories',
        },
      },
      {
        $sort: {
          'stories.added': -1,
        },
      },
      {
        $project: {
          email: 1,
          stories: 1,
        },
      },
    ]);
    return res.send({ response });
  }

  if (searchby === 'school') {
    const response = await userModel.aggregate([
      {
        $match: {
          school: value,
        },
      },
      {
        $unwind: {
          path: '$stories',
        },
      },
      {
        $sort: {
          'stories.added': -1,
        },
      },
      {
        $project: {
          email: 1,
          stories: 1,
        },
      },
    ]);
    return res.send({ response });
  }

  if (searchby === 'year') {
    const response = await userModel.aggregate([
      {
        $match: {
          year: value,
        },
      },
      {
        $unwind: {
          path: '$stories',
        },
      },
      {
        $sort: {
          'stories.added': -1,
        },
      },
      {
        $project: {
          email: 1,
          stories: 1,
        },
      },
    ]);
    return res.send({ response });
  }
});
