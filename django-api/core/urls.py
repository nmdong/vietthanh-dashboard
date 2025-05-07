from django.urls import path, include
from api.banhang.viewsets import KhachHangDetailAPIView

urlpatterns = [
    path("api/users/", include(("api.routers", "api"), namespace="api")),
    path('api/khachhang/<str:makhach>/', KhachHangDetailAPIView.as_view(), name='khachhang-detail'),
]
