# auth_app/urls.py
from django.urls import path
from .views import UserCreateView, CustomTokenObtainPairView, UserStatusView, TestAuthView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('api/register/', UserCreateView.as_view(), name='register'),
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/status/', UserStatusView.as_view(), name='user_status'),
    path('api/test-auth/', TestAuthView.as_view(), name='test_auth'),
]
