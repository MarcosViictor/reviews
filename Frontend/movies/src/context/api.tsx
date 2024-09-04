import axios from "axios";

export const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",

    headers: {
        'Authorization': "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NTJhMzA0YzE2ZmRhN2QzNmMxMWEzM2JlNzNmNmY0OSIsIm5iZiI6MTcyNTE0OTA2NS4wMDU3NzQsInN1YiI6IjY2N2IyZjdiOWEyMzkxMjUxOWU0NjhhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3h9dBnN41yoFxpcC8ixVzaHZMG2Ud9dPzHiFpe_LKis"

    }

});
