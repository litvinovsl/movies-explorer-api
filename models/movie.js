const mongoose = require('mongoose');
// const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String, // строка
    required: [true, 'Страна'],
  },
  director: {
    type: String, // строка
    required: [true, 'Режиссер'],
  },
  duration: {
    type: Number, // число
    required: [true, 'Длительность'],
  },
  year: {
    type: String, // строка
    required: [true, 'Год выпуска фильма'],
  },
  description: {
    type: String, // строка
    required: [true, 'Описание фильма'],
  },
  image: {
    type: String,
    required: [true, 'Постер к фильму'],
    validate: {
      validator(v) {
        return /^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*/gm.test(v);
      },
    },
  },
  trailerLink: {
    type: String,
    required: [true, 'Трейлер фильма'],
    validate: {
      validator(v) {
        return /^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*/gm.test(v);
      },
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Миниатюрное изображение постера к фильму'],
    validate: {
      validator(v) {
        return /^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*/gm.test(v);
      },
    },
  },
  nameRU: {
    type: String, // строка
    required: [true, 'Название фильма на русском языке'],
  },
  nameEN: {
    type: String, // строка
    required: [true, 'Название фильма на английском языке'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
}, { versionKey: false });

module.exports = mongoose.model('Movie', movieSchema);
