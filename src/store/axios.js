import axios from 'axios'

// const baseURL = '//10.191.203.152:8000/bizops'
// const baseURL = '//192.168.1.103:8000/bizops'
const baseURL = '//192.168.43.6:8000/bizops'
// const baseURL = '//165.227.94.31:8000/bizops'

export default axios.create({
  baseURL: baseURL
})
