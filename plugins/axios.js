export default function (context) {
  context.$axios.onRequest((config) => {
      config.baseURL = 'http://127.0.0.1:8080'
  })

  context.$axios.onError((error) => {

      //   Once user Unauthorized then moved them to login page.
      if (error.response.status === 403) {
          context.$cookies.remove('token')
          context.app.router.push('/login')
      }

      return false
  })
}
