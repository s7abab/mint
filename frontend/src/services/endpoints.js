const endpoints = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    verify_OTP: "/auth/verify-otp",
    resend_OTP: "/auth/resend-otp",
    get_current_user: "/auth/current-user",
  },
  admin: {
    change_status: "admin/status/",
    block_user: "/admin/users",
    block_counselor: "/admin/counselors",
    fetch_all_counselors: "/admin/counselors",
    fetch_selected_counselor: "/admin/counselor/",
    fetch_all_users: "/admin/users",
    fetch_selected_user: "admin/user/",
    fetch_withdrawal_req: "admin/withdrawals",
    settlement: "/admin/withdrawals",
    get_profit_data: "/admin/profit-data",
    get_total_users: "/admin//total-users",
    get_total_counselors: "/admin/total-counselors",
  },
  category: {
    fetch_categories_admin: "/admin/category",
    create_category: "/admin/category",
    edit_category: "/admin/category/",
    unlist_category: "/admin/category/",
  },
  counselor: {
    fetch_selected_counselor: "/counselor/profile/",
    apply_counselor: "counselor/apply",
    verify_OTP: "/counselor/verify-otp",
    resend_OTP: "/counselor/resend-otp",
    photo_upload: "counselor/image/",
    update_profile: "counselor/profile/",
    update_time: "/counselor/time/",
    create_slot: "counselor/create-slot",
    fetch_slots: "counselor/scheduled-slots",
    cancel_booking: "counselor/cancel-booking",
    delete_slot: "counselor/delete-slot",
    fetch_all_bookings: "/counselor/bookings",
    fetch_selected_bookings: "/counselor/selected-bookings",
    fetch_wallet: "/counselor/walletAmount",
    changeBankDetails: "/counselor/changeBankDetails",
    fetchBankDetails: "/counselor/bankAc",
    withdrawReq: "/counselor/withdrawReq",
    session_completed: "/counselor/session-completed",
    get_selected_user: "/counselor/get-user",
    get_profit_data: "/counselor/profit-data",
    get_booking_data: "counselor/bookings-data",
  },
  user: {
    fetch_selected_user: "user/user/",
    photo_upload: "user/image/",
    update_profile: "user/user/",
    fetch_all_counselors: "/user/counselors",
    fetch_selected_counselor: "/user/counselor/",
    book_appointment: "/user/book-appointment",
    check_availability: "user/booking-availability",
    fetch_slots: "user/scheduled-slots",
    fetch_all_bookings: "/user/bookings",
    fetch_selected_bookings: "/user/selected-bookings",
    cancel_booking: "/user/cancel-booking",
    payment_integration: "/user/create-checkout-session",
    fetch_wallet: "/user/walletAmount",
    search_counselor: "/user/search-counselors",
    add_feedback: "/user/feedback",
  },
  chat: {
    new_conversation: "/conversation/new-conversation",
    counselor_connections: "/counselor/connections",
    user_connections: "/user/connections",
    get_conversation: "/conversation/get",
    post_message: "/message/post-message",
    get_opposite_messages: "/message/get-opposite-message/",
    get_messages: "/message/get-message/",
  },
};

export default endpoints;
