function Email(email) {
  if (email === '') {
    return 'Podaj adres e-mail';
  } else if (!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
    return 'Podaj prawidłowy e-mail';
  } else {
    return '';
  }
}

function Password(password) {
  if (password === '') {
    return 'Podaj hasło';
  } else if (password.length < 8) {
    return 'Hasło musi mieć minimum 8 znaków';
  } else {
    return '';
  }
}

function FirstName(firstName) {
  if (firstName === '') {
    return 'Podaj imię';
  } else {
    return '';
  }
}

function LastName(lastName) {
  if (lastName === '') {
    return 'Podaj nazwisko';
  } else {
    return '';
  }
}

function Year(year) {
  year = parseInt(year);
  if (year === '') {
    return 'Podaj rok ukończenia';
  } else if (!(year > 1900 && year < 2022)) {
    return 'Podaj prawdziwy rok ukończenia';
  } else {
    return '';
  }
}

function Title(title) {
  if (title.length === 0) {
    return 'Wprowadź tytuł';
  } else {
    return '';
  }
}

function Text(title) {
  if (title.length < 50) {
    return 'Minimum 50 znaków';
  } else {
    return '';
  }
}

export const Validation = {
  email: Email,
  password: Password,
  firstName: FirstName,
  lastName: LastName,
  year: Year,
  title: Title,
  text: Text,
};
