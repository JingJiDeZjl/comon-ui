import API from './fetch'
const interfaces = {
  test: '/comon-ui/test'
}
export default {
  test (type, data, success) {
    API.get(interfaces.test, data, success)
  }
}
