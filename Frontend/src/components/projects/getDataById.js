import axios from "axios"

export const getDataById = async (id) => {
  try {
    const res = await axios.get(`https://ems-api.antiers.work/api/projects/${id}`)
    if (res) {
      console.log(res.data, "RSERSEESR")
      const result = res?.data;
      return result
    }
  } catch (e) {
    return e
  }
}
