from api.authentication.viewsets import (
    RegisterViewSet,
    LoginViewSet,
    ActiveSessionViewSet,
    LogoutViewSet,
)
from rest_framework import routers
from api.user.viewsets import UserViewSet
from api.banhang.viewsets import *
from rest_framework_simplejwt.views import TokenRefreshView
from django.urls import path

router = routers.SimpleRouter(trailing_slash=False)

router.register(r"edit", UserViewSet, basename="user-edit") # **User Edit** - `api/users/edit` (**PUT** request)
router.register(r"register", RegisterViewSet, basename="register") # **Register** - `api/users/register` (**POST** request)
router.register(r"login", LoginViewSet, basename="login") # **Login** - `api/users/login` (**POST** request)
router.register(r"checkSession", ActiveSessionViewSet, basename="check-session")
router.register(r"logout", LogoutViewSet, basename="logout") #  **Logout** - `api/users/logout` (**POST** request)

router.register(r"nhan-vien", AANhanVienViewSet, basename="nhan-vien") # POST - http://localhost:5000/api/users/nhan-vien
router.register(r'vitri', AadsvitriViewSet) # GET - http://localhost:5000/api/users/vitri
router.register(r'khachhang', AAddskhachViewSet) # POST - http://localhost:5000/api/users/khachhang
router.register(r'tinh-tp', TinhViewSet) # GET - http://localhost:5000/api/users/tinh-tp
router.register(r'huyen', HuyenViewSet, basename='huyen') # GET - http://localhost:5000/api/users/huyen?matinh=01
router.register(r'xa', XaViewSet, basename='xa') # GET - http://localhost:5000/api/users/xa?mahuyen=001

urlpatterns = [
    *router.urls,
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]
