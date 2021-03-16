module.exports = {
  age(timestamp) {
    const today = new Date();
    const birth = new Date(timestamp);

    let age = today.getFullYear() - birth.getFullYear();
    const month = today.getMonth() - birth.getMonth();

    if (month < 0 || (month == 0 && today.getDate() < birth.getDate())) {
      return (age = age - 1);
    }

    return age;
  },
  date(timestamp) {
    const date = new Date(timestamp);

    //UTC - formato data universal
    const year = date.getUTCFullYear();

    const month = `0${date.getUTCMonth() + 1}`.slice(-2);

    const day = `0${date.getUTCDate()}`.slice(-2);

    return {
      iso: `${year}-${month}-${day}`,
      birthDay: `${day}/${month}`,
      created_at: `${day}/${month}/${year}`,
      format : `${day}/${month}/${year}`
    };
  },
  split(string) {
    return string.split(",");
  },
  graduation: function (string) {
    const graduations = ["Médio", "Superior", "Doutorado", "Mestrado"];

    const grade = graduations.filter((item, index) => {
      if (string.indexOf(item) > -1) return index;
    });

    return graduations[grade];
  },
  grade(string) {
    const nivel = string.includes("F") ? "Fundamental" : "Médio";

    return `${string[0]}° Ano do Ensino ${nivel}`;
  },
  editGradeShow(string) {
    const gradeNumber = parseInt(string.charAt(0));

    const grades = {
      5: "5_fundamental",
      6: "6_fundamental",
      7: "7_fundamental",
      8: "8_fundamental",
      9: "9_fundamental",
      1: "1_medio",
      2: "2_medio",
      3: "3_medio"
    }

    return grades[gradeNumber];
  }
};
