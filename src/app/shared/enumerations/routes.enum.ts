export enum RoutesEnum {
    HOME = 'home',
    LOGIN = 'login',
    REGISTER = 'register',
    RESEND_EMAIL_VERIFICATION = 'resend-email-verification/:email',
    CONFIRM_REGISTRATION = 'confirm/:user/:token',
    FORGOT_PASSWORD = 'forgot-password',
    UPDATE_PASSWORD = 'update-password/:user/:token',
    TERM_OF_USE = 'term-of-use',
    DATA_POLICY = 'data-policy',
    COOKIES_POLICY = 'cookies-policy',
    EDIT_PROFILE = 'edit-profile',
    DELETE_ACCOUNT = 'delete-account'

}
