const users = [{
  id: 1,
  name: "Albert",
  schoolId: 123
}, {
  id: 2,
  name: "Betty",
  schoolId: 598
}];

const grades = [{
  id: 1,
  schoolId: 123,
  grade: 57
}, {
  id: 2,
  schoolId: 598,
  grade: 100
}, {
  id: 1,
  schoolId: 123,
  grade: 85
}];

var getStatus = (id) => {
  let user; // We have to create this variable because we cannot retrieve the previous then() variable when we move to the next then().
  return getUser(id).then((tempUser) => {
    user = tempUser;
    return getGrades(user.schoolId);
  }).then((grades) => {
    let average = 0;
    if (grades.length > 0) {
      average = grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length;
    }

    return `${user.name} scored an average of ${average}% in school.`
  });
}

var getStatusAsyncAwait = async (id) => {
  let user = await getUser(id);
  let grades = await getGrades(user.schoolId);
  let average = 0;
  if (grades.length > 0) {
    average = grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length;
  }
  return `${user.name} scored an average of ${average}% in school.`
}

var getGrades = (schoolId) => {
  return new Promise((resolve, reject) => {
    resolve(grades.filter((grade) => grade.schoolId === schoolId));
  });
}

var getUser = (id) => {
  return new Promise((resolve, reject) => {
    let user = users.find((user) => user.id === id);
    if (user) {
      resolve(user);
    }
    else {
      reject(`Cannot find user with id ${id}.`);
    }
  });
};

getStatusAsyncAwait(2).then((status) => {
  console.log(status);
}).catch((e) => {
  console.log(e);
})
