import usePostRequest from "../hooks/usePostRequest";

export const setDefault = () => {
  const jsonData = {
    Monday: {
      "00:00": false,
      "00:30": false,
      "01:00": true,
      "01:30": true,
      "02:00": true,
      "02:30": true,
      "03:00": true,
      "03:30": true,
      "04:00": true,
      "04:30": true,
      "05:00": true,
      "05:30": true,
      "06:00": true,
      "06:30": true,
      "07:00": true,
      "07:30": true,
      "08:00": true,
      "08:30": true,
      "09:00": true,
      "09:30": true,
      "10:00": true,
      "10:30": true,
      "11:00": true,
      "11:30": true,
      "12:00": true,
      "12:30": true,
      "13:00": true,
      "13:30": true,
      "14:00": true,
      "14:30": true,
      "15:00": true,
      "15:30": true,
      "16:00": true,
      "16:30": true,
      "17:00": true,
      "17:30": true,
      "18:00": true,
      "18:30": true,
      "19:00": true,
      "19:30": true,
      "20:00": true,
      "20:30": true,
      "21:00": true,
      "21:30": true,
      "22:00": true,
      "22:30": true,
      "23:00": true,
      "23:30": true,
    },
    Tuesday: {
      "00:00": false,
      "00:30": true,
      "01:00": true,
      "01:30": true,
      "02:00": true,
      "02:30": true,
      "03:00": true,
      "03:30": true,
      "04:00": false,
      "04:30": true,
      "05:00": true,
      "05:30": true,
      "06:00": true,
      "06:30": true,
      "07:00": true,
      "07:30": true,
      "08:00": true,
      "08:30": true,
      "09:00": true,
      "09:30": true,
      "10:00": true,
      "10:30": true,
      "11:00": true,
      "11:30": true,
      "12:00": true,
      "12:30": true,
      "13:00": true,
      "13:30": true,
      "14:00": true,
      "14:30": true,
      "15:00": true,
      "15:30": true,
      "16:00": true,
      "16:30": true,
      "17:00": true,
      "17:30": true,
      "18:00": true,
      "18:30": true,
      "19:00": true,
      "19:30": true,
      "20:00": true,
      "20:30": true,
      "21:00": true,
      "21:30": true,
      "22:00": true,
      "22:30": true,
      "23:00": true,
      "23:30": true,
    },
    Wednesday: {
      "00:00": true,
      "00:30": true,
      "01:00": true,
      "01:30": true,
      "02:00": true,
      "02:30": true,
      "03:00": true,
      "03:30": true,
      "04:00": true,
      "04:30": true,
      "05:00": true,
      "05:30": true,
      "06:00": true,
      "06:30": true,
      "07:00": true,
      "07:30": true,
      "08:00": true,
      "08:30": true,
      "09:00": true,
      "09:30": true,
      "10:00": true,
      "10:30": true,
      "11:00": true,
      "11:30": true,
      "12:00": true,
      "12:30": true,
      "13:00": true,
      "13:30": true,
      "14:00": true,
      "14:30": true,
      "15:00": true,
      "15:30": true,
      "16:00": true,
      "16:30": true,
      "17:00": true,
      "17:30": true,
      "18:00": true,
      "18:30": true,
      "19:00": true,
      "19:30": true,
      "20:00": true,
      "20:30": true,
      "21:00": true,
      "21:30": true,
      "22:00": true,
      "22:30": true,
      "23:00": true,
      "23:30": true,
    },
    Thursday: {
      "00:00": true,
      "00:30": true,
      "01:00": true,
      "01:30": false,
      "02:00": false,
      "02:30": true,
      "03:00": true,
      "03:30": true,
      "04:00": true,
      "04:30": true,
      "05:00": true,
      "05:30": true,
      "06:00": true,
      "06:30": true,
      "07:00": true,
      "07:30": true,
      "08:00": true,
      "08:30": true,
      "09:00": true,
      "09:30": true,
      "10:00": true,
      "10:30": true,
      "11:00": true,
      "11:30": true,
      "12:00": true,
      "12:30": true,
      "13:00": true,
      "13:30": true,
      "14:00": true,
      "14:30": true,
      "15:00": true,
      "15:30": true,
      "16:00": true,
      "16:30": true,
      "17:00": true,
      "17:30": true,
      "18:00": true,
      "18:30": true,
      "19:00": true,
      "19:30": true,
      "20:00": true,
      "20:30": true,
      "21:00": true,
      "21:30": true,
      "22:00": true,
      "22:30": true,
      "23:00": true,
      "23:30": true,
    },
    Friday: {
      "00:00": true,
      "00:30": true,
      "01:00": true,
      "01:30": false,
      "02:00": false,
      "02:30": true,
      "03:00": true,
      "03:30": true,
      "04:00": true,
      "04:30": true,
      "05:00": true,
      "05:30": true,
      "06:00": true,
      "06:30": true,
      "07:00": true,
      "07:30": true,
      "08:00": true,
      "08:30": true,
      "09:00": true,
      "09:30": true,
      "10:00": true,
      "10:30": true,
      "11:00": true,
      "11:30": true,
      "12:00": true,
      "12:30": true,
      "13:00": true,
      "13:30": true,
      "14:00": true,
      "14:30": true,
      "15:00": true,
      "15:30": true,
      "16:00": true,
      "16:30": true,
      "17:00": true,
      "17:30": true,
      "18:00": true,
      "18:30": true,
      "19:00": true,
      "19:30": true,
      "20:00": true,
      "20:30": true,
      "21:00": true,
      "21:30": true,
      "22:00": true,
      "22:30": true,
      "23:00": true,
      "23:30": true,
    },
    Saturday: {
      "00:00": true,
      "00:30": false,
      "01:00": false,
      "01:30": true,
      "02:00": true,
      "02:30": true,
      "03:00": true,
      "03:30": true,
      "04:00": true,
      "04:30": true,
      "05:00": true,
      "05:30": true,
      "06:00": true,
      "06:30": true,
      "07:00": true,
      "07:30": true,
      "08:00": true,
      "08:30": true,
      "09:00": true,
      "09:30": true,
      "10:00": true,
      "10:30": true,
      "11:00": true,
      "11:30": true,
      "12:00": true,
      "12:30": true,
      "13:00": true,
      "13:30": true,
      "14:00": true,
      "14:30": true,
      "15:00": true,
      "15:30": true,
      "16:00": true,
      "16:30": true,
      "17:00": true,
      "17:30": true,
      "18:00": true,
      "18:30": true,
      "19:00": true,
      "19:30": true,
      "20:00": true,
      "20:30": true,
      "21:00": true,
      "21:30": true,
      "22:00": true,
      "22:30": true,
      "23:00": true,
      "23:30": true,
    },
    Sunday: {
      "00:00": true,
      "00:30": true,
      "01:00": true,
      "01:30": false,
      "02:00": true,
      "02:30": true,
      "03:00": true,
      "03:30": true,
      "04:00": true,
      "04:30": true,
      "05:00": true,
      "05:30": true,
      "06:00": false,
      "06:30": true,
      "07:00": true,
      "07:30": true,
      "08:00": true,
      "08:30": true,
      "09:00": true,
      "09:30": true,
      "10:00": true,
      "10:30": true,
      "11:00": true,
      "11:30": true,
      "12:00": true,
      "12:30": true,
      "13:00": true,
      "13:30": true,
      "14:00": true,
      "14:30": true,
      "15:00": true,
      "15:30": true,
      "16:00": true,
      "16:30": true,
      "17:00": true,
      "17:30": true,
      "18:00": true,
      "18:30": true,
      "19:00": true,
      "19:30": true,
      "20:00": true,
      "20:30": true,
      "21:00": true,
      "21:30": true,
      "22:00": true,
      "22:30": true,
      "23:00": true,
      "23:30": true,
    },
  };
  usePostRequest({
    baseUrl: "https://crudapi.co.uk/api/v1",
    endPoint: "dates",
    key: "_Nk1smAzmY9Nl4tPai9YPb3T_FXSC1XiC4AFeCWIxkjlqA9v5g",
    data: { jsonData },
    toastError: "err",
    toastSuccess: "default",
  });
};
