export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.accessToken) {
        //console.log(user.accessToken)
        return { 'x-access-token': user.accessToken };
    } else {
        console.log('else')
        return {};
    }
}