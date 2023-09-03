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
  },
  user: {
    fetch_selected_user: "user/user/",
    photo_upload: "user/image/",
    update_profile: "user/user/",
    fetch_all_counselors: "/user/counselors",
    fetch_selected_counselor: "/user/counselor/",
    book_appointment: "/user/book-appointment",
    check_availability: "user/booking-availability",
  },
};

export default endpoints;
