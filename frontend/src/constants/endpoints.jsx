export const AuthenticationAPI = {
    login: '/users/sign_in',
}

export const UsersAPI = {
    currentUser: '/user/',
    users: '/users/',
}

export const PaymentsAPI = {
    payments: '/payment_schedules/',
    userPayments: '/payment_schedules/user/:id',
    paymentById: '/payment_schedules/:id',
    paymentByCurrentUser: '/payment_schedules/list/',
}