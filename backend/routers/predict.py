import streamlit as st

# Kiểm tra trạng thái đăng nhập
if "is_logged_in" not in st.session_state:
    st.session_state["is_logged_in"] = False

# Điều hướng màn hình
if not st.session_state["is_logged_in"]:
    # Nếu chưa đăng nhập -> Hiển thị trang Login
    import views.login as login
    login.show_login_page()
else:
    # Đã đăng nhập -> Mở Trang chủ / Menu chính
    import views.home as home
    home.show_home_page()